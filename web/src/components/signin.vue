<template>
	<div class="signin login-form">
		<h2>Sign In</h2>
		<form v-on:submit="signIn" v-bind:class="formclass">
			<input type="text" name="email" placeholder="Email" v-validate="'required|email'"><span></span>
			<input type="password" name="password" placeholder="Password" v-validate="'required'">
			<br>
			<input type="submit" name="" >
		</form>
	</div>
</template>

<script>
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
			})
			.catch((err => {
				this.$swal("Rekt.", err.body, 'error')
			}))
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