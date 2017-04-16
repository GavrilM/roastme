<template>
	<div class="options">
		<router-link :to="{ name: 'profile', params: { user: this.$store.getters.user.username }}">
			<button v-on:click="viewSelf" class="justified">
				<div><span class="lnr lnr-user"></span>My Profile</div>
				<router-link :to="{name: 'settings'}" v-on:click.stop><span class="lnr lnr-pencil"></span></router-link>
			</button>
		</router-link>
		<section v-show="onGroup">
			<button><span class="lnr lnr-enter"></span>Group Code: {{addCode}}</button>
			<button v-on:click="addOpen=!addOpen"  v-show="invitable" class="justified"><div><span class="lnr lnr-plus-circle"></span>Add someone</div> <span :class="{lnr:true, 'lnr-chevron-down':!addOpen, 'lnr-chevron-up':addOpen}"></span></button>

			<div class="search" v-show="addOpen">
				<button v-on:click="invite">Invite a new user</button>
				<form >
					<input type="text" name="search" v-on:input="update" v-model="query" placeholder="Search..." autofocus="true">
					<input type="submit" name="" value="Add" v-show="selectedUser" v-on:click.prevent="addUser">
				</form>
				<ul class="results">
					<li v-for="item in results" v-on:click="select(item)">
						<img src="http://www.newdesignfile.com/postpic/2009/09/generic-user-icon-windows_354183.png">
						<h6>{{item.displayName}}</h6>
					</li>
				</ul>
			</div>

			<button v-on:click="membersOpen=!membersOpen" class="justified"><div><span class="lnr lnr-users"></span>View members</div><span :class="{lnr:true, 'lnr-chevron-down':!membersOpen, 'lnr-chevron-up':membersOpen}"></span></button>
			<div class="members" v-show="membersOpen">
				<ul class="results">
					<li v-for="item in members">
						<img src="http://www.newdesignfile.com/postpic/2009/09/generic-user-icon-windows_354183.png">
						<h6>{{item.displayName}}</h6>
					</li>
				</ul>
			</div>

			<button v-on:click="leaveGroup"  v-show="!admin"><span class="lnr lnr-exit"></span> Leave group</button>
			<button v-on:click="removeGroup"  v-show="admin"><span class="lnr lnr-cross-circle"></span> Delete group</button>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'options',
		data() {
			return {
				addOpen: false,
				membersOpen: false,
				query: '',
				selectedUser: false,
			}
		},
		computed: {
			onGroup() {
				return this.$route.path === '/' || this.$route.name === 'group' 
			},
			admin() {
				return this.$store.getters.user._id === this.$store.getters.group.owner
			},
			invitable() {
				return this.$store.getters.user._id === this.$store.getters.group.owner 
						|| this.$store.getters.group.policy && this.$store.getters.group.policy.membersCanAdd
			},
			results(){
				return this.$store.getters.search
			},
			addCode() {
				return this.$store.getters.group.addCode	
			},
			members() {
				return this.$store.getters.groupMembers	
			} 
		},
		methods: {
			addUser() {
				this.$socket.emit('addUser',this.selectedUser._id,this.$store.getters.group, res => {
					if(res) {
						this.$swal(`${this.selectedUser.displayName} has been added to ${this.$store.getters.group.name}`, null, 'success')
						this.query = ''
					}
					else 
						this.$swal(`Failed to add ${this.selectedUser.displayName}`, null, 'error')

				})
				
			},
			invite(){
				this.$swal.setDefaults({
					title: 'Invite a new user',
					input: 'text',
					confirmButtonText: 'Next &rarr;',
					showCancelButton: true,
					progressSteps: ['1', '2', '3'],
					showLoaderOnConfirm: true,
					animation: false
				})

				var steps = [
				{
					text: 'What\'s their email?',
					input: 'email',
					preConfirm: (email) => {
						return this.$http.post('/api/users/validEmail', {email})
						.then(res => email)
						.catch(err => {throw new Error(err.body)})
					}
				},
				{
					title: 'What\'s their first name?',
				 	text:' (Real name pls, or else no one can roast them)'
				},
				{ title: 'What\'s their last name?' }
				]

				this.$swal.queue(steps).then((result) => {
					result.push(this.$store.getters.group.addCode)
					this.$swal.resetDefaults()
					this.$socket.emit('invitation',result,res => {
						res ? this.$swal({
							title: 'Invitation sent!',
							confirmButtonText: 'Sweet!',
							type: 'success',
							showCancelButton: false
						}) : this.$swal({
							title: 'Problem with invitation',
							confirmButtonText: '...ok',
							type: 'error',
							showCancelButton: false
						})
					})
				}, err => {
					this.$swal.resetDefaults()
				})
				.catch(err => {
					console.log(err)
				})
			},
			update() {
				this.selectedUser = false
				if(this.$data.query)
					this.$socket.emit('search', this.$data.query, 'users')
			},
			leaveGroup(){
				if(this.$store.getters.allGroups.length <= 1){
					this.$swal("Can't leave your last group", "It's like the Hotel California.", 'error')
					return
				}
				this.$swal({
					title: 'Leave Group?',
					text: "Can't change your mind",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, let me leave!',
					preConfirm: () => {
						return new Promise((resolve,reject) => {
							resolve(this.$socket.emit('leaveGroup', this.$store.getters.group))
						})
					}
				})
				.then(() => {
					this.$socket.emit('joinFeed', this.$store.getters.room,'group',this.$store.getters.allGroups[0]._id)
					this.$emit('shift')
				})
			},
			removeGroup() {
				if(this.$store.getters.allGroups.length <= 1){
					this.$swal("Can't remove your last group", "It's like the Hotel California.", 'error')
					return
				}
				this.$swal({
					title: 'Delete Group?',
					text: "All roasts will disappear. Your group members will get kicked. Everyone will be sad.",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!',
					preConfirm: () => {
						return new Promise((resolve,reject) => {
							resolve(this.$socket.emit('removeGroup', this.$store.getters.group))
						})
					}
				})
				.then(() => {
					this.$socket.emit('joinFeed', this.$store.getters.room,'group',this.$store.getters.allGroups[0]._id)
					this.$emit('shift')
				})
			},
			select(user) {
				this.query = user.displayName
				this.selectedUser = user
			},
			viewSelf(){
				this.$socket.emit('joinFeed', this.$store.getters.room,'user/wall',this.$store.getters.user.username)
				this.$emit('shift')
			}
		}
	}
