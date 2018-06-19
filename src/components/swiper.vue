<template>
	<div class='decoration'>
	  <div class='swiper'>
	    <mt-swipe :auto="4000">
	        <mt-swipe-item v-for ='item in swipers'>
	    		<img :src="item.picUrl">
	        </mt-swipe-item>
	    </mt-swipe>
	  </div>
    </div>
</template>
<script type="text/javascript">
import axios from "axios";

export default {
  name: "swiper",
  data() {
    return {
      swipers: []
    };
  },
  mounted() {
    this._getSwiper();
  },
  methods: {
    _getSwiper() {
      axios
        .get("http://localhost:3000/banner")
        .then(res => {
          if (res.status === 200) {
            this.swipers = res.data.banners;
          }
        })
        .catch(err => {
          console.log(2);
        });
    }
  }
};
</script>

<style scoped lang='less'>
.swiper {
  background: #8467b5;
  width: 100%;
  height: 180px;
  padding: 5px 8px;
  box-sizing: border-box;

  img {
    width: 100%;
    border-radius: 4px;
  }
  // .mint-swipe-indicators{
  // 	bottom:30px !important;
  // }
}
</style>
