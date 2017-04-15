import Router from 'vue-router'
import Group from '@/components/group'
import Profile from '@/components/profile'
import Settings from '@/components/settings'
import Search from '@/components/search'

export default [
  {
    path: '',
    component: Group
  },
  {
    path: 'profile/:user',
    name: 'profile',
    component: Profile
  },
  {
    path: 'group/:groupId',
    name: 'group',
    component: Group
  },
  {
    path: 'settings',
    name: 'settings',
    component: Settings
  },
  {
    path: 'search',
    name: 'search',
    component: Search
  }
]