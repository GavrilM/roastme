<template>
	<div class="login">
		<div class="tabs">
			<label v-on:click="register=false" :class="{ active: !register, btn: true }" >Sign In</label>
			<label v-on:click="register=true" :class="{ active: register, btn: true }">Sign Up</label>
		</div>
		<div class="btn hasCode" v-on:click="withCode">
			I haz code
		</div>
		<signin v-show="!register"></signin>
		<signup v-show="register"></signup>
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
		},
		methods: {
			withCode() {
				this.$swal({
					title: 'Enter your code.',
					input: 'password',
					showCancelButton: true,
					confirmButtonText: 'Enter the Club',
					showLoaderOnConfirm: true,
				  	preConfirm: (text) => {
					    return new Promise((resolve,reject) => {
					    	this.$http.post('api/users/validateCode', {
								confirmCode: text
							})
							.then(res => {
								res.body ? resolve(text) : reject(`Failed to validate code.`)
							})	
					    })
				  	},
				}).then(res => {
					this.$swal({
						title: 'Set a password.',
						input: 'password',
						showCancelButton: true,
						confirmButtonText: 'Let\'s Go!',
						showLoaderOnConfirm: true,
					  	preConfirm: (text) => {
						    return new Promise((resolve,reject) => {
						    	if(text.length < 6) reject('Too short.')
						    	this.$http.post('api/users/claimInvite', {
									confirmCode: res,
									password: text
								})
							    .then(res => {
									if(res.body){
										resolve(text)
										this.$socket.close()
										this.$socket.open()
										this.$router.push('/')
									}else {
										reject(`Failed to validate code.`)
									}
								})
							})
					  	},
					})
				})
				.catch(err => {

				})
			}
		}
	}
</script>

<style lang="less">
.login{

	.btn{
		display: flex;
		justify-content: center;
		align-items:center;
		width:100%;
		font-family: 'Poppins';
		font-size: 1.2em;
		font-weight: 700;
		cursor: pointer;
	}
	.active{
		background-color: #d75339;
		color:white;
	}
	.tabs{
		display:flex;
		width:500px;
		height: 40px;
		margin: 15px auto 0;
		border: 1px solid #d75339;
		border-left: none;
		label{	
			border-left: 1px solid #d75339;
		}
	}
	.hasCode{
		width:500px;
		height: 40px;
		margin: 0 auto;
		border: 1px solid #d75339;
		border-top: none;
		&:hover{
			.active;
		}
	}
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
}
</style>