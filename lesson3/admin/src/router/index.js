import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/Users.vue')
      },
      {
        path: '/activities',
        name: 'Activities',
        component: () => import('../views/Activities.vue')
      }//append
  
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
