// import Vue from 'vue'
import { createRouter, createWebHashHistory,VueRouter } from 'vue-router'
import Home from '../views/Home.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // path
  {
    path: '/Category/:id',
    name: 'nCategory',
    component: () => import('../components/nCategory.vue'),
    props: true,
  },
  {
    path: '/Contacts',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
