<template>
	<div class="roastTile">
		<div class="vote">
			<div v-on:click="vote(true)" class="lnr lnr-chevron-up" :class="uparrow"></div>
			{{datum.upvotes}}
			
			<div v-on:click="vote(false)" class="lnr lnr-chevron-down" :class="downarrow"></div>
		</div>
		{{datum.content}}
		<div v-on:click="remove" class="remove lnr lnr-trash" v-show="removable"></div>
		<div class="metadata">
			<div v-on:click="goToUser"><router-link :to="{ name: 'profile', params: { user: datum.author.username }}" v-show="!datum.anonymous">
				{{datum.author.displayName}}
			</router-link></div>
			<div>{{date | moment("from", "now")}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'roast',
		props: ['datum'],
		computed: {
			date(){
				return this.datum.createdAt
			},
			removable(){
				return this.$store.getters.user.username === this.datum.author.username
			},
			uparrow(){
				return { bold: this.datum.upvoted.indexOf(this.$store.getters.user.username) > -1 }
			},
			downarrow(){
				return { bold: this.datum.downvoted.indexOf(this.$store.getters.user.username) > -1 }
			}
		},
		methods: {
			vote(choice){
				const update = Object.assign({},this.datum)
				const upvoted = update.upvoted
				const downvoted = update.downvoted
				const username = this.$store.getters.user.username

				const down = downvoted.indexOf(username)
				const up = upvoted.indexOf(username)
				let direction = 0

				if(down > -1 && choice){
					update.downvoted.splice(down,1)
					update.upvoted.push(username)
					update.upvotes += 2
					direction = 2
				}
				else if(up > -1 && !choice){
					update.upvoted.splice(up,1)
					update.downvoted.push(username)
					update.upvotes -= 2
					direction = -2
				}
				if(up == -1 && down == -1){
					if(choice){
						update.upvotes++
						update.upvoted.push(username)
						direction = 1
					}
					else{
						update.upvotes--
						update.downvoted.push(username)
						direction = -1
					}
				}
				this.$socket.emit('vote',this.$store.getters.room,update, direction)
			},
			remove(){
				this.$swal({
					title: 'Delete Roast?',
					text: "No turning back.",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!',
					preConfirm: () => {
						return new Promise((resolve,reject) => {
							resolve(this.$socket.emit('remove',this.$store.getters.room,this.datum))
						})
					}
				})
				.then(() => {
					
				})
			},
			goToUser(){
				this.$socket.emit('joinFeed', this.$store.getters.room,'user/wall',this.datum.author.username)
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
	.roastTile{
		position: relative;
		background: white;
		border-bottom: 1px solid #d3d3d3;
		min-height: 110px;
		display: flex;
		align-items: center;
	}
	.vote{
		display:flex;
		position: relative;
		flex-direction: column;
		justify-content: space-around;
		height:100px;
		width: 50px;
		margin: 0 20px 0 5px;
	}
	.remove{
		position:absolute;
		right: 35px;
		top: 50%;
  		transform: translateY(-50%);
	}
	.bold{
		font-weight: 900;
		font-size: 1.2em;
	}
	.metadata{
		position:absolute;
		bottom: 0;
		padding-bottom: 10px;
		width:100%;
		max-width: 500px;
		display: flex;
		justify-content: space-around;
	}
</style>