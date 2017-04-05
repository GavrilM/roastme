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
	currentGroup(group){
		this.$store.commit('currentGroup', group)
	},
	roasts(data){
		this.$store.commit('roasts', data)
	}
}