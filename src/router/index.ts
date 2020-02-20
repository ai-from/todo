import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/Error.vue')
  },
  {
    path: '*',
    redirect: 'error'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
