<template>
	<div class="settings">
		<div>
			<label>Email:</label><input type="text" name="email" v-model="email" v-validate="'required|email'">
			<input type="submit" name="send" v-on:click="changeEmail" value="Change Email">
		</div>
		<label v-show="errors.has('email')">Bad email.</label>
		<button v-on:click="changePic">Change Profile Pic</button>
		<button v-on:click="changePass">Change Password</button>
	</div>
</template>

<script>
	export default {
		name: 'settings',
		data(){
			return {
				email: this.$store.getters.user.email,

			}
		},
		methods: {
			changePic() {

			},
			changePass() {
				this.$swal({
					title: 'Change my password',
					input: 'password',
					showCancelButton: true,
					confirmButtonText: 'Change',
					showLoaderOnConfirm: true,
				  	preConfirm: (password) => {
					    return new Promise((resolve,reject) => {
					    	this.$socket.emit('passwordChange', password, res => {
								res ? resolve(res) : reject(`Failed to change password.`)
							})	
					    })
				  	},
				    allowOutsideClick: false
				})
				.then(res => {
					this.$swal({
						type: 'success',
						title: 'Changed password.'
					})
				}).catch(err => {

				})
			},
			changeEmail() {
				this.$socket.emit('emailChange', this.$data.email, res => {
					if(res)
						this.$swal('Email changed.', null, 'success')
				})
			}
		}
	}
</script>

<style scoped>
	.settings{
		display:flex;
		flex-direction: column;
		align-items: center;
	}
	input[type="text"], input[type="submit"]{
		margin: 10px 0;
		padding: 5px 5px;
		font-size: 1.5em;
		border: 1px solid grey;
		border-radius: 3px;
		transition: border 500ms;
		background: none;
	} 
	input[type="submit"]{
		cursor: pointer;
	}
	input[type="text"]:focus, input[type="password"]:focus{
		border: 1px solid lightblue;
		border-radius: 3px;
	}
	label{
		font-size: 1.5em;
		padding-right: 10px;
	}
	button {
		display:block;
		background: none;
		border: 1px solid grey;
		color: #E80A0A;
		font-size: 1.5em; 
		border-radius: 3px;
		cursor: pointer;
		padding: 2px 10px;
		margin: 10px 0;
	}
</style>