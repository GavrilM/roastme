export default {
	connect(data){
		console.log('Connected to Socket')
		
	},
	reconnect(data){
		const room = this.$store.getters.room
		if(this.$route.path == '/landing' || this.$route.path == '/signin' || this.$route.path == '/signup')
			this.$router.push('/')
		if(room){
			this.$socket.emit('joinFeed', null,room.substr(0,room.indexOf('/')),room.substr(room.indexOf('/')+1, room.length))	
		}
		
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