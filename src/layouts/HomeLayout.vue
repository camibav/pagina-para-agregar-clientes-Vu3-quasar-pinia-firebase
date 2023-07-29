
<script setup>
import { signOut } from 'firebase/auth';
import { auth } from 'src/firebaseConfig';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/example-store';

const userStore = useUserStore();
const router = useRouter()
const miniState = ref(false)
const drawer = ref(false)
const loading = ref(null)

console.log(auth.currentUser)

const drawerClick = (e) => {

  if (miniState.value) {
    miniState.value = false
    e.stopPropagation()
  }
}
const toProfile = () => {
  router.push({ path: '/profile' })
}

const logOut = async () => {
  loading.value = true
  try {
    await signOut(auth)

  } catch (error) {
    console.log(error.code)
  } finally {
    setTimeout(() => {
      loading.value = false
      router.push({ path: '/' })
    }, 1100);

  }
}



</script>

<template>
  <q-layout view="hHh lpR fFf " class="layout-with-bg">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="glossy">

        <q-toolbar-title>
          <q-avatar size="60px" rounded text-color="white" icon="mdi-briefcase-plus-outline">
          </q-avatar>
          AddClient
        </q-toolbar-title>

        <div class="q-pa-sm f ">
          <p class="q-ma-sm text-h6"> {{ auth.currentUser.displayName }} </p>
          <q-avatar class="cursor-pointer " double size="45px">
            <img :src="auth.currentUser.photoURL">
            <q-menu transition-show="jump-down" transition-hide="jump-up" fit anchor="bottom left" self="top end">
              <q-list bordered padding class="rounded-borders text-primary">
                <q-item clickable v-ripple active-class="my-menu-link" @click="toProfile">
                  <q-item-section avatar>
                    <q-icon name="mdi-account" />
                  </q-item-section>

                  <q-item-section>Perfil</q-item-section>
                </q-item>


                <q-item clickable v-ripple active-class="my-menu-link">
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>

                  <q-item-section>Settings</q-item-section>
                </q-item>

                <q-item clickable v-ripple active-class="my-menu-link">
                  <q-item-section avatar>
                    <q-icon name="help" />
                  </q-item-section>

                  <q-item-section>Help</q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="logOut()" active-class="my-menu-link">
                  <q-item-section avatar>
                    <q-icon name="mdi-close" />
                  </q-item-section>

                  <q-item-section>Cerrar sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>


        </div>





      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="200"
      :breakpoint="500" bordered :class="$q.dark.isActive ? 'bg-grey-9' : 'primary'" >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">

        <q-list padding style="margin-top: 10px;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-home" />
            </q-item-section>
            <q-item-section>
              Inicio
            </q-item-section>
          </q-item>


          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-account-plus" />
            </q-item-section>

            <q-item-section>
              Agregar Cliente
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mdi-view-dashboard" />
            </q-item-section>

            <q-item-section>
             Panel
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="margin-top:8px ;">
            <q-item-section v-if="!miniState" avatar></q-item-section>
            <q-item-section avatar>
              <q-btn dense round unelevated color="primary" :icon="miniState ? 'chevron_right' : 'chevron_left'"
                @click=" miniState = true" class="text-center" />
            </q-item-section>

          </q-item>

        </q-list>

      </q-scroll-area>

    </q-drawer>

    <q-page-container class="relative-position  ">
      <router-view class="q-mb-sm  "/>
      <!-- <q-spinner-hourglass color="primary" size="2.5em" :thickness="2" class="col-2" v-if="loading" /> -->

    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>


<style>
.left {
  left: 50%;
}

.top {
  top: 50%;
}
.f{
  display: flex;
  justify-content: center;
  align-items: center;
}
.q-layout.layout-with-bg {
  /* Establecer la imagen de fondo y sus propiedades */
  background-image: url('https://img.freepik.com/vector-premium/fondo-color-degradado-azul-purpura-blanco-banner-sitio-web-diseno-grafico-creativo_120819-1369.jpg'); /* Reemplaza con la ruta a tu imagen de fondo */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.q-drawer {
  /* Ajustar el color de fondo para que coincida con el q-header bg-primary */
  background: linear-gradient(90deg, rgba(0,117,255,0.04534313725490191) 40%, rgba(9,9,121,0) 100%, rgba(0,117,255,1) 100%);
  /* Establecer el color del texto */
  color: #faf8f8; /* O cualquier otro color que combine bien con el fondo */
  /* Agregar un borde en la parte derecha del drawer para separarlo del contenido */
  border-right: 1px solid #ffffff; /* O un color similar al texto */
}
.q-item{
  color:rgb(82, 82, 211);
}
.q-item:hover{
  background-color: rgb(82, 82, 211);
  color: white;
}




</style>
