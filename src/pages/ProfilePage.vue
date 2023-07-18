<script setup>
import { reactive, ref } from 'vue';
import { auth, db } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { useQuasar } from 'quasar'
const $q = useQuasar()
const user = ref(auth.currentUser)

const formState = reactive({
  email: user.value.email,
  displayName: user.value.displayName,
  phoneNumber: user.value.phoneNumber,
  photoURL: user.value.photoURL,
  uid: user.value.uid
})
console.log(user.value)

const onSubmit = async () => {

  try {
    const user = auth.currentUser;
    await updateProfile(user, {
      displayName: formState.displayName,
      photoURL: formState.photoURL,

    }
    )
   auth.updateUser(user.uid,
      {
        phoneNumber: formState.phoneNumber,
      }
    )

    $q.notify({
      message: 'La información se actualizo correctamente',
      color: 'blue-8',
      textColor: 'white',
      icon: 'mdi-account-circle',
      position: 'top',
    })

  } catch (error) {
    console.log(error)
  }

}


</script>

<template>
  <div class="q-mt-xl q-pa-md row absolute justify-center bg-blue-8 absolute rounded-borders left " outline
    style="max-width: 100%">
    <q-avatar size="100px" color="white" text-color="white"><img :src="formState.photoURL" /></q-avatar>
    <q-form @submit="onSubmit" class="q-gutter-md col-12 " style="min-width: 400px">
      <q-input filled label="Correo electrónico" label-color="black" outlined bg-color="light-blue-2" color="white"
        v-model="formState.email" type="email" class=" q-pa-md text-light-blue" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']" disable />

      <q-input filled label-color="black" outlined bg-color="light-blue-2" color="white" class=" q-pa-md text-light-blue"
        v-model="formState.displayName" label="Nombre de usuario " lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']" />
      <q-input filled label-color="black" outlined bg-color="light-blue-2" color="white" class=" q-pa-md text-light-blue"
        v-model="formState.phoneNumber" label="Numero de teléfono " lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something']" />


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

.top {
  top: 50%;
}
</style>
