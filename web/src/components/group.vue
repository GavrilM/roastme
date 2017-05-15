<template>
	<div class="group">
		<input type="radio" id="recent" v-model="type" value="recent" class="hidden" checked="checked">
		<input type="radio" id="hottest" v-model="type" value="hottest" class="hidden">
		<div class="tabs">
			<label for="recent" :class="{ active: type === 'recent' }" >Recent</label>
			<label for="hottest" :class="{ active: type === 'hottest' }">Hottest</label>
		</div>
	
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