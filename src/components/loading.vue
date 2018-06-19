<template>
    <div class='loading'>
       <img src="../assets/loading.gif" alt="">
       <p class='desc'>{{title}}</p>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "加载中..."
    }
  }
};
</script>
<style lang ='less' scoped>
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
  }
  img {
    width: 32px;
    height: 32px;
  }
}
</style>

