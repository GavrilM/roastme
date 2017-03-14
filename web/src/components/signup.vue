<template>
	<div class="signup login-form">
		<h2>Sign Up</h2>
		<form vue-on:submit.prevent="onSubmit">
			<input type="text" name="email" placeholder="Email">
			<input type="text" name="name" placeholder="Username">
			<input type="password" name="code" placeholder="Add Code">
			<input type="password" name="password" placeholder="Password">
			<input type="password" name="validate" placeholder=" Re-enter Password">
			<br>
			<input type="submit" name="">
		</form>
		<router-link to="signin">Sign In</router-link>
	</div>
</template>

<script>
	export default {
		name: 'signup'
	}
</script>

<style lang ="less">
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
	}
}
</style>