import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {title: 'TODO | Home'}
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/Create.vue'),
    meta: {title: 'TODO | Create'}
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/Edit.vue'),
    meta: {title: 'TODO | Edit'}
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/Error.vue'),
    meta: {title: 'TODO | Error'}
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
