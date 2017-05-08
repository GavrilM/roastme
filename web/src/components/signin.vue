<template>
	<div class="signin login-form">
		<form v-on:submit="signIn" v-bind:class="formclass">
			<input type="text" name="email" placeholder="Email" v-validate="'required|email'"><span></span>
			<input type="password" name="password" placeholder="Password" v-validate="'required'">
			<br>
			<input type="submit" name="" >
			<br>
			<a v-on:click="forgot">Forgot my Password</a>
		</form>
		
	</div>
</template>

<script>
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

export default {
	name: 'signin',
	methods: {
		signIn(e){
			e.preventDefault()
			const form = e.target.elements
			this.$http.post('/api/users/signin', {
				username: form['email'].value,
				password: form['password'].value
			})
			.then((res) => {
				this.$socket.close()
				this.$socket.open()
				this.$router.push('/')
			})
			.catch((err => {
				this.$swal("Rekt.", err.body, 'error')
			}))
		},
		forgot(){
			let current
			this.$swal.setDefaults({
					title: 'Forgot my password',
					confirmButtonText: 'Next &rarr;',
					showCancelButton: true,
					progressSteps: ['1', '2', '3', '4'],
					showLoaderOnConfirm: true,
					animation: false
				})

				var steps = [
				{
					text: 'What\'s your email?',
					input: 'email',
					preConfirm: (email) => {
						return this.$http.post('/api/users/forgotten', { email })
						.then(res => {current = email})
						.catch(err => {throw new Error(err.body)})
					}
				},
				{
					title: 'Check your email for a code',
					input: 'text',
				 	text:' Enter validation code:',
				 	preConfirm: code => {
				 		return this.$http.post('api/users/confirmReset', { email: current, code })
				 	}
				},
				{
					title: 'Enter new password',
					input: 'password',
				 	preConfirm: password => {
				 		return this.$http.post('api/users/newPassword', { email: current, password })
				 	}
				},
				{
					title: 'All Set!',
					text: 'You can now log in with your new password.'
				}]

				this.$swal.queue(steps).then((result) => {
					this.$swal.resetDefaults()
				})
				.catch(err => {
					this.$swal.resetDefaults()
					console.log(err)
				})
		}
	},
	computed: {
		formclass(){
			return {
				'submittable' : true
			}
		},
	}
}
</script>

<style scoped lang="less">
a{
	display: block;
	margin-top: 20px;
	cursor: pointer;
	&:hover{
		text-decoration: underline;
	}
}
</style>