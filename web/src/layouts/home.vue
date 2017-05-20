<template>
  <div class="home">
    <Toolbar v-on:menu="toggleMenu" v-on:options="toggleOptions"></Toolbar>
    <div class="body-content" :class="{optionShift: optionsopen, menuShift: navopen}">
      <div class="sideContainer nav"><Navigation v-on:menu="toggleMenu"></Navigation></div>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="sideContainer optionPane"><Options v-on:options="toggleOptions"></Options></div>
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
        navopen: false,
        optionsopen: false,
      }
    },
    methods: {
      toggleMenu() {
        this.navopen = !this.navopen
        if(this.navopen)
          this.optionsopen = false
      },
      toggleOptions() {
        this.optionsopen = !this.optionsopen
        if(this.optionsopen)
          this.navopen = false
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
    width: calc(~'100vw + 650px');
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
  .optionPane{
    right: @sideWidth;
    border-left: 1px solid #d3d3d3;
    width: 400px;
  }
  .optionShift{
    transform: translateX(-400px);
  }

@media screen and (max-width:850px){
    .body-content > div{
      width: 100vw;
      position: static;
    }
    .body-content{
      width: 300vw;
      transform: translateX(-100vw);
      display: flex;
    }
    .content{
      left: 0;
      position: static;
    }
    .menuShift{
      transform: translateX(0vw);
    }
    .optionShift{
      transform: translateX(-200vw);
    }


    .navContainer{
      
    }

  }
  
</style>
