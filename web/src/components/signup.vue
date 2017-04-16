<template>
	<div class="signup login-form">
		<form v-on:submit="onSubmit">
			<input v-validate="'required|email'" :class="{'invalid':errors.has('email')}" type="text" name="email" placeholder="Email">
			<label v-show="errors.has('email')">Get a real email.</label>
			<input v-validate="'required'" :class="{'invalid':errors.has('name')}" type="text" name="name" placeholder="Username">
			<label v-show="errors.has('name') || usernameInvalid">Nameless freak.</label>
			<input v-validate="'required'" type="password" name="code" placeholder="Add Code">
			<label v-show="errors.has('code') || codeInvalid">Bad Code. Maybe you should gtfo.</label>
			<input v-validate="'required|min:6'" :class="{'invalid':errors.has('password')}" type="password" name="password" placeholder="Password">
			<label v-show="errors.has('password')">Your password skills are bad af.</label>
			<br>
			<input type="submit" name="" :disabled="errors.any()">
		</form>
	</div>
</template>

<script>
	import { default as swal } from 'sweetalert2'

	export default {
		name: 'signup',
		data(){
			return{
				 usernameInvalid: false,
				 emailInvalid: false,
				 codeInvalid: false
			}
		},
		methods: {
			onSubmit(e) {
				e.preventDefault();
				const form = e.target.elements
				this.$validator.validateAll().then(res => {
					return this.$http.post('/api/users/signup', {
						displayName: form['name'].value,
						email: form['email'].value,
						password: form['password'].value,
						initial: form['code'].value,
					})
				})
				.then(res => {
					this.$socket.close()
					this.$socket.open()
					this.$router.push('/')
				})
				.catch(err => {
					if(err.body.code === 11000){
						this.$swal("You dun fukt up!", "That email is in use.", "error")
						this.$data.emailInvalid = true
					}
					else if(err.body === 'Invalid Code'){
						this.$swal("You dun fukt up!", "Wrong group code.", "error")
						this.$data.codeInvalid = true
					}
					else{
						console.log(err)
						this.$swal("You dun fukt up!", "Fix the form.", "error")
					}
				})
			}
		},
	}
</script>

<style lang ="less">

</style>