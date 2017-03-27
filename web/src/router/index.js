import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layouts/home'
import Login from '@/layouts/login'
import Landing from '@/layouts/landing'

import MainRoutes from './main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: validate,
      children: MainRoutes
    },
    {
      path: '/login',
      name: 'Log In',
      component: Login
    },
    {
      path: '/landing',
      name: 'landing',
      component: Landing
    }
  ]
})

function validate(to, from, next){
  Vue.http.get('api/users/checkauth')
  .then(res => {
    res.body ? next() : next('login')
  })
  .catch(err => {
    next('landing')
  })
}