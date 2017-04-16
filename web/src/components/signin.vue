<template>
	<div class="signin login-form">
		<form v-on:submit="signIn" v-bind:class="formclass">
			<input type="text" name="email" placeholder="Email" v-validate="'required|email'"><span></span>
			<input type="password" name="password" placeholder="Password" v-validate="'required'">
			<br>
			<input type="submit" name="" >
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
				this.$router.push('/')
				this.$socket.close()
				this.$socket.open()
			})
			.catch((err => {
				this.$swal("Rekt.", err.body, 'error')
			}))
		}
	},
	computed: {
		formclass(){
			return {
				'submittable' : true
			}
		}
	}
}
</script>

<style>
</style>