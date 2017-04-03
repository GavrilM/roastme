<template>
	<header>
		<div class="left" v-on:click="showNav">
			A Long string of text
		</div>
		<div class="right">
			<span><router-link to="search">Search</router-link></span>
			<span v-on:click="roast">Roast</span>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'toolbar',
		props: ['user', 'groupId'],
		methods: {
			roast() {
				this.$swal({
					title: 'Roast',
					input: 'text',
					showCancelButton: true,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
					preConfirm: (text) => {
					    return this.$http.post('/api/roast/new', {
							content: text,
							createdAt: new Date(),
							author: this.user._id,
							location: {
								where: 'group',
								id: this.groupId
							}
						})
				  	}
				})
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			},
			showNav() {
				this.$emit('showNav')
			}
		}
	}
</script>

<style lang="less" scoped>
	header {
		height: 50px;
		position: relative;
		border: 1px solid black;
		user-select: none;
		div{
			position:absolute;
			top: 50%;
  			transform: translateY(-50%);
		}
		.left{
			border: 1px solid red;
			left: 20px;
			cursor:pointer;
		}
		.right{
			border: 1px solid blue;
			right: 20px;
			span{
				margin-left: 5px;
				cursor:pointer;
			}
		}
	}
</style>