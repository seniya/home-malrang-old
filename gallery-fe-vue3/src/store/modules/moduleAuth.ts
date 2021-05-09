import { Module } from 'vuex'
import { RootState } from '../index'
import { IUser } from '../../api/user.interface'
import {
  apiSignin,
  apiGetUser
} from '../../api/user.api'

const defaultUser = {
  id: null,
  email: '',
  name: '손님',
  lv: 3,
  photo: ''
}

export interface ModuleAuthState {
  user: IUser
  token: String
}

export const moduleAuth: Module<ModuleAuthState, RootState> = {
  namespaced: true,
  state: () => ({
    user: defaultUser,
    token: ''
  }),
  getters: {
    userInfo (state, getters, rootState) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
      // console.log('setUser payload : ', payload)
      state.user = payload
    },
    setToken (state, payload: string) {
      // console.log('setToken payload : ', payload)
      state.token = payload
    }
  },
  actions: {
    async SIGN_IN ({ state, commit, rootState }, payload) {
      try {
        const { success, body } = await apiSignin(payload)
        console.log('SIGN_IN success, body : ', success, body)
        localStorage.setItem('MALRANG_TOKEN', body)
        commit('setToken', body)
        return true
      } catch (error) {
        return false
      }
    },

    async GET_ME ({ state, commit, rootState }, payload) {
      try {
        const { success, body } = await apiGetUser()
        console.log('SIGN_IN success, body : ', success, body)
        commit('setUser', body)
        return true
      } catch (error) {
        return false
      }
    }
  }
}
