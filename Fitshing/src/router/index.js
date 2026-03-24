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
      meta: { guest: true },
      component: () => import('../views/Login/LoginTemplate.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { guest: true },
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
      meta: { requiresAuth: true, role: 'admin' },
      component: () => import('../views/AddProduct.vue')
    },
    {
      path: '/editproduct/:id',
      name: 'editproduct',
      meta: { requiresAuth: true, role: 'admin' },
      component: () => import('../views/EditProduct.vue')
    },
    {
      path: '/Cart',
      name: 'cart',
      meta: { requiresAuth: true },
      component: () => import('../views/payment/Cart.vue')
    },
    {
      path: '/profile/:id',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('../views/Profile/ProfileTemp.vue')
    },
    {
      path: '/profile/edit/:id',
      name: 'editprofile',
      meta: { requiresAuth: true },
      component: () => import('../views/Profile/EditProfile.vue')
    },
    {
      path: '/bill',
      name: 'bill',
      meta: { requiresAuth: true },
      component: () => import('../views/payment/BillView.vue')
    },
    {
      path: '/payment/adminview',
      name: 'adminpayment',
      meta: { requiresAuth: true, role: 'admin' },
      component: () => import('../views/AdminPayment.vue')
    },
    {
      path: '/editTrainer/:id',
      name: 'editTrainer',
      meta: { requiresAuth: true },
      component: () => import('../views/EditTrainer.vue')
    },
    {
      path: '/addvdo/',
      name: 'addvdo',
      meta: { requiresAuth: true, role: 'admin' },
      component: () => import('../views/AddVDO.vue')
    },
    {
      path: '/editvdo/:id',
      name: 'editvdo',
      meta: { requiresAuth: true, role: 'admin' },
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

// Route guards
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const hasToken = token && token !== 'null'

  // Redirect logged-in users away from login/register
  if (to.meta.guest && hasToken) {
    return next({ name: 'home' })
  }

  // Check auth requirement
  if (to.meta.requiresAuth && !hasToken) {
    return next({ name: 'login' })
  }

  // Check role requirement (admin routes)
  if (to.meta.role) {
    try {
      const axios = (await import('../plugins/axios')).default
      const res = await axios.get('/user/me')
      if (res.data.role !== to.meta.role) {
        return next({ name: 'home' })
      }
    } catch {
      return next({ name: 'login' })
    }
  }

  next()
})

export default router
