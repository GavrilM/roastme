<template>
  <div class="home">
    <div class="navContainer"><navigation :open="drawerVisible"></navigation></div>
    <Toolbar v-on:showNav="navOpen" :groupId="groupId" :user="user"></Toolbar>
    <router-view :groupId="groupId" :user="user"></router-view>
  </div>
</template>

<script>
import Toolbar from '@/components/toolbar'
import navigation from '@/components/navigation'

export default {
  name: 'Home',
  components: {
    Toolbar,
    navigation
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
<style scoped>
.home{
  height: 100vh;
}
.navContainer{
  position: absolute;
  top:50px;
  height: calc(~'100% - 50px');
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
</style>
