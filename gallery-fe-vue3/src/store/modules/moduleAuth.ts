import { Module } from 'vuex'
import { RootState } from '../index'
import { IUser } from '../../api/user.interface'
import { apiSignin } from '../../api/user.api'

const defaultUser = {
  id: null,
  email: '',
  name: '손님',
  lv: 3,
  photo: ''
}

export interface ModuleAuthState {
  user: IUser;
}

export const moduleAuth: Module<ModuleAuthState, RootState> = {
  namespaced: true,
  state: () => ({
    user: defaultUser
  }),
  getters: {
    userInfo (state, getters, rootState) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
      console.log('setUser payload.user : ', payload.user)
      state.user = payload.user
    }
  },
  actions: {
    async SIGN_IN ({ state, commit, rootState }, payload) {
      const { data } = await apiSignin(payload)
      // console.log('SIGN_IN data : ', data.user)
      commit('setUser', data)
      return data
    }
  }
}
