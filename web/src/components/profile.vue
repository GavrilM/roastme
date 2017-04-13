<template>
	<div class="profile" v-on:scroll="scroll" ref="profile">
		<div class="info">
			<img src="http://www.newdesignfile.com/postpic/2009/09/generic-user-icon-windows_354183.png">
			<h1>{{name}}</h1>
			<h3>Heat Level: {{heat}}</h3>
		</div>
		<Feed :roasts="roasts" :class="{floating: scrolled}"></Feed>
	</div>
</template>

<script>
	import Feed from '@/components/Feed'

	export default {
		name: 'profile',
		components: {
			Feed
		},
		data(){
			return {
				scrolled: false
			}
		},
		computed: {
			roasts() {
				return this.$store.getters.roasts
			},
			name() {
				return this.$store.getters.profile.displayName
			},
			heat() {
				return this.$store.getters.profile.points
			}
		},
		methods: {
			scroll(){
				this.$data.scrolled = this.$refs.profile.scrollTop != 0
			}
		},
		created() {
			this.$socket.emit('joinFeed', this.$store.getters.room,'user/wall',this.$route.params.user)
		}
	}
</script>

<style lang="less" scoped>
@infoheight: 250px;
	.profile{
		overflow-y: scroll;
		height:inherit;
		width:inherit;
	}
	.info{
		width: inherit;
		height: @infoheight;
		z-index: -5;
		position:fixed;
		border-bottom: 1px solid #d3d3d3;
		font-family: 'Poppins', sans-serif;
		padding: 0 5px;
		img{
			position:absolute;
			top:15px;
			left: 5%;
			height: 200px;
			border-radius: 100%;
			border: 10px solid #7c3635;
		}
		h1{
			font-size: 3em;
			font-weight: 700;
			position: absolute;
			left: calc(~"8% + 210px");
			top: 75px;
		}
		h3{
			font-size: 2em;
			font-weight: 600;
			position: absolute;
			left: calc(~"8% + 210px");
			top: 175px;
		}
	}
	.feed{
		position:relative;
		top: @infoheight;
		padding-top: 1px;
	}
	.floating{
		box-shadow: -10px 0 30px 5px rgba(0,0,0,.25);
		transition: box-shadow 200ms ease;
	}

	@media screen and (max-width:850px){
		.info{

		}
	}
</style>