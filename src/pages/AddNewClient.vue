<script setup>
import { reactive } from 'vue';

const formState = reactive({
 nombre: '',
  apellido: '',
  email: '',
  teléfono: '',
  dirección: '',

});

const onSubmit=()=>{
  console.log('hola')
}
</script>
<template>
<h1>Hola cliente</h1>

</template>
<style scoped>
.top-0 {
  top: 54%;
}
</style>
