<template>
  <div class='search'>
    <div class='search-bar' @click ='searched' >
        <div class='input-box'>
           <input ref ='search' type="text" placeholder="搜索歌手、歌名、歌单" v-model ='query'> 
        </div>
        <span @click ='back' v-show ='cancel'>取消</span>
    </div>
  </div>
</template>
<script type="text/javascript">
import { debounce } from "../js/util.js";
export default {
  name: "search",
  props: {
    cancel: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$watch("query",
      debounce(newQuery => {
        this.$emit("query", newQuery);
      }, 300)
    );
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    searched() {
      this.$router.push(`/search`);
    }
  },
  watch: {
    // query: function(newQuery) {
    //   debounce(function() {
    //     return this.$emit("query", newQuery);
    //   },300);
    // }
  }
};
</script>
<style scoped lang='less'>
.search {
  width: 100%;
  background: #f2f3f4;
  .search-bar {
    display: flex;
    // text-align: center;
    background: #8467b5;
    justify-content: center;
    align-items: center;
    padding: 20px 15px 20px 15px;
    color: #fff;
    position: relative;
    .input-box {
      width: 80%;
      text-align: center;
      position: relative;
      input {
        width: 80%;
        height: 30px;
        border-radius: 20px;
        background: #eee;
        padding-left: 40px;
        outline: medium;
        display: inline-block;
        &.focus {
          outline: none;
        }
      }
      &::before,
      &::after {
        content: "☌";
        position: absolute;
        transform: rotate(180deg);
        top: 20px;
        left: 30px;
        color: #999;
        font-size: 28px;
        width: 10px;
        height: 10px;
        // background:red;
      }
    }

    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #999;
    }
  }
}
</style>
