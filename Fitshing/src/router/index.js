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
      path: '/trainer',
      name: 'trainerall',
      component: () => import('../views/TrainnerView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginTemplate.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Login/RegisterTemplate.vue')
    },
    {
      path: '/product/preview/:id',
      name: 'previewproduct',
      component: () => import('../views/PreviewProduct.vue')
    },
    {
      path: '/trainer/preview/:id',
      name: 'previewtrainer',
      component: () => import('../views/PreviewTrainer.vue')
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: () => import('../views/AddProduct.vue')
    },
    {
      path: '/editproduct/:id',
      name: 'editproduct',
      component: () => import('../views/EditProduct.vue')
    },
    {
      path: '/Cart',
      name: 'cart',
      component: () => import('../views/payment/Cart.vue')
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('../views/Profile/ProfileTemp.vue')
    },
    {
      path: '/profile/edit/:id',
      name: 'editprofile',
      component: () => import('../views/Profile/EditProfile.vue')
    },
    {
      path: '/bill',
      name: 'bill',
      component: () => import('../views/payment/BillView.vue')
    },
    {
      path: '/payment/adminview',
      name: 'adminpayment',
      component: () => import('../views/AdminPayment.vue')
    },
    {
      path: '/editTrainer/:id',
      name: 'editTrainer',
      component: () => import('../views/EditTrainer.vue')
    },
    {
      path: '/addvdo/',
      name: 'addvdo',
      component: () => import('../views/AddVDO.vue')
    },
    {
      path: '/editvdo/:id',
      name: 'editvdo',
      component: () => import('../views/EditVDO.vue')
    },
    {
      path: '/preview/vdo/:id',
      name: 'vdopreview',
      component: () => import('../views/PreviewVDO.vue')
    },
    {
      path: '/allvdo/',
      name: 'vdoall',
      component: () => import('../views/VDOAll.vue')
    },
  ]
})

export default router
