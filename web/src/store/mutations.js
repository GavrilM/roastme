export default {
	currentUser(state, data){
		state.currentUser = data
	},
	currentProfile(state, data){
		state.currentProfile = data
	},
	currentGroup(state, data){
		state.currentGroup = data
	},
	groupMembers(state, data){
		state.groupMembers = data
	},
	allGroups(state, data){
		state.allGroups = data
	},
	roasts(state, roasts){
		state.roasts = roasts
	},
	room(state, room){
		state.room = room
	},
	searchResults(state, data){
		state.searchResults = data
	}
}