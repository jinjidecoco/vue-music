<template>
  <transition name ='search'>
    <div class='search-wrapper'>
        <search-bar :cancel = true>
        </search-bar>
        <div class='search-list'>
            <p>热门搜索</p>
            <span v-for ='item in songName'>
              {{item.first}}
            </span>
            <span>毛不</span>
        </div>
    </div>
  </transition>
</template>
<script type="text/javascript">
import searchBar from "../components/search-bar.vue";
import { getHotSong } from "../js/api.js";
export default {
  name: "search",
  created() {
    this._getHotSong();
  },
  data() {
    return {
      songName:[]
    };
  },
  components: {
    searchBar
  },
  methods: {
    back() {
      this.$router.back();
    },
    _getHotSong() {
      getHotSong().then(res => {
        if(res.status === 200){
           this.songName=res.data.result.hots;
        }
      })
    }
  }
};
</script>
<style scoped lang='less'>
.search-enter-active, .search-leave-active {
  transition: all 0.2s;
}
.search-enter, .search-leave-to {
  transform: translate3d(50%, 0 0);
  opacity: 0;
}
.search-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f2f3f4;
  .search-list {
    padding: 20px;
    p {
      color: #666;
      height: 48px;
      line-height: 48px;
    }
    span {
      display: inline-block;
      border-radius: 15px;
      font-size: 14px;
      color:#333;
      border: 1px solid #d8dbdf;
      padding: 8px 12px;
      margin: 5px 0 5px 5px;
    }
  }
}
</style>
