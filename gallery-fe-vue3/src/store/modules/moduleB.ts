import { Module } from 'vuex'
import { RootState } from '../index'

export interface ModuleBState {
  count: number;
}

export const moduleB: Module<ModuleBState, RootState> = {
  namespaced: true,
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state, payload) {
      state.count++
    }
  },
  getters: {
    doubleCount (state, getters, rootState) {
      return state.count * 2
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }, payload) {
      if ((state.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
