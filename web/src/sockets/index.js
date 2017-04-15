export default {
	connect(data){
		console.log('Connected to Socket')
		
	},
	reconnect(data){
		if(this.$route.path == '/landing' || this.$route.path == '/signin' || this.$route.path == '/signup')
			this.$router.push('/')
		this.$socket.emit('joinFeed', null,'group',this.$store.getters.room)
	},
	currentUser(user){
		this.$store.commit('currentUser', user)
	},
	currentProfile(user){
		this.$store.commit('currentProfile', user)
	},
	currentGroup(group){
		this.$store.commit('currentGroup', group)
	},
	groupMembers(data) {
		this.$store.commit('groupMembers', data)
	},
	allGroups(arr){
		this.$store.commit('allGroups', arr)
	},
	room(str){
		this.$store.commit('room', str)
	},
	roasts(data){
		this.$store.commit('roasts', data)
	},
	searchResults(data){
		this.$store.commit('searchResults', data)
	}
}