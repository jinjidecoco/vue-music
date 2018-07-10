<template>
  <div class='rank' >
    <ul class='rank-lists'>
      <li class='rank-item' v-for ='item in playList'>
        <img class='rank-pic' :src="item.coverImgUrl" alt="">
        <div class= "rank-desc" >
            <p v-for ="(song, index) in item.tracks ">
              {{index + 1}}.   {{song.name}} - {{song.ar[0].name}}
            </p>
        </div>
      </li>
    </ul>
    <div class='loading-box' v-show ='!playList.length'>
          <Loading></Loading>
    </div>
  </div>
</template>
<script type="text/javascript">
import Loading from "../components/loading.vue";
import { getRank } from "../js/api.js";
const ranklist = [3, 0, 2, 1, 4, 17];
export default {
  components:{
    Loading
  },
  created() {
    this._getRank();
  },
  data() {
    return {
      playList: []
    };
  },
  methods: {
    _getRank() {
      ranklist.forEach(item => {
        getRank(item).then(res => {
          if (res.status === 200) {
            let list = res.data.playlist;
            list.tracks = list.tracks.splice(0, 3);
            this.playList.push(list);
          }
        });
      });
    }
  }
};
</script>
<style scoped lang='less'>
.rank {
   padding-top:100px;
  .rank-lists {
    // margin-top:5px;
    padding: 10px;
    .rank-item {
      display: flex;
      align-items: center;
      // margin-top:5px;
      padding: 3px;
      border-bottom: 1px solid #e4e4e4;
      .rank-pic {
        width: 100px;
        height: 100px;
        border-radius: 5px;
      }
      .rank-desc {
        margin-left: 20px;
        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 2;
          white-space: nowrap;
          overflow: hidden;
        }
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
