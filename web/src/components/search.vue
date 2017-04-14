<template>
	<div class="search">
		<form>
			<input type="text" name="search" v-on:input="update" v-model="query" placeholder="Search..." autofocus="true">
			<input type="radio" id="users" v-model="category" value="users" class="hidden" v-on:change="update">
			<input type="radio" id="groups" v-model="category" value="groups" class="hidden" v-on:change="update">
			<br>
			<div class="tabs">
				<label for="users" :class="{ active: category === 'users' }" >Users</label>
				<label for="groups" :class="{ active: category === 'groups' }">Groups</label>
			</div>
		</form>
		<ul class="results">
			<li v-for="item in results" v-on:click="navigate(item)">
				<div v-if="category === 'users'">
					<img src="http://www.newdesignfile.com/postpic/2009/09/generic-user-icon-windows_354183.png">
					<h6>{{item.displayName}}</h6>
				</div>
				<div v-if="category === 'groups'">
					<h6>{{item.name}}</h6>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'search',
		data(){
			return {
				query: '',
				category: 'users'
			}
		},
		computed: {
			results(){
				return this.$store.getters.search
			}
		},
		methods: {
			update() {
				if(this.$data.query)
					this.$socket.emit('search', this.$data.query, this.$data.category)
			},
			navigate(item){
				if(item.username)
					this.$router.push({ name: 'profile', params: { user: item.username }})
			}
		},
		beforeDestroy(){
			this.$store.commit('searchResults', [])
		}
	}
</script>

<style lang="less" scoped>
@barHeight: 120px;
	.hidden{
		display:none;
	}

	.search{
		width: inherit;
	}
	form{
		position: fixed;
		display: flex;
		flex-direction:column;
		justify-content: space-between;
		align-items: center;
		height: @barHeight;
		width: inherit;
		border-bottom: 1px solid #d3d3d3;
		input{
			font-family: 'Lato';
			font-size: 1.5em;
			border:2px solid #d3d3d3;
			padding: 3px 5px;
			width: 90%;
			margin-top: 10px;
		}
		.tabs{
			display:flex;
			width:100%;
			height: 60px;
			label{
				display: flex;
				justify-content: center;
				align-items:center;
				width:100%;
				font-fmaily: 'Poppins';
				font-size: 1.2em;
				font-weight: 700;
			}
			.active{
				background-color: #d75339;
				color:white;
			}
		}
	}
	.results{
		width: inherit;
		max-width: 600px;
		position: relative;
		margin: 0 auto;
		top: @barHeight;
		border-left: 1px solid #d3d3d3;
		border-right: 1px solid #d3d3d3;
		li{
			min-height: 90px;
			border-bottom: 1px solid #d3d3d3;
			cursor: pointer;
			h6{
				top: 50%;
				left: 50%;
  				transform: translateY(-50%) translateX(-50%);
  				position:absolute;
  				font-weight: 700;
  				font-size: 1.2em;
			}
			img{
				position:absolute;
				top:5%;
				left: 5%;
				height: 80%;
				border-radius: 100%;
				border: 5px solid #7c3635;
			}
		}
	}
</style>