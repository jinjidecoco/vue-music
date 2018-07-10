<template>
    <div class='home'>
     <swiper> </swiper>	
  	 <section class='recommond'>
        <h2>推荐歌单<i class='iconfont icon-gengduo1'></i></h2>
        <ul  class='rec-playList'>
          <li v-for = 'item in musicMenu' @click ='checkMore(item)'>
            <div class='shadow'>
              <span><i class='iconfont icon-erji'></i>{{Math.floor(item.playCount/10000)}}万</span>
            </div>
              <img :src=item.picUrl  >
              <p class='desc-menu'>{{item.name}}</p>
          </li>		
        </ul>
  	 </section>
	   <section class='recommond'>
        <h2>最新音乐<i class='iconfont icon-gengduo1'></i></h2>
        <ul class='rec-playList'>
            <li v-for ='item in newMusic'>   
              <div class='shadow'></div> 
              <img :src=item.song.album.picUrl >
              <p class='desc-menu'>{{item.name}}</p>
            </li>		
        </ul>
  	 </section>
     <router-view></router-view>
    </div>
</template>
<script type="text/javascript">
import axios from "axios";
import Swiper from "../components/swiper.vue";
import { getSongMenu, getNewMusic } from "../js/api.js";
import { mapMutations } from "vuex";

export default {
  name: "home",
  components: {
    Swiper
  },
  data() {
    return {
      musicMenu: [],
      newMusic: []
    };
  },
  mounted() {
    this._getSongMenu();
    this._getNewMusic();
  },
  methods: {
    _getSongMenu() {
      axios
        .get(getSongMenu())
        .then(res => {
          if (res.status === 200) {
            this.musicMenu = res.data.result.slice(0, 6);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getNewMusic() {
      axios.get(getNewMusic()).then(res => {
        if (res.status === 200) {
          this.newMusic = res.data.result.slice(0, 6);
        }
      });
    },
    checkMore(item) {
      // const id = item.id;
      this.$router.push({ path: `/home/${item.id}` });
      this.setSingMenu(item);
    },
    ...mapMutations({
      setSingMenu: "SET_SING_MENU"
    })
  }
};
</script>
<style scoped lang='less'>
.home {
  padding-top:100px;
  .recommond {
    padding: 3px;
    h2 {
      line-height: 40px;
      font-weight: 500;
    }
    ul {
      display: flex;
      flex: 3;
      flex-wrap: wrap;
      li {
        flex: 1;
        list-style: none;
        position: relative;
        // padding:5px;
        justify-content: center;
        box-shadow: border-box;
        .shadow {
          // padding:5px;
          position: absolute;
          top: 0;
          width: 100%;
          height: 40px;
          background: linear-gradient(
            rgba(110, 110, 110, 0.4),
            rgba(255, 255, 255, 0)
          );
          span {
            padding: 4px;
            color: #fff;
            font-size: 12px;
            float: right;
          }
        }
      }
      img {
        width:120px;
        height:120px;
        display: inline-block;
        // width: 100%;
        border-radius: 3px;
      }
      .desc-menu {
        margin: 0 4px;
        font-size: 12px;
        line-height: 16px;
        height: 32px;
        text-align: left;
        // width: 100%;
        //   white-space:nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .red{
    width:7.5rem;
    height:200px;
    background: red;
  }
}
</style>
