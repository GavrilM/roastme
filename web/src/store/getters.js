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
	groupMembers(state){
		return state.groupMembers
	},
	allGroups(state){
		return state.allGroups
	},
	roasts(state){
		return state.roasts
	},
	feedType(state){
		return state.sortType
	},
	room(state){
		return state.room
	},
	search(state){
		return state.searchResults
	}
}