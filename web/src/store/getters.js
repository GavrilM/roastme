export default {
	user(state){
		return state.currentUser.displayName
	},
	group(state){
		return state.currentGroup
	},
	roasts(state){
		return state.roasts
	}
}