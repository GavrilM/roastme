<template>
	<div class="login">
		<signin v-show="!register"></signin>
		<signup v-show="register"></signup>
		<button v-on:click="register = !register">{{btnText}}</button>
	</div>
</template>

<script>
	import signin from '@/components/signin'
	import signup from '@/components/signup'

	export default {
		name: 'Login',
		components: {
			'signin': signin,
			'signup': signup,
		},
		data() {
			return {
				register: false
			}
		},
		computed: {
			btnText() {
				return this.register ? "Sign In" : "Register"
			}
		}
	}
</script>

<style lang="less">
	.login-form{
	form {
		padding: 20px;
		/*height: 30vh;*/
		width: 50vw;
		min-width: 300px;
		min-height: 300px;
		max-width: 500px;
		margin: 0 auto;
	}
	input[type="text"], input[type="password"]{
		margin: 10px 0;
		padding: 5px 5px;
		font-size: 1.5em;
		border: 1px solid grey;
		border-radius: 3px;
		transition: border 500ms;
	} 
	input[type="text"]:focus, input[type="password"]:focus{
		border: 1px solid lightblue;
		border-radius: 3px;
	}
	input[type="submit"]{
		background: none;
		border: 1px solid grey;
		color: #E80A0A;
		font-size: 1.5em; 
		border-radius: 3px;
		cursor: pointer;
		padding: 2px 10px;
		margin-top: 10px;
	}
	.invalid{
		border-color: red !important;
	}
	label{
		color: red;
		display:block;
	}
}
</style>