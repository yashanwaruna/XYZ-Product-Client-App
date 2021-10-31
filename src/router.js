import Vue from 'vue'
import router from 'vue-router'
import store from './store'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Register from "@/components/Register";

Vue.use(router)

const ifNotAuthenticated = (to, from, next) => {    
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('login')
}

export default new router({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'Home',
            component: Home,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            beforeEnter: ifNotAuthenticated,
        }
    ]
})