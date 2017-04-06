<template>
  <div class="home">
    <Toolbar v-on:showNav="navOpen" :groupId="groupId" :user="user"></Toolbar>
    <div class="navContainer"><Navigation :open="drawerVisible"></Navigation></div>
    <div class="content">
      <router-view :groupId="groupId" :user="user"></router-view>
    </div>
  </div>
</template>

<script>
  import Toolbar from '@/components/toolbar'
  import Navigation from '@/components/navigation'

  export default {
    name: 'Home',
    components: {
      Toolbar,
      Navigation
    },
    data () {
      return {
        drawerVisible: false,
        groupId: 'loading',
        user: 'loading'
      }
    },
    methods: {
      navOpen() {
        this.drawerVisible = !this.drawerVisible
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .home{
    height: 100vh;
  }
  .navContainer{
    position: fixed;
    top:50px;
    height: calc(~'100% - 50px');
    width: 250px;
  }
  .content{
    position: relative;
    top:50px;
    left: 250px;
    width: calc(~'100% - 250px');
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  @media screen and (max-width:650px){
    .navContainer{
      
    }
  }
</style>