</script>

<style scoped lang="less">
	.options{
		overflow-y: scroll;
		height: 100%;
	}
	a{
		text-decoration: none;
		color: black;
	}
	.lnr{
		padding-right: 5px;
		font-weight: 700;
	}
	
	form{
		height: 50px;
		border-bottom: 1px solid #d3d3d3;
		input{
			margin-top: 10px;
			font-size: 1.2em;
			background: none;
			border-radius: 3px;
			border: 1px solid black;
		}
	}
	.search button {
		justify-content: center;
		height: 40px;
		border: none;
		margin: 5px auto;
		width: 70%;
		color: white;
		background: #d75339;
		font-size:1.2em;
		font-weight: 600;
		&:hover{
			border: 1px solid #d75339;
			color: #d75339;
			background: none;
		}
	}
	button{
		width: 100%;
		height: 60px;
		display:flex;
		align-items: center;
		background: white;
		border: none;
		border-bottom: 1px solid #d3d3d3;
		font-family: 'Poppins';
		font-size: 1.5em;
		font-weight: 600;
		cursor: pointer;
	}
	.results{
		width: 100%;
		position: relative;
		li{
			position: relative;
			min-height: 30px;
			border-bottom: 1px solid #d3d3d3;
			cursor: pointer;
			h6{
				top: 50%;
				left: 50%;
  				transform: translateY(-50%) translateX(-50%);
  				position:absolute;
  				font-weight: 600;
  				font-size: .8em;
			}
			img{
				position:absolute;
				top:5%;
				left: 5%;
				height: 70%;
				border-radius: 100%;
				border: 2px solid #7c3635;
			}
		}
	}
	.justified{
		display: flex;
		justify-content: space-between;
	}
</style>