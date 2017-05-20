<template>
	<div class="feed">
		<input type="radio" id="recent" v-model="type" value="recent" class="hidden" checked="checked">
		<input type="radio" id="hottest" v-model="type" value="hottest" class="hidden">
		<div class="tabs">
			<label for="recent" v-on:click="sortTime" :class="{ active: type === 'recent' }" >Recent</label>
			<label for="hottest" v-on:click="sortVotes" :class="{ active: type === 'hottest' }">Hottest</label>
		</div>
		<div class="list">
			<Roast v-for="(roast,key,i) in roasts" :datum="roast" :key="roast._id"></Roast>
		</div>
	</div>
</template>

<script>
import Roast from '@/components/roast'

	export default{
		name: 'Feed',
		props: ['roasts'],
		components: {
			Roast
		},
		data() {
			return {
				type: this.$store.getters.feedType,
				amount: 20
			}
		},
		methods: {
			sortTime(){
				this.$store.commit("feedType", 'recent')
				this.$store.dispatch('sortByDate')
			},
			sortVotes(){
				this.$store.commit("feedType", 'hot')
				this.$store.dispatch('sortByVote')
			}
		}
	}
</script>

<style lang="less">
	.floating > .feed{
		box-shadow: -10px 0 30px 5px rgba(0,0,0,.25);
		transition: box-shadow 200ms ease;
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
			background: white;
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