<template>
    <div class='menu-detail'>
        <div class='menu-info' :style='bgImg' >
            <h1 class='back' @click ='back'> 
                <i class='iconfont icon-fanhui' style='float:left'></i> <span>歌单</span>
                <span style='float:right;' > 
                  <i class='iconfont icon-erji' style ='font-size:20px'></i>
                  <!-- <i :class='miniIcon' style ='font-size:24px'></i> -->
                  {{visitCount}}
                </span>
            </h1> 
            <div class='menu-intro'>
               <p class='title'> {{menuTitle}}</p>
               <ul class='handle'>
                 <li><i class='iconfont icon-pinglun'></i><br/><span>评论</span></li>
                 <li><i class='iconfont icon-7'></i><br/><span>转发</span></li>
                 <li><i class="iconfont icon-xiazai"></i><br/><span>下载</span></li>
               </ul>
            </div>           
        </div>
        <div class='menu-list'>
            <h1>
             <i class='iconfont icon-iconset0481'></i> 
             <span class='play-all'>播放全部</span> 
             <span class='song-count'>(共{{songCount}}首)</span>
            </h1>
           <song-list :menu-lists='menuLists' @selected='selectItem'></song-list>
        </div>
        <div class='loading-box' v-show ='!menuLists.length'>
           <Loading></Loading>
        </div>
    </div>
</template>

<script type="text/javascript">
import SongList from "../components/song-list.vue";
import Loading from "../components/loading.vue";
import axios from "axios";
import { getMenuDetail } from "../js/api.js";
import { creatSongList } from "../js/song.js";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "MenuDetail",
  components: {
    SongList,
    Loading
  },
  data() {
    return {
      menuLists: []
    };
  },
  created() {
    // console.log(this.singMenu.id)
    this._getMenuDetail(this.singMenu.id);
  },
  computed: {
    bgImg() {
      return `background-image: url(${this.singMenu.picUrl})`;
    },
    visitCount() {
      if (this.singMenu.playCount < 1e5) {
        return Math.floor(this.singMenu.playCount);
      } else {
        return Math.floor(this.singMenu.playCount / 10000) + "万";
      }
    },
    songCount() {
      return this.menuLists.length;
    },
    menuTitle() {
      return this.singMenu.name;
    },
    ...mapGetters(["singMenu", "isNormal"]),

    miniIcon() {
      console.log(this.isNormal);
      return this.isNormal
      // if(!this.isNormal){
      //   return
      // }else{
      //   return this.isNormal ? "iconfont" : "iconfont icon-yinle";
      // }
    }
  },
  methods: {
    _getMenuDetail(id) {
      if (!id) {
        this.$router.push("/home");
        return;
      }
      getMenuDetail(id)
        .then(res => {
          if (res.status === 200) {
            this.menuLists = res.data.result.tracks.map(item => {
              return creatSongList(item);
            });
            // 把返回的数据用构造函数creatSongList 重组
          } else {
            alert(获取失败);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.back();
    },
    selectItem(item, index) {
      this.selectedPlay({
        list: this.menuLists,
        index: index
      });
    },
    ...mapMutations({
       setNormal: "SET_IS_NORMAL"
    }),
    ...mapActions(["selectedPlay"])
  }
};
</script>
<style scoped lang='less'>
// 隐藏推荐主体内容部分
.menu-detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #f2f3f4;
  z-index: 10;
  .menu-info {
    position: relative;
    padding: 15px 10px 5px 10px;
    height: 35%;
    background-size: cover;
    color: #fff;
    .title {
      font-weight: 600;
    }
    .handle {
      display: flex;
      width: 100%;
      margin-top: 15px;
      li {
        text-align: center;
        flex: 1;
        i {
          font-size: 18px;
        }
        span {
          font-size: 12px;
        }
      }
    }
    .back {
      text-align: center;
      font-size: 18px;
      i {
        font-weight: 800;
      }
      span {
        font-weight: 500;
      }
    }
    .menu-intro {
      position: absolute;
      width: 100%;
      bottom: 10%;
    }
  }
  .menu-list {
    padding: 8px 0 8px 8px;
    background: #fff;
    margin-top:5px;
    border-radius: 10px;
    min-height: 100%;
    h1 {
      height: 40px;
      border-bottom: 1px solid #e4e4e4;
      i{ 
        font-size:18px;  
        font-weight:800
      }
      .play-all {
        font-size: 18px;
        line-height: 40px;
      }
      .song-count {
        font-size: 14px;
        line-height: 40px;
        color: #888;
      }
    }
  }
  .loading-box {
    position: fixed;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
