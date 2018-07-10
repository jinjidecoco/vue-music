<template>
    <div class="suggest" v-show ="query && suggestList.length>0">
        <p class='tip'>最佳匹配</p>
        <div class='singer' v-if ="suggestList.artists">
            <img :src="suggestList.artists[0].img1v1Url" alt="">
            <span>歌手：{{suggestList.artists[0].name}}</span>
        </div>
        <div class="singerMenu">
            <img src="" alt="">
            <span></span>
        </div>
        <div class='suggest-list'>
            <ul>
                <li v-for ="(item,index) in suggestList" >
                  <p>{{item.name}}</p>
                  <p>{{item.singer}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { searchSth } from "../js/api.js";

export default {
  name: "suggest",
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      suggestList: [],
    };
  },
  methods: {
    _searchSth(keyword) {
      searchSth(keyword).then(res => {
        if (res.status === 200) {
          //   console.log(res);
          this.suggestList = res.data.result.songs;
        } else {
        }
      });
    }
  },
  watch: {
    query(val) {
      if (!val) {
        return;
        this.suggestList=[];
        this.query = ''

      }
      console.log(val);
      this._searchSth(val);
    }
  }
};
</script>
<style  lang='less' scoped>
.suggest {
  .tip{
    padding:10px;  
    color:#8467b5;
  }  
  .suggest-list {
    ul {
      li {
        padding: 10px;
        border-bottom: 1px solid #e4e4e4;
      }
    }
  }
}
</style>


    