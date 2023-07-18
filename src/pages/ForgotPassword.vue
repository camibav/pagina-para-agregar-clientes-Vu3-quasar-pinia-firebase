<script setup >
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'src/firebaseConfig';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const formState = reactive({
  email: 'camiloandresbvbav@ufps.edu.co',
})

const isValidEmail = (email) => {
  const re = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return re.test(email)
}
const onSubmit = async () => {
  try {
   await sendPasswordResetEmail(auth, formState.email)
   router.push({ path: '/login' })

  } catch (error) {
    console.log(error.code)
  }
}
</script>

<template>
  <div class="q-mt-xll q-pa-md row justify-center bg-blue-8 rounded-borders top-0 absolute-center row " outline
    style="max-width: 400px">
    <q-icon name="mdi-lock-reset" size="5em" class="col-12" />
    <p class="text-h5  text-center">¿Olvidaste tu contraseña?</p>
    <p class="text-caption text-center">Escribe tu email asociado y se te enviara un correo de restablecimiento de contraseña</p>
    <q-form @submit="onSubmit" class="col-12  " style="max-width: 400px">
      <q-input label="Ingrese su Correo electrónico " label-color="black" outlined bg-color="light-blue-2" color="white"
       type="email" class=" q-pa-md text-light-blue"  v-model="formState.email" lazy-rules
        :rules="[val => isValidEmail(val) || 'Por favor ingrese un correo valido']" >
        <template v-slot:append>
          <q-icon color="white" name="mail" />
        </template></q-input>
        <div class="flex q-pa-md">
        <q-btn label="Enviar Correo" type="submit" outline />

      </div>
    </q-form>

  </div>
</template>

<style></style>
