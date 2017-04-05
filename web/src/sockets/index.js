export default {
	connect(data){
		console.log('Connected to Socket')
	},
	reconnect(data){
		if(this.$router.path == '/landing' || this.$router.path == '/signin' || this.$router.path == '/signup')
			this.$router.push('/')
	},
	currentUser(user){
		this.$store.commit('currentUser', user)
	},
	currentGroup(group){
		this.$store.commit('currentGroup', group)
	}
}