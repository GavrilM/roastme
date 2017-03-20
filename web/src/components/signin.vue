<template>
	<div class="signin login-form">
		<h2>Sign In</h2>
		<form v-on:submit="signIn" v-bind:class="formclass">
			<input type="text" name="email" placeholder="Email" v-validate="'required|email'"><span></span>
			<input type="password" name="password" placeholder="Password" v-validate="'required|password'">
			<br>
			<input type="submit" name="" >
		</form>
		<router-link to="signup">Register</router-link>
	</div>
</template>

<script>
export default {
	name: 'signin',
	methods: {
		signIn(e){
			e.preventDefault()
			const form = e.target
		}
	},
	computed: {
		formclass(){
			console.log(this)
			return {
				'submittable' : true
			}
		}
	}
}
</script>

<style>
/*see signup*/
</style>