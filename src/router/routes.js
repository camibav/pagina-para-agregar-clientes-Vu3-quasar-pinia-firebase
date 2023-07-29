import { useUserStore} from '/src/stores/example-store.js'


const requiredAuth = async (to, from, next) => {
const userStore= useUserStore()
const user = await userStore.currentUser()

if (user) {
  next()
}else{
  next('/login')
}

}


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/HomePag.vue') },
      {path: '/login', component: () => import('pages/LoginPage.vue')},
      {path: '/register', component: () => import('pages/RegisterPage.vue')},
      {path: '/forgotpassword', component: () => import('pages/ForgotPassword.vue')},

    ]
  },
  {
    path: '/main',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
 {path:'/main', component: () => import('pages/MainPage.vue'), beforeEnter:requiredAuth},
 {path:'/profile', component: () => import('pages/ProfilePage.vue'), beforeEnter:requiredAuth},
 {path:'/registrar-clientes',component:()=>import('pages/AddNewClient.vue'), beforeEnter:requiredAuth},
  {path:'/panel',component:()=>import('pages/Dashboard.vue'), beforeEnter:requiredAuth},

    ]
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
