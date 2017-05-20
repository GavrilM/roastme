export default {
	sortByVote(context){
		const roasts = context.getters.roasts.sort((a,b) => {
			return b.upvotes - a.upvotes
		})
		context.commit('roasts', roasts)
	},
	sortByDate(context){
		const roasts = context.getters.roasts.sort((a,b) => {
			a = new Date(a.createdAt);
		    b = new Date(b.createdAt);
		    return a>b ? -1 : a<b ? 1 : 0;
		})
		context.commit('roasts', roasts)
	}
}