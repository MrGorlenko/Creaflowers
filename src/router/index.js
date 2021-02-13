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
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
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
  },
  {
    path: '/Basket',
    name: 'Basket',
    component: () => import('../views/Basket.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),

  routes
})

export default router
