<template>
  <div id="app">
    <!-- 无差别  让所有的页面都缓存   -->
    <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view>
  </div>
</template>

<script>

export default{
  data(){
    return {
   
    }
  }
}
</script>

<style lang="less">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
*{
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.a{
  font-size:@mColor;
}
.tt-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}


//   覆盖vant默认的
.van-nav-bar__title{
  max-width: 75%;
}
</style>
