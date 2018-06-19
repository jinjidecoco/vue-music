<template>
    <div class='progress-bar' ref='progressBar' @click='progressClick'>
        <div class='progress-box'>
            <div class='progress' ref='progress'>
                <div class='progress-btn' ref='progressBtn' 
                @touchstart.prevent = 'progressTouchStart'
                @touchmove.prevent = 'progressTouchMove'
                @touchend.prevent = 'progressTouchEnd'>
                    <div class='circle'></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "progressBar",
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      //   curTime: 0,
      touchInfo: {},
      btnWidth: 18
    };
  },
  created() {
    this.touchInfo = {};
  },
  computed: {
    ...mapGetters(["curSong"])
  },
  methods: {
    format(times) {
      times = times | 0;
      let minute = (times / 60) | 0; //取整
      let second = times % 60;
      if (second < 10) second = "0" + second;
      return minute + ":" + second;
    },
    //开始移动
    progressTouchStart(e) {
      //touch已初始化
      this.touchInfo.initial = true;
      this.touchInfo.startX = e.touches[0].pageX; //点击的位置
      this.touchInfo.left = this.$refs.progress.clientWidth; // 点击时进度条长度
    },
    progressTouchMove(e) {
      if (!this.touchInfo.initial) {
        return;
      }
      const moveX = e.touches[0].pageX - this.touchInfo.startX; //计算按钮移动距离
      //设置偏移值
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - this.btnWidth,
        Math.max(0, this.touchInfo.left + moveX)
      );
      this._setOffset(offsetWidth);
    },
    progressTouchEnd(e) {
      this.touchInfo.initial = false;
      this._triggerPercent();
    },
    //点击滚动条
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._setOffset(offsetWidth);
      //this._setOffset(e.offsetX);
      // 通知父组件播放进度变化
      this._triggerPercent();
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth;
      const percent = Math.min(1, this.$refs.progress.clientWidth / barWidth);
      this.$emit("percentChange", percent);
    },
    //设置偏移
    _setOffset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touchInfo.initial) {
        const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth;
        const offsetWidth = newPercent * barWidth * 1000;
        this._setOffset(offsetWidth);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.progress-bar {
  height: 5px;
  display: flex;
  //   align-items: center;
  background: #666;
  width: 70%;
  margin: 0 5px;
  .progress-box {
    background: red;
    .progress {
      position: relative;
      .progress-btn {
        position: absolute;
        left: 8px;
        top: 2px;
        width: 18px;
        height: 18px;
        margin-top: -9px;
        margin-left: -9px;
        border-radius: 50%;
        background: #fff;
        .circle {
          width: 6px;
          height: 6px;
          background: red;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -3px;
          margin-left: -3px;
        }
      }
    }
  }
}
</style>


