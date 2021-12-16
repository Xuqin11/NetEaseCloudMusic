<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="250px">
      <el-carousel-item v-for="(item, index) in bannerPic" :key="index">
        <img :src="item" alt="" @click="musicPlay(index)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Bus from "@/assets/js/bus.js";

import { banner, personalized } from "network/homePage.js";
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

import "assets/css/swiper.css";

export default {
  name: "Banner",
  data() {
    return {
      // 所有轮播图信息
      banners: [],
      // 图片地址
      bannerPic: [],
      // 音频id
      songId: [],
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  created() {
    banner().then((res) => {
      // 取出轮播图地址
      console.log(res);
      this.banners = res.banners;
      this.bannerPic = res.banners.map((item) => item.pic);
      this.songId = res.banners.map((item) => item.encodeId)
      console.log(this.songId);
    });
  },
  methods: {
    musicPlay(index) {
      if (this.songId[index] != 0) {
        Bus.$emit("musicPlay_2", this.songId[index]);
        console.log(this.songId[index]);
      }
    },
  },
};
</script>

<style scoped>
.banner {
  height: 310px;
  /* background-color: red; */
}

.banner img {
  width: 100%;
  height: 100%;
}

.home-swiper {
  width: 100%;
  height: 250px;
  background-color: green;
}
</style>
