<script setup >
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()

const show = ref(false)
const goToLogin = () => {
  router.push({ path: '/login' })

}

const toHome = () => {
  router.push({ path: '/' })
}

const goToRegister = () => {
  router.push({ path: '/register' })
}
const showMe = computed(() => {
  if (router.currentRoute.value.path == '/login' || router.currentRoute.value.path == '/register' || router.currentRoute.value.path == '/main'|| router.currentRoute.value.path == '/forgotpassword') {
    return show.value = false
  } else {
    return show.value = true
  }
})
</script>


<template>
  <q-layout view="lhh LpR lff" container style="height: 860px; overflow: hidden;" class="over ">

    <q-header elevated class="bg-primary text-white over">
      <q-toolbar class="glossy">
        <q-toolbar-title >
          <q-avatar @click="toHome" size="60px" rounded text-color="white" icon="mdi-briefcase-plus-outline">
          </q-avatar>
          AddClient
        </q-toolbar-title>
        <q-btn label="Ingresar" class="mr-8" outline @click="goToLogin()" v-if="showMe"></q-btn>
        <q-btn label="Registrarse" outline @click="goToRegister" v-if="show"></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="relative-position  over">
      <q-page class=" full-height  ">

        <q-img src="https://www.processmaker.com/wp-content/uploads/2020/09/customer-onboarding.jpg" >
          <router-view class="q-mb-sm over"/>
          <!-- <div  rounded-borders  ">

          </div> -->
        </q-img>

      </q-page>

    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-white  q-m-sm flex " style="font-size: 1.5em">
            <ul class=" row " style="list-style: none; margin-bottom: 10px;">
              <li> <q-icon name="mdi-facebook" class="col-1 mr-8" /></li>
              <li><q-icon name="mdi-twitter" class="col-1 mr-8" /></li>
              <li><q-icon name="mdi-instagram" class="col-1 mr-8" /></li>
              <li><q-icon name="mdi-linkedin" class="col-1 mr-8" /></li>

            </ul>
            <p class="text-caption">© Myapp.com. Template by Camilo Bacca</p>
          </div>

        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>



<style>
.mr-8 {
  margin-right: 16px;
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.mr-6 {
  margin-left: 8px;
}

.img-back {
  background: url(https://www.processmaker.com/wp-content/uploads/2020/09/customer-onboarding.jpgg) no-repeat center center;
}
.over{
  overflow: hidden

}
</style>


