<template>
  <!-- v-show="playList.length > 0" -->
    <div class='player' v-show="playList.length > 0" > 
      <transition name ='normal'> 
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
                <!-- 当前展示为player -->
                <div class='audio-machine' :class='judgPlay' v-show="curShow==='player'"  
                @click='showLyric' ref='audioMachine'>
                    <img :src =curSong.image   alt= "">
                </div>
                <!-- 当前展示为歌词 -->
                <div class='showLyric' v-show="curShow==='SongLyric'" ref='lyricList' >
                  <!-- <p v-for ='(index, line) in songLyric.lines'>
                    {{line.txt}}
                  </p> -->
                  <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}"
                    v-for="(line, index) in songLyric.lines" :key="line.key">
                    {{line.txt}}
                  </p>
                  
                </div>
            </div>
            <div class='bottom'>
                <!-- 进度条部分 --> 
                <div class='progress-wrap'>
                    <span class='time-l'>{{ format(currentTime) }}</span>
                    <progressBar :percent ='percent' @percentChange ='setProgress'></progressBar>
                    <span class='time-r'>{{ format(curSong.duration/1000) }}</span>
                </div>
                <div class='handle'>
                    <span @click='changeMode'><i :class='iconMode'></i></span>
                    <span @click='prev'><i class='iconfont icon-prevSong'></i></span>
                    <span @click='changePlay'><i :class ='iconPlay'></i> </span>
                    <span @click='next'><i class='iconfont icon-nextSong'></i></span>
                    <span><i class='iconfont icon-xihuan'></i></span>
                </div>
            </div>
        </div>
      </transition>
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
                    <span @click='next'><i class='iconfont icon-nextSong'></i></span>
                    <span @click ='changeMini'><i :class ='iconPlay' ></i> </span>
                </div>
            </div>
        </div>
        <audio ref='audio' @canplay ='ready' @ended ='end' @timeupdate ='updateTime' @error='error'></audio>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getSongLink, getSongLyric } from "../js/api.js";
import { playMode } from "../js/config.js";
import Lyric from "lyric-parser";
import progressBar from "./progress-bar";
import { shuffle } from "../js/util.js";

export default {
  data() {
    return {
      linkUrl: "",
      songReady: false,
      currentTime: 0,
      currentLineNum: 0,
      curShow: "player",
      songLyric: ""
    };
  },
  created() {},
  computed: {
    iconPlay() {
      return this.playing ? "iconfont icon-autoplay" : "iconfont icon-pause";
    },
    iconMode() {
      if (this.mode === playMode.next) {
        return "iconfont icon-icon-1";
      } else if (this.mode === playMode.loop) {
        return "iconfont icon-loop";
      } else {
        return "iconfont icon-random";
      }
    },
    judgPlay() {
      return this.playing ? "play" : "play pause";
    },
    percent() {
      return this.currentTime / this.curSong.duration;
    },
    ...mapGetters([
      "isNormal",
      "curSong",
      "playing",
      "mode",
      "playList",
      "squenceList",
      "curIndex"
    ])
  },
  methods: {
    back() {
      this.setNormal(false);
      this.curShow = "player";
    },
    ...mapMutations({
      setNormal: "SET_IS_NORMAL",
      setMode: "SET_PLAY_MODE",
      setPlaying: "SET_PLAYING",
      setPlayList: "SET_PLAY_LIST",
      setCurIndex: "SET_CUR_INDEX"
    }),
    _getSongLink(id) {
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
    _getSongLyric(id) {
      if (!id) {
        return;
      }
      getSongLyric(id)
        .then(res => {
          if (res.status === 200) {
            // console.log(res)
            this.songLyric = new Lyric(res.data.lrc.lyric, this.handleLyric);
          }
          if (this.playing) {
            console.log("滚动");

            this.songLyric.play();
            this.currentLineNum = 0;
            this.$refs.lyricList.scrollTo(0, 0, 1000);
          }
        })
        .catch(err => {
          // this.songLyric = ''
          // this.currentLineNum = 0
          // console.log(err);
        });
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    changePlay() {
      if (!this.songReady) {
        return;
      }
      this.setPlaying(!this.playing);
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      let index = this.curIndex - 1;
      if (index === -1) index = this.playList.length - 1;
      this.setCurIndex(index);
      this.setPlaying(true);
      this.songReady = false;
    },
    next() {
      console.log(this.mode);
      if (!this.songReady) {
        return;
      }
      let index = this.curIndex + 1;
      if (index === this.playList.length) index = 0;
      this.setCurIndex(index);
      this.setPlaying(true);
      this.songReady = false;
    },
    ready() {
      this.songReady = true;
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.setPlaying(true);
    },
    error() {
      this.songReady = true;
    },
    returnNormal() {
      this.setNormal(true);
    },
    changeMini() {
      this.setPlaying(!this.playing);
    },
    changeMode() {
      const mode = (this.mode + 1) % 3; // 0 1 2
      this.setMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.squenceList);
      } else {
        list = this.squenceList;
      }
      this.resetCurIndex(list);
      this.setPlayList(list);
    },
    resetCurIndex(list) {
      let index = list.findIndex(item => {
        //获取当前歌曲的索引
        return item.id === this.curSong.id;
      });
      this.setCurIndex(index);
      console.log(index);
    },
    showLyric(id) {
      this.curShow = "SongLyric";
      this._getSongLyric(this.curSong.id);
      // this.showSongLyric = true
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    format(times) {
      times = times | 0;
      let minute = (times / 60) | 0; //取整
      let second = times % 60;
      if (second < 10) second = "0" + second;
      return minute + ":" + second;
    },
    setProgress(percent) {
      // console.log(percent);
      this.$refs.audio.currentTime = this.curSong.duration / 1000 * percent;
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
    }
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
        white-space: nowrap;
        overflow: hidden;
      }
      .sing-name {
        // height:16px;
        white-space: nowrap;
        overflow: hidden;
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
      &.pause {
        animation-play-state: paused;
      }
    }
    .showLyric {
      height: 400px;
      margin-top: -20px;
      padding: 15px;
      overflow-y: scroll;
      text-align: center;
      width: 80%;
      margin: -20px auto 0 auto;
      .text {
        font-size: 16px;
        line-height: 36px;
        &.current {
          color: #fff;
        }
      }
      // overflow: hidden;
    }
    .showLyric ::-webkit-scrollbar {
      display: none;
    }
    img {
      width: 260px;
      height: 260px;
      display: inline-block;
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
  &.normal-enter-active,
  &.normal-leave-active {
    transition: all 0.4s;
    .top,
    .bottom {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  &.normal-enter,
  &.normal-leave-to {
    opacity: 0;
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
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
  }

  &.normal-enter-active,
  &.normal-leave-active {
    transition: all 0.4s;
    .head,
    .bottom {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  &.normal-enter,
  &.normal-leave-to {
    opacity: 0;
    .head {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
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



