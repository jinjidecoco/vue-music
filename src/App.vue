<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import Tab from './components/tab.vue'
import player from './components/player'
export default {
  name: 'App',
  components: {
    Tab,player
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

</style>
