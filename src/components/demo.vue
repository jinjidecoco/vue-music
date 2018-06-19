<template>
  <!-- v-show="playList.length > 0" -->
    <div class='player' v-show="playList.length > 0" > 
        <!-- 正常模式  -->
        <div class="normal-player" v-show ='isNormal'>
            <div class='bg-filter'>
                <img :src=curSong.image alt="">
            </div>    
            <div class='head'>
                <div class='back about-item' style='' @click.prevent = 'back'>
                    <i class='iconfont icon-fanhui' style='font-weight:600'></i>
                </div>
                <div class='sing-info about-item'>
                    <h1 class='sing-name' v-html='curSong.name'></h1>
                    <p class='singer'>{{curSong.singer}}</p>
                </div>
                <div class='send about-item'> <i class='iconfont icon-7'></i></div>
            </div>
            <div class='middle-player'>
                <div class='audio-machine' :class='{ play: playing }'>
                    <img :src =curSong.image   alt= "">
                </div>
            </div>
            <div class='bottom'>
                <!-- 进度条部分 -->
                <div class='progress-wrap'>
                    <span class='time-l'>{{ format(currentTime) }} </span>
                    <progressBar :percent ='percent' @percentChange ='setProgress'></progressBar>
                    <span class='time-r'>{{ format(curSong.duration/1000) }}</span>
                </div>
                <!-- 音乐操作 -->
                <div class='handle'>
                    <span><i class='iconfont icon-icon-1'></i></span>
                    <span @click='prev'><i class='iconfont icon-48shangyishou'></i></span>
                    <span @click='changePlay'><i :class ='iconPlay'></i> </span>
                    <span @click='next'><i class='iconfont icon-048caozuo_xiayishou'></i></span>
                    <span><i class='iconfont icon-xihuan'></i></span>
                </div>
            </div>
        </div>
        <!-- 迷你模式 -->
        <div class='mini-player' v-show ='!isNormal'>
            <div class='mini-handle'>  
                <div class='mini-img' :class='{ play: playing }'>
                    <img :src=curSong.image alt="" @click ='returnNormal'>
                </div>
                <div class='mini-desc'>
                   <h1 class='sing-name' v-html='curSong.name'></h1>
                   <p class='singer' style='padding-top:5px;'>{{curSong.singer}}</p>
                </div>   
                <div>
                    <span @click='next'><i class='iconfont icon-048caozuo_xiayishou'></i></span>
                    <span @click ='changeMini'><i :class ='iconPlay' ></i> </span>
                </div>
            </div>
        </div>
        <audio ref='audio' @timeUpdate = 'updateTime' ></audio>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getSongLink } from "../js/api.js";
import progressBar from "./progress-bar";

export default {
  data() {
    return {
      linkUrl: "",
      currentTime: 0
    };
  },
  created() {},
  computed: {
    iconPlay() {
      return this.playing ? "iconfont icon-bofang1" : "iconfont icon-zanting1";
    },
    percent () {  //percent值为播放进度与总进度的比值。
      return this.currentTime / this.curSong.duration
    },
    ...mapGetters(["isNormal", "curSong", "playing", "playList", "curIndex"])
  },
  methods: {
    back() {
      this.setNormal(false);
    },
    ...mapMutations({
      setNormal: "SET_IS_NORMAL",
      setPlaying: "SET_PLAYING",
      setCurIndex: "SET_CUR_INDEX"
    }),
    _getSongLink(id, cb) {
      if (!id) {
        return;
      }
      getSongLink(id)
        .then(res => {
          if (res.status === 200) {
            this.linkUrl = res.data.data[0].url;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePlay() {
      this.setPlaying(!this.playing);
    },
    prev() {
      if (!this.playList) {
        return;
      }
      let index = this.curIndex - 1;
      if (index === -1) index = this.playList.length - 1;
      this.setCurIndex(index);
      this.setPlaying(true);
    },
    next() {
      if (!this.playList) {
        return;
      }
      let index = this.curIndex + 1;
      if (index === this.playList.length) index = 0;
      this.setCurIndex(index);
      this.setPlaying(true);
    },
    returnNormal() {
      this.setNormal(true);
    },
    changeMini() {
      this.setPlaying(!this.playing);
    },
    updateTime (e) {
      alert(1);
      console.log(1);
      this.currentTime = e.target.currentTime
    },
    format(times) {
      times = times | 0;
      let minute = (times / 60) | 0; //取整
      let second = times % 60;
      if (second < 10) second = "0" + second;
      return minute + ":" + second;
    },
    setProgress (percent) {
      // 根据子组件传过来的百分比设置播放进度 
      this.$refs.audio.currentTime  = this.curSong.duration / 1000 * percent 
    }
  },
  watch: {
    curSong(newVal, oldVal) {
      if (!newVal.id) {
        return;
      }
      if (newVal.id === oldVal.id) {
        return;
      }
      this._getSongLink(newVal.id);
    },
    linkUrl(newUrl) {
      this.$refs.audio.src = newUrl;
      this.$refs.audio.play();
    },
    playing(newVal) {
      const audio = this.$refs.audio;
      newVal ? audio.play() : audio.pause();
    },
    // currentTime () {
    //   this.percent = this.currentTime / this.duration
    // }
  },
  components: {
    progressBar
  }
};
</script>
<style scoped lang='less'>
.player .normal-player {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // padding: 5px;
  z-index: 200;
  background: #f2f3f4;
  .bg-filter {
    position: absolute;
    height: 100%;
    width: 100%;
    top: -50%;
    bottom: -50%;
    filter: blur(30px);
    z-index: -1;
    opacity: 0.5;
    background: #2c3e50;
  }
  .head {
    height: 42px;
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid#e4e4e4;
    .about-item {
      padding: 10px;
      justify-content: space-between;
      .singer {
        font-size: 12px;
        padding-top: 5px;
        text-align: center;
      }
      .sing-name {
        text-align: center;
      }
    }
  }
  .middle-player {
    position: fixed;
    top: 80px;
    right: 0;
    bottom: 120px;
    left: 0;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .audio-machine {
      text-align: center;
      border: 25px solid #444;
      box-shadow: -5px -5px 5px #666;
      border-radius: 50%;
      &.play {
        animation: rotate 20s linear infinite;
      }
    }
    img {
      width: 260px;
      height: 260px;
      border-radius: 50%;
    }
  }
  .bottom {
    position: absolute;
    bottom: 10%;
    width: 100%;
    .progress-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .handle {
      display: flex;
      width: 100%;
      margin-top: 25px;
      span {
        text-align: center;
        flex: 1;
        i {
          font-size: 36px;
        }
      }
    }
  }
}
.player .mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ece7e7;
  background: #f2f3f4;
  z-index: 1000;
  .mini-handle {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      margin-left: 10px;
      i {
        font-size: 28px;
      }
    }
  }
  .mini-img {
    img {
      width: 45px;
      border-radius: 50%;
    }
    &.play {
      animation: rotate 20s linear infinite;
    }
  }
  .mini-desc {
    h1 {
      max-height: 20px;
      overflow: hidden;
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>



