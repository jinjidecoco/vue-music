<template>
    <div class="music-list">
        <ul class='sing-list' v-for ='(item,index) in menuLists' >
            <li  @click ='selectSong(item,index)' :id = item.id >
                <div class='song-index'>{{index +1 }}</div>
                <div class='song-info'>
                    <h1 class='song-name'>{{item.name}} </h1>
                    <p class='song-player'>{{item.singer}} - {{item.album.name}}</p>
                    <!-- <img :src=item.album.picUrl alt=""> -->
                </div> 
                <div class='player' style=''>
                  <i class='iconfont icon-zhongxinshipin'></i>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "songList",
  props: {
    menuLists: {
      type: Array,
      defauly: []
    }
  },
  data() {
    return {};
  },
  methods: {
    selectSong(item, index) {
      this.$emit("selected", item, index);
    }
  }
};
</script>
<style scoped lang = 'less'>
.music-list {
  margin-bottom: 50px;
  .sing-list {
    li {
      display: flex;
      align-items: center;
      /* justify-content: space-around; */
      padding: 10px;
      border-bottom: 1px solid #e4e4e4;
      .song-index {
        color: #888;
        width: 30px;
      }
      .song-info {
        width: 270px;
        margin-right:10px;
        .song-player {
          font-size: 12px;
          color: #888;
          margin-top: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .song-name {
          font-size:18px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>


