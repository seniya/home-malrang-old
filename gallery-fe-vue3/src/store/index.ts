import { createStore } from 'vuex'
import { moduleA, ModuleAState } from './modules/ModuleA'
import { moduleB, ModuleBState } from './modules/ModuleB'
import { moduleAuth, ModuleAuthState } from './modules/moduleAuth'

export interface RootState {
  ModuleA: ModuleAState;
  ModuleB: ModuleBState;
  ModuleAuth: ModuleAuthState;
}

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    moduleA,
    moduleB,
    moduleAuth
  }
})
