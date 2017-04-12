export default {
	connect(data){
		console.log('Connected to Socket')
		this.$forceUpdate()
	},
	reconnect(data){
		if(this.$route.path == '/landing' || this.$route.path == '/signin' || this.$route.path == '/signup')
			this.$router.push('/')
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
	allGroups(arr){
		this.$store.commit('allGroups', arr)
	},
	room(str){
		this.$store.commit('room', str)
	},
	roasts(data){
		this.$store.commit('roasts', data)
	}
}