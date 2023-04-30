import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product',
      name: 'productall',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Login/Register.vue')
    },
    {
      path: '/product/preview/:id',
      name: 'preview',
      component: () => import('../views/PreviewView.vue')
    },
    {
      path: '/userprofile',
      name: 'userprofile',
      component: () => import('../views/Profile/ProfileUser.vue')
    },
    {
      path: '/trainerprofile',
      name: 'trainerprofile',
      component: () => import('../views/Profile/ProfileTrainer.vue')
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: () => import('../views/AddProduct.vue')
    },
    {
      path: '/Cart',
      name: 'cart',
      component: () => import('../views/Payment.vue')
    },
  ]
})

export default router
