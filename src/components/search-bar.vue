<template>
  <div class='search'>
    <div class='search-bar' @click ='searched'>
       <input type="text" placeholder="搜索歌手、歌名、歌单"> 
       <span @click ='back' v-show ='cancel' >取消</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name :'search',
  props:{
    cancel:{
        // type:String,
        default:false
    }
  },
  data() {
    return {
        
    };
  },
  methods: {
    back () {
      this.$router.back();
    },
    searched() {
      this.$router.push(`/search`);
    }
  }
 
};
</script>
<style scoped lang='less'>
.search {
  width:100%;
  background:#f2f3f4;
  .search-bar {
    text-align: center;
    background: #8467b5;
    padding:20px 15px 20px 15px;
    color: #fff;
    input {
      height: 30px;
      width: 80%;
      border-radius: 20px;
      background: #eee;
      padding-left:15px;
      outline:medium;
      &.focus{
        outline:none;
      }
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
}
  }
}
</style>
