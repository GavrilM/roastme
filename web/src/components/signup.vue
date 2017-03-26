<template>
	<div class="signup login-form">
		<h2>Sign Up</h2>
		<form v-on:submit="onSubmit">
			<input v-validate="'required|email'" :class="{'invalid':errors.has('email')}" type="text" name="email" placeholder="Email">
			<label v-show="errors.has('email')">Fix your email, idiot.</label>
			<input v-validate="'required'" :class="{'invalid':errors.has('name')}" type="text" name="name" placeholder="Username">
			<label v-show="errors.has('name') || usernameInvalid">Sorry, your name sucks. Get a new one.</label>
			<input type="password" name="code" placeholder="Add Code">
			<label v-show="errors.has('code') || usernameInvalid">Bad Code. Maybe you should gtfo.</label>
			<input v-validate="'required|min:6'" :class="{'invalid':errors.has('password')}" type="password" name="password" placeholder="Password">
			<label v-show="errors.has('password')">I guess you're too stupid to make a good password.</label>
			<br>
			<input type="submit" name="" :disabled="errors.any()">
		</form>
	</div>
</template>

<script>
	import { default as swal } from 'sweetalert2'

	export default {
		name: 'signup',
		usernameInvalid: false,
		data(){
			return{
				 usernameInvalid: false,
				 emailInvalid: false
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
						password: form['password'].value
					})
				})
				.then(res => {
					this.$route.router.go('/')
				})
				.catch(err => {
					if(err.body.code === 11000){
						this.$swal("You dun fukt up!", "That email is in use.", "error")
						this.$data.emailInvalid = true
					}
					else
						this.$swal("You dun fukt up!", "Fix the form.", "error")
				})
			}
		},
	}
</script>

<style lang ="less">

</style>