<template>
    <transition name = 'slide'>
    <div class='singer-detail'>
        <div class='singer-info'  :style= 'bg' >
            <h1 class='back' @click ='back'> 
                <i class='iconfont icon-fanhui' style='float:left'></i> <span>歌手</span>
                <span style='float:right;' > 
                </span>
            </h1>   
            <div class="singer-intro">
                <h2>
                    {{singerTitle}}
                </h2>
            </div>      
        </div>
        <div class='song-list'>
            <h1>
                <i class='iconfont icon-iconset0481'></i> 
                <span class='play-all'>播放全部</span> 
                <span class='song-count'>(共{{songCount}}首)</span>
            </h1>
           <song-list :menu-lists='musicList' @selected = 'selectItem'></song-list>
        </div>
        <div class='loading-box' v-show ='!musicList.length'>
           <Loading></Loading>
        </div>
    </div>
    </transition>
</template>
<script>
import SongList from "../components/song-list.vue";
import Loading from "../components/loading.vue";
import { mapGetters, mapActions } from "vuex";
import { getSingerMusic } from "../js/api.js";
import { creatSong } from "../js/song.js";
export default {
  name: "SingerDetail",
  components: {
    SongList,
    Loading
  },
  data() {
    return {
      musicList: []
    };
  },
  created() {
    this._singerMusic(this.singer.id);
  },
  computed: {
    bg() {
      return `background-image: url(${this.singer.avatar})`;
    },
    singerTitle() {
      if (this.singer.aliaName) {
        return this.singer.name + ` (${this.singer.aliaName}) `;
      } else {
        return this.singer.name;
      }
    },
    songCount() {
      return this.musicList.length;
    },
    ...mapGetters(["singer"])
  },
  methods: {
    back() {
      this.$router.back();
    },
    _singerMusic(id) {
      if (!id) {
        this.$router.push("/singer");
        return;
      }
      getSingerMusic(id)
        .then(res => {
          if (res.status === 200) {
            this.musicList = res.data.hotSongs.map(item => {
              if (item.name && item.al.picUrl) {
                return creatSong(item);
              }
            });
            s;
          } else {
            alert(获取失败);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectItem(item, index) {
      this.selectedPlay({
        list: this.musicList,
        index: index
      });
    },
    ...mapActions(["selectedPlay"])
  }
  //监控prop传入的数据，防止为空
  //   watch: {
  //     musicList(newVal, oldVal) {
  //       this.musicList = newVal;
  //     }
  //   }
};
</script>
<style lang='less' scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}
.singer-detail {
  position: fixed;
  z-index: 200;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #f2f3f4;
  .singer-info {
    position: relative;
    padding: 15px 10px 5px 10px;
    height: 40%;
    background-size: cover;
    color: #fff;
    .back {
      span,
      i {
        font-size: 18px;
        font-weight: 800;
      }
    }
    .singer-intro {
      position: absolute;
      width: 100%;
      bottom: 10%;
      h2 {
        padding: 0 10px;
        font-weight: 800;
        font-size: 18px;
      }
    }
  }
  .song-list {
    padding: 8px 0 8px 8px;
    background: #fff;
    margin-top: 5px;
    border-radius: 10px;
    min-height: 100%;
    h1 {
      height: 40px;
      border-bottom: 1px solid #e4e4e4;
      i {
        font-size: 18px;
        font-weight: 800;
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



