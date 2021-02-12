// import Vue from 'vue'
import { createRouter, createWebHistory,VueRouter } from 'vue-router'
import Home from '../views/Home.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // path: '/.well-known/apple-developer-merchantid-domain-association',
    // name: 'pay',
    // component: () => import('../.well-known/apple-developer-merchantid-domain-association')
    // apple-developer-merchantid-domain-association
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
  history: createWebHistory(),

  routes
  // mode: 'history'
})

export default router
