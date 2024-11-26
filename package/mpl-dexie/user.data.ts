export interface UserProps {
  username: string
  avatar: string
  lockedPages: string[]
  role: 'admin' | 'community' | 'enterprise' | 'demo-community' | 'demo-enterprise'
}

const demoUser: UserProps = {
  username: 'xuxx',
  avatar: '',
  lockedPages: [],
  role: 'demo-enterprise'
}

export default {
  demoUser
}
