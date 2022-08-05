import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      keep: true
    }
  },

  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my.vue'),
    meta: {
      keep: true
    }
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/publish.vue'),
    meta: {
      keep: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/login.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../views/user/reg.vue')
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('../views/userInfo/userInfo.vue'),
    meta: {
      keep: true
    }
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/user/edit.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search.vue')
  },
  {
    path: '/searchList',
    name: 'searchList',
    component: () => import('../views/search/list.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/article/article.vue')
  },
  // {
  //   path: '/fav',
  //   name: 'fav',
  //   component: () => import('../views/fav.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
