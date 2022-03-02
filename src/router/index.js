import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '吃香喝辣'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      title: '我要點餐 | 吃香喝辣'
    }
  },
  {
    path: '/ordercart',
    name: 'Ordercart',
    component: () => import(/* webpackChunkName: "ordercart" */ '../views/Ordercart.vue'),
    meta: {
      title: '購物車 | 吃香喝辣'
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue'),
    meta: {
      title: '訂單 | 吃香喝辣'
    }
  },
  {
    path: '/wait',
    name: 'Wait',
    component: () => import(/* webpackChunkName: "wait" */ '../views/Wait.vue'),
    meta: {
      title: '我要候位 | 吃香喝辣'
    }
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: () => import(/* webpackChunkName: "introduction" */ '../views/Introduction.vue'),
    meta: {
      title: '訂單 | 吃香喝辣'
    }
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import(/* webpackChunkName: "comment" */ '../views/Comment.vue'),
    meta: {
      title: '留言 | 吃香喝辣'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
    meta: {
      title: '測試 | 吃香喝辣'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
      {
        path: 'waits',
        name: 'AdminWaits',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminWaits.vue'),
        meta: {
          title: '我要候位 | 吃香喝辣'
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminProducts.vue'),
        meta: {
          login: true,
          admin: true,
          title: '商品管理 | 吃香喝辣'
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminOrders.vue'),
        meta: {
          login: true,
          admin: true,
          title: '訂單管理 | 吃香喝辣'
        }
      },
      {
        path: 'news',
        name: 'AdminNews',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminNews.vue'),
        meta: {
          login: true,
          admin: true,
          title: '公告管理 | 吃香喝辣'
        }
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0, behavior: 'smooth' }
  },
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  const user = store.getters['user/user']
  if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
