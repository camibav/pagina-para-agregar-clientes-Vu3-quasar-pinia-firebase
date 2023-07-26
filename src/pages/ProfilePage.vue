<script setup>
import { reactive, ref } from 'vue';
import { auth, db, storage } from '../firebaseConfig';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useQuasar } from 'quasar'
const $q = useQuasar()

const user = auth.currentUser;

const file = ref(null)

const formState = reactive({
  email: auth.currentUser.email,
  displayName: auth.currentUser.displayName,
  photoURL: auth.currentUser.photoURL,
  uid: auth.currentUser.uid,

})

const onFileAdded = async (fileList) => {
  file.value = fileList[0]
  const storageRefe = storageRef(storage, `${user.uid}/profile`);
  await uploadBytes(storageRefe, file.value)


}


const onSubmit = async () => {

  try {

    await updateProfile(user, {
      displayName: formState.displayName,

    }
    )


    const instance = getCurrentInstance();
    instance.forceUpdate();



    $q.notify({
      message: 'La información se actualizo correctamente',
      color: 'blue-8',
      textColor: 'white',
      icon: 'mdi-account-circle',
      position: 'top',
    })


  } catch (error) {
    console.log(error.code)
  }

}


</script>

<template>
  <div class="q-mt-xl q-pa-md row absolute justify-center bg-blue-8 absolute rounded-borders left " outline
    style="max-width: 100%">
    <q-avatar size="100px" color="white" text-color="white" class="q-pa-sm q-ma-sm"><img
        :src="formState.photoURL" /></q-avatar>
    <q-form @submit="onSubmit" class="q-gutter-md col-12 " style="min-width: 400px">
      <q-input filled label="Correo electrónico" label-color="black" outlined bg-color="light-blue-2" color="white"
        v-model="formState.email" type="email" class=" q-pa-sm text-light-blue" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']" d />

      <q-input filled label-color="black" outlined bg-color="light-blue-2" color="white" class=" q-pa-sm text-light-blue"
        v-model="formState.displayName" label="Nombre de usuario " lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']" />

      <div class="q-pa-sm" style="max-width: 300px">
        <q-uploader v-model="file" @added="onFileAdded" style="max-width: 300px" label="Cargar foto de perfil"
          class="leftup" dark ref="uploader" />
      </div>


      <div class="flex justify-center q-pa-md">
        <q-btn label="Actualizar información" type="submit" color="white" outline />

      </div>
    </q-form>

  </div>
</template>
<style scoped>
.left {
  left: 40%;
}

.leftup {
  left: 29%;
}

.top {
  top: 50%;
}
</style>
