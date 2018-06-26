<template>
  <div class='search'>
    <div class='search-bar'>
       <input type="text" placeholder="搜索">
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang='less'>
.search {
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  width:100%;
  background:#f2f3f4;
  .search-bar {
    text-align: center;
    margin-top: 10px;
    color:#fff;
    input {
      text-align:center;
      height: 30px;
      width: 80%;
      border-radius: 5px;
      background: #8467b5;
    }
  }
}
</style>
