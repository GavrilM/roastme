import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentUser:{},
		currentProfile: {},
		currentGroup: {},
		allGroups: [],
		roasts: [],
		room: null
	},
	getters,
	mutations,
	actions
})
