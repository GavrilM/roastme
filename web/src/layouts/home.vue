<template>
  <div class="home">
    <Toolbar v-on:shift="shift"></Toolbar>
    <div class="body-content" :class="{shift: shifted}">
      <div class="sideContainer nav"><Navigation></Navigation></div>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="sideContainer options"><Options v-on:shift="shift"></Options></div>
    </div>
  </div>
</template>

<script>
  import Toolbar from '@/components/toolbar'
  import Navigation from '@/components/navigation'
  import Options from '@/components/options'

  export default {
    name: 'Home',
    components: {
      Toolbar,
      Navigation,
      Options
    },
    data () {
      return {
        shifted: false,
      }
    },
    methods: {
      shift() {
        this.shifted = !this.shifted
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@sideWidth: 250px;

  .home{
    height: 100vh;
    font-family: 'Lato', sans-serif;
  }
  .body-content{
    top:50px;
    position:fixed;
    width: calc(~'100vw + 500px');
    height: calc(~'100vh - 50px');
    transition: transform 200ms ease;
  }
  .sideContainer{
    width: @sideWidth;
    position: absolute;
    height: 100%;
  }
  .content{
    position: absolute;
    left: @sideWidth;
    width: calc(~'100vw - 250px');
    height: 100%;
    overflow-y:hidden;
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
  .options{
    right: @sideWidth;
    border-left: 1px solid #d3d3d3;
  }
  .shift{
    transform: translateX(-250px);
  }

  @media screen and (max-width:850px){
    .navContainer{
      
    }
  }
</style>
