<script setup>
import { reactive, ref } from 'vue';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import { doc, getDoc, setDoc } from 'firebase/firestore';

const router = useRouter()
const loading = ref(null)
const $q = useQuasar()
const userData = ref([])

const formState = reactive({
  email: 'camiloandresbvbav@ufps.edu.co',
  password: '',
})

const isPwd = ref(true)

const isValidEmail = (email) => {
  const re = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return re.test(email)
}
const validatePassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return re.test(password)
}

const setUserData=async (user)=>{
  const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       userData.value = {...docSnap.data()}
    } else {
      console.log('no existe')
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        uid: user.uid
      })

    }
}


const onSubmit = async () => {

  try {
    const { user } = await signInWithEmailAndPassword(auth, formState.email, formState.password)
    setUserData(user)
    for (const i in formState) {
      formState[i] = ''
    }

    router.push({ path: '/main' })


  } catch (error) {
    if (error.code === 'auth/user-not-found') {

      const message = $q.notify({
        message: 'Usuario no encontrado',
        color: 'blue-4',
        textColor: 'white',
        icon: 'mdi-account-circle',
        position: 'top',
      })
      return message;
    }
    if (error.code === 'auth/wrong-password') {

      const message = $q.notify({
        message: 'Contraseña incorrecta',
        color: 'blue-8',
        textColor: 'white',
        icon: 'mdi-account-circle',
        position: 'top',
      })
      return message;
    }
    $q.notify({
      message: 'Error desconocido',
      color: 'blue-8',
      textColor: 'white',
      icon: 'mdi-account-circle',
      position: 'top',
    })

  }




}

</script>
<template>
  <div class="q-mt-xl q-pa-md row justify-center bg-blue-8 rounded-borders top-0 absolute-center  " outline
    style="max-width: 100%">
    <q-icon name="mdi-login" size="5em" />
    <q-form @submit="onSubmit" class="col-12   " style="max-width: 400px">
      <q-input label="Ingrese su Correo electrónico " label-color="black" outlined bg-color="light-blue-2" color="white"
        v-model="formState.email" type="email" class=" q-pa-md text-light-blue" lazy-rules
        :rules="[val => isValidEmail(val) || 'Por favor ingrese un correo valido']">
        <template v-slot:append>
          <q-icon color="white" name="mail" />
        </template>
      </q-input>

      <q-input v-model="formState.password" :type="isPwd ? 'password' : 'text'" label="Ingrese su contraseña"
        class="q-pa-md" lazy-rules outlined label-color="black" bg-color="light-blue-2" color="white"
        :rules="[val => val.length >= 8 || 'La contraseña debe contener mínimo 8 caracteres']">
        <template v-slot:append>
          <q-icon color="white" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <div class="flex q-pa-md">
        <q-btn label="Ingresar" type="submit" outline />

      </div>
      <div class="flex q-pa-md">
        <RouterLink to="/forgotpassword" class="text-caption text-light-blue-2">¿olvidaste tu contraseña?</RouterLink>
      </div>
    </q-form>

  </div>
</template>

<style  >
.top-0 {
  top: 33%;
}


.q-mt-xll {
  margin-top: 110px;
}
</style>


