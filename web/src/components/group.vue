<template>
	<div class="group">
		
	
		<Feed :roasts="roasts"></Feed>
	</div>
</template>

<script>
import Feed from '@/components/Feed'

	export default{
		name: 'Group',
		components: {
			Feed
		},
		data() {
			return {
				type: 'recent',
				amount: 20
			}
		},
		computed: {
			roasts() {
				return this.$store.getters.roasts
			}
		},
		methods: {
			sortTime(){
				this.$store.dispatch('sortByDate')
			},
			sortVotes(){
				this.$store.dispatch('sortByVote')
			}
		},
		created() {
			this.$socket.emit('joinFeed', this.$store.getters.room,'group',this.$store.getters.group._id)
		}

	}
</script>

<style scoped lang="less">
	.group{
		height: inherit;
		overflow-y: scroll;
	}
	.hidden{
		display: none;
	}
	.tabs{
		display:flex;
		width:100%;
		height: 60px;
		border-top: 1px solid #d75339;
		border-bottom: 1px solid #d75339;
		margin-top: 1px;
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
</style>