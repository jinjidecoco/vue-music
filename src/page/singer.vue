<template>
  <div class='player'>
    <ul class='singerLists'>
      <li v-for = 'item in singerList' :key ='item.id' @click ='selectSonger'>
        <h2> {{item.initial}}</h2>
        <img :src="item.avatar" alt="">
        <span> {{item.name}} </span>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { getSinger } from '../js/api.js'
import {creatSinger } from '../js/singer.js'

export default {
  created(){
    this._getSinger();

  },
  data() {
    return {
      singerList:[],

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
    },
    selectSonger (id) {
      alert(1);
    }

  }

}

</script>
<style scoped lang='less'>
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
</style>
