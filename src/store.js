import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: localStorage.getItem('user') || null,        
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null
    },

    getters: {        
        user: state => state.user,
        isAuthenticated: state => !!state.token,
    },
    actions: {
        user(context, data) {
            if(data != null){
                context.commit('user', data.user)
                context.commit('token', data.token)
                context.commit('role', data.user.role_id)
            }else{
                context.commit('user', null)
                context.commit('token', null)
                context.commit('role', null)
            }
        }
    },
    mutations: {
        user(state, data) {
            state.user = data
        },
        token(state,token){
            state.token = token
        },
        role(state,role){
            state.role = role
        }
    }
})

export default store