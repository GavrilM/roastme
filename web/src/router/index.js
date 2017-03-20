import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import signin from '@/components/signin'
import signup from '@/components/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: signin
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: signup
    }
    
  ]
})
