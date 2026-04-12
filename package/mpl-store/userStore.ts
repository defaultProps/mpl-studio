import { defineStore } from 'pinia'
import type { Authority } from '@mpl/typings'

export interface UserStore {
	name: string
	authority: Authority
}

export const userStore = defineStore('User', {
	state: (): UserStore => {
		return {
			name: '',
			authority: 'enterprise'
		}
	},
	actions: {}
})

export default userStore
