<template>
  <div class='singer'>
    <ul class='singerLists'>
      <li v-for = 'item in singerList' :id ='item.id' @click ='selectSinger(item)'>
        <!-- <h2> {{item.initial}}</h2> -->
        <img :src="item.avatar" alt="">
        <span> {{item.name}} </span>
      </li>
    </ul>
    <div class='guide-bar'>
      <ul>
        <li v-for ='item in guideIndex'>
          {{item}}
        </li>
        <!-- <li>b</li> -->
      </ul>
    </div>
    <router-view></router-view>

  </div>
</template>
<script type="text/javascript">
import { getSinger } from '../js/api.js'
import { creatSinger } from '../js/singer.js'
import { mapMutations } from "vuex";
export default {
  name: "singer",
  created(){
    this._getSinger();
  },
  data() {
    return {
      singerList:[],
      guideIndex:[],

    }
  },
  methods: {
    _getSinger () {
      getSinger().then(res =>{
        if(res.status === 200){
          let  queueSinger = res.data.list.artists;
          let newSonger = res.data.list.artists.map( item => {
             return creatSinger(item)
          })
          this._normalizeSinger(newSonger);
        }
      })
    },
    _normalizeSinger (list) {
      list.sort((a,b) => {
        return a.initial.localeCompare(b.initial)
      })
      this.singerList = list;
      list.map(item => {
        let strList=item.initial;
        if (this.guideIndex.indexOf(strList) === -1 &&strList.match(/[A-Z]/) ){
          this.guideIndex.push(strList);
        }
      })
    },
    selectSinger (singer) {
       this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations({ 
        setSinger: "SET_SINGER"
      }
    )


  }

}

</script>
<style scoped lang='less'>
.singer{
  .singerLists{
    margin-top:10px;
    li{
      display:flex;
      align-items: center;
      padding:5px;
      border-bottom:1px solid #e4e4e4;
      img{
        width:50px;
        height:50px;
        border-radius:5px;
      }
      span{
        margin-left:20px;
      }
    }
   
  }
  .guide-bar{
    position:fixed;
    right:10px;
    top:50%;
    transform:translateY(-50%);
    li{
      line-height:24px;
      color:#757575;
      font-weight:700
    }

  }
}  
</style>
