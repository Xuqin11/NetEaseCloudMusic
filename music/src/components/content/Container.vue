<template>
  <div>
    <el-container
      :style="{ width: this.width + 'px', height: this.height - 1 + 'px' }"
    >
      <song-detail v-show="isSongDetail" />
      <el-header style="background: rgb(236,65,65)">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <Asider :key="componentKey" />
        </el-aside>
        <el-container>
          <PlayList v-show="isPlayingList"></PlayList>
          <el-main class="main">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import "assets/css/base.css";

import Header from "components/content/header/Header";

import Asider from "views/asider/Asider.vue";
import HomePage from "views/asider/homePage/HomePage";
import CollectList from "views/asider/collectList/CollectList";
import Footer from "views/footer/Footer";
import PlayList from "components/common/PlayList";
import SongDetail from "views/home/SongDetail";

import { loginStatus } from "network/homePage";
import { userPlayList, subcount, status } from "network/login";
import { videoGroupList } from "network/video";

import { songDetail } from "network/songList";

import Bus from "@/assets/js/bus.js";

export default {
  name: "Container",
  components: {
    Header,

    Asider,

    HomePage,

    CollectList,
    Footer,
    PlayList,
    SongDetail,
  },
  data() {
    return {
      width: document.body.clientWidth,
      height: document.documentElement.clientHeight,
      componentKey: 0,
      isLogin: window.sessionStorage.getItem("isLogin")
        ? window.sessionStorage.getItem("isLogin")
        : false,
      userProfile: window.sessionStorage.getItem("userProfile")
        ? JSON.parse(window.sessionStorage.getItem("userProfile"))
        : "",
      myList: window.sessionStorage.getItem("myList")
        ? JSON.parse(window.sessionStorage.getItem("myList"))
        : "",
      collectList: window.sessionStorage.getItem("collectList")
        ? JSON.parse(window.sessionStorage.getItem("collectList"))
        : "",
      // 播放列表显示
      isPlayingList: false,
      // 歌词页面显示
      isSongDetail: false,
    };
  },
  created() {
    Bus.$on("inceptMessage", (msg) => {
      this.forceRender();
    });
    videoGroupList().then((res) => {});
    userPlayList(this.$store.state.userProfile.userId).then((res) => {});
    // 播放列表的显示与隐藏
    Bus.$on("playingList", () => {
      // console.log('playingList');
      this.isPlayingList = !this.isPlayingList;
      console.log(this.isPlayingList);
    });
    // 歌词页面的显示与隐藏
    Bus.$on("songDetailClick", (songId, picUrl, name, singer, album, flag) => {
      // console.log(songId);
      if (flag == "block") {
        console.log(flag);
        this.isSongDetail = !this.isSongDetail;
      }
    });
  },
  methods: {
    forceRender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
.el-header {
  background: rgb(236, 65, 65);
}

.el-header,
.el-footer {
  padding: 0 0;
  color: #333;
  text-align: center;
  line-height: 60px;
  background-color: #b3c0d1;
}

.el-footer {
  height: 10vh !important;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  border-right: 1px solid rgb(224, 224, 224);
}

.el-container {
  position: relative;
  height: 81vh;
}

.el-main {
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: center;
}

.el-main::-webkit-scrollbar {
  width: 6px;
}
.el-main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgb(224, 224, 224);
}
.el-main::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.main {
  height: 81.6vh;
  overflow: scroll;
  overflow-x: hidden;
}

.el-footer {
  border-top: 1px solid rgb(224, 224, 224);
}
</style>
