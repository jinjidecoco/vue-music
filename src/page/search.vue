<template>
  <transition name ='search'>
    <div class='search-wrapper'>
        <search-bar :cancel=true  @query ='changeQuery'></search-bar>
        <div class='search-list' v-show ='!query'>
            <p>热门搜索</p>
            <span v-for ='item in songName'>
              {{item.first}}
            </span>
        </div>
        <div class='suggest-result'>
          <suggest :query ='query'></suggest>
        </div>
    </div>
  </transition>
</template>
<script type="text/javascript">
import searchBar from "../components/search-bar.vue";
import suggest from "../components/suggest.vue"
import { getHotSong } from "../js/api.js";
export default {
  name: "search",
  created() {
    this._getHotSong();
  },
  data() {
    return {
      songName: [],
      query:''
    };
  },
  components: {
    searchBar,suggest
  },
  methods: {
    back() {
      this.$router.back();
    },
    _getHotSong() {
      getHotSong().then(res => {
        if (res.status === 200) {
          this.songName = res.data.result.hots;
        }
      });
    },
    changeQuery(query){
      this.query =query
    }
  }
};
</script>
<style scoped lang='less'>
.search-enter-active,
.search-leave-active {
  transition: all 0.2s;
}
.search-enter,
.search-leave-to {
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
  z-index:100;
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
      color: #333;
      border: 1px solid #d8dbdf;
      padding: 8px 12px;
      margin: 5px 0 5px 5px;
    }
  }
  .suggest-result {
    overflow-y: auto;
    height:100%;
  }
}
</style>
