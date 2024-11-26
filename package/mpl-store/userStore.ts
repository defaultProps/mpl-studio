import { defineStore } from 'pinia'

export interface UserStore {
  mode: 'admin' | 'community' | 'enterprise' | 'demo-community' | 'demo-enterprise'
  name: string
}

export const userStore = defineStore('User', {
  state: (): UserStore => {
    return {
      mode: 'admin',
      name: ''
    }
  },
  actions: {}
})

export default userStore
