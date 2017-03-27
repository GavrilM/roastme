<template>
	<div class="feed">
		<h1>Feed</h1>
		<span>{{groupId}}</span>
	</div>
</template>

<script>
	export default{
		name: 'Feed',
		props: ['groupId']
	}
</script>