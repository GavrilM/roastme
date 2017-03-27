<template>
  <div class="home">
    <div class="navContainer"><navigation :open="drawerVisible"></navigation></div>
    <Toolbar v-on:showNav="navOpen"></Toolbar>
    <router-view :groupId="groupId"></router-view>
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
      
    }
  },
  methods: {
    navOpen() {
      this.drawerVisible = !this.drawerVisible
      console.log("ran")
    }
  },
  computed: {
    groupId(){
      console.log("ran")
      this.$http.get('/api/users/initialGroup')
        .then(res => {
          this.groupId = res
          console.log(this)
        })
        .catch(err => {
          console.log(err)
        })
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
