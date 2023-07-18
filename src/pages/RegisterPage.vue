<script setup>
import {ref,reactive,computed} from 'vue';
import{auth} from '../firebaseConfig';
import{createUserWithEmailAndPassword,sendEmailVerification} from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'


const $q = useQuasar()
const router = useRouter()



const formState= reactive({
  email:'camiloandresbvbav@ufps.edu.co',
  password:'CAmilo12',
  passwordRe:'CAmilo12'
})


const isPwd= ref(true)
const isPwdR= ref(true)

const isValidEmail=(email)=>{
  const re =  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return re.test(email)
}
const validatePassword=(password)=>{
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return re.test(password)
}
const confirmPassword=(passwordRe)=>{
  return formState.password===passwordRe
}
const validate= computed( ()=>{
  if(isValidEmail(formState.email) && validatePassword(formState.password) && confirmPassword(formState.passwordRe)){

    return true
  }
})

const onSubmit= async ()=>{
  try {

const {user}= await createUserWithEmailAndPassword(auth,formState.email,formState.password)
for (const i in formState) {
  formState[i]=''
}

await sendEmailVerification(auth.currentUser)
setTimeout(() => {
  $q.notify({
  message: 'Correo de verificación enviado',
  color: 'blue-8',
  textColor: 'white',
  icon: 'mdi-account-circle',
  position: 'top',
})
router.push({path:'/login'})
}, 1500);





}

catch (error) {
  console.log(error.code)
  if (error.code === 'auth/email-already-in-use') {
    const message= $q.notify({
      message: 'El correo ya esta en uso',
      color: 'blue-8',
      textColor: 'white',
      icon: 'mdi-account-circle',
      position: 'top',
    })
    return message;
  }
  if (error.code === 'auth/invalid-email') {
    const message= $q.notify({
      message: 'Correo invalido',
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
  <div class="q-mt-xll q-pa-md row justify-center bg-blue-8 rounded-borders top-0 outline absolute-center " style="max-width: 100%">
    <q-icon name="mdi-account-plus" size="5em" />
    <q-form
      @submit="onSubmit"
      class="col-12 "
      style="max-width: 400px"

    >

      <q-input class="q-pa-md"  outlined label-color="black" bg-color="light-blue-2" color="white" type="email" v-model="formState.email"  label="Ingrese su correo electrónico " lazy-rules :rules="[val=> isValidEmail(val)||'Por favor ingrese un correo valido']">
        <template v-slot:append>
          <q-icon name="mail"  color="white"/>
        </template>
      </q-input>

      <q-input v-model="formState.password"  :type="isPwd ? 'password' : 'text'" label="Ingrese su contraseña" class="q-pa-md"  outlined label-color="black" bg-color="light-blue-2" color="white" lazy-rules :rules="[ val => validatePassword(val) || 'La contraseña debe contener mínimo 8 caracteres , una mayúscula y un numero  ']">
        <template v-slot:append>
          <q-icon
          color="white"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input v-model="formState.passwordRe"  :type="isPwdR ? 'password' : 'text'" label="Confirme su contraseña"  outlined label-color="black" bg-color="light-blue-2" color="white" class="q-pa-md" lazy-rules :rules="[
    (val) =>confirmPassword(val) || 'Las contraseñas no coinciden',
  ]">
        <template v-slot:append>
          <q-icon
          color="white"
            :name="isPwdR ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdR = !isPwdR"
          />
        </template>
      </q-input>

      <div class="flex q-pa-md">
        <q-btn label="registrarse" type="submit" v-if="!validate" disabled outline/>
        <q-btn label="registrarse" type="submit" v-else  outline/>
      </div>
    </q-form>

  </div>
</template>

<style >

</style>


