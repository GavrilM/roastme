<template>
	<nav>
		<div class="nav-item" v-on:click="makeGroup">
			Create Group
		</div>
		<div class="nav-item"></div>
		<div class="nav-list"></div>
		<div class="nav-item"></div>
		<div class="nav-list"></div>
	</nav>
	
</template>

<script>
	export default {
		name: 'navigation',
		props: [
			'open'
		],
		methods: {
			makeGroup() {
				this.$swal({
					title: 'Create a new group',
					input: 'text',
					showCancelButton: true,
					confirmButtonText: 'Create',
					showLoaderOnConfirm: true,
				  	preConfirm: (text) => {
					    return this.$http.post('/api/group/new',{
					    	name: text
					    })
				  	},
				    allowOutsideClick: false
				}).then(res => {
					this.$swal({
						type: 'success',
						title: 'Ok!',
						html: 'Result: ' + res
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	nav{
		user-select: none;
		height: 100%;
	}
	.nav-item{
		height: 40px;
		display:flex;
		align-items: center;
	}
	.visible{
		color:red
	}

</style>