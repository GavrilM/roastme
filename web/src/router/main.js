import Router from 'vue-router'
import Feed from '@/components/feed'
import Profile from '@/components/profile'
import Settings from '@/components/settings'
import Search from '@/components/search'

export default [
  {
    path: '',
    component: Feed
  },
  {
    path: 'profile/:user',
    name: 'profile',
    component: Profile
  },
  {
    path: 'group/:groupId',
    name: 'group',
    component: Feed
  },
  {
    path: 'settings',
    name: 'settings',
    component: Settings
  },
  {
    path: 'search',
    name: 'Search',
    component: Search
  }
]