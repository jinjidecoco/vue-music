<template>
  <div class="tab">
    <router-link class="tab-item" to="/home">
      <span class="tab-link">首页</span>
    </router-link>
    <router-link class="tab-item" to="/player">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'tab',

  data() {
    return {

    }
  }
}

</script>
<style scoped lang='less'>
.tab {
  display: flex;
  height:45px;
  line-height:45px;
  background: #8467b5;
  .tab-item {
    flex: 1;
    text-align: center;
    text-decoration: none;
    .tab-link {
      padding-bottom: 3px;
      color: #ededf2;
    }
    &.router-link-active {
      .tab-link {
        color: #fff;
        border-bottom: 2px solid  #fff;
      }
    }
  }
}

</style>
