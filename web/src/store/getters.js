export default {
	user(state){
		return state.currentUser
	},
	profile(state){
		return state.currentProfile
	},
	group(state){
		return state.currentGroup
	},
	allGroups(state){
		return state.allGroups
	},
	roasts(state){
		return state.roasts
	},
	room(state){
		return state.room
	}
}