export default {
	currentUser(state, data){
		state.currentUser = data
	},
	currentGroup(state, data){
		state.currentGroup = data
	},
	roasts(state, roasts){
		state.roasts = roasts
	}
}