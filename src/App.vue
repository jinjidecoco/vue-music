<template>
  <div id="app">
    <div class='head'>
      <search-bar></search-bar>
      <tab></tab>
    </div> 
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import SearchBar from './components/search-bar.vue'
import Tab from './components/tab.vue'
import Player from './components/player'
export default {
  name: 'App',
  components: {
    Tab,Player,SearchBar
  },
}
</script>
<style>
@import './css/reset.less';
#app {
  font-family:  Helvetica-Light, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-ox-font-smoothing: grayscale;
  color: #2c3e50;
  /* font-family: 12px/1.5 arial,Helvetica Neue,tahoma,"Hiragino Sans GB",Microsoft YaHei,\5b8b\4f53; */
}
.head {
  position:fixed;
  width:100%;
  z-index:10;
  padding-bottom:200px;
  /* top:20px; */


}

</style>
