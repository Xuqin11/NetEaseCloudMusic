<template>
  <div class="Asider">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :default-openeds="openeds"
        >
          <el-menu-item index="1" @click="homePageClick">
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="2" @click="videoClick">
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="3" @click="personalizedFMClick">
            <span slot="title">私人FM</span>
          </el-menu-item>
          <el-submenu index="4" v-if="this.$store.state.isLogin">
            <template slot="title">
              <span>创建的歌单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item1, index1) in this.$store.state.myList"
                :key="index1"
                :index="'4_' + (index1 + 1)"
                @click="collectListClick(item1)"
                >{{ item1.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5" v-if="this.$store.state.isLogin">
            <template slot="title">
              <span>收藏的歌单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item2, index2) in this.$store.state.collectList"
                :key="index2"
                :index="'5_' + (index2 + 1)"
                @click="collectListClick(item2)"
                >{{ item2.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "assets/css/asider.css";

import Bus from "@/assets/js/bus.js";

export default {
  name: "Asider",
  data() {
    return {
      openeds: ["4", "5"],
      uniqueOpened: false,
      // componentKey: 0,
      msg: "",
    };
  },
  methods: {
    // 路由跳转到发现音乐
    homePageClick() {
      if (this.$route.path.search("homePage") == -1) {
        this.$router.push("/homePage");
      }
    },
    // 路由跳转到视频页面
    videoClick() {
      if (this.$route.path.search("video") == -1) {
        this.$router.push("/video");
      }
    },
    // 路由跳转到私人FM
    personalizedFMClick() {
      if (this.$route.path.search("personalizedFM") == -1) {
        this.$router.push("/personalizedFM");
      }
    },
    // 路由跳转到歌单页面
    collectListClick(item) {
      // console.log(item)
      // 当第一次跳转到歌单页面时，延时总线事件的发送，使CollectList能够成功接收该事件
      if (this.$route.path.search("collectList") == -1) {
        // console.log('222');
        this.$router.push("/collectList");
        setTimeout(() => {
          Bus.$emit("collectListId", item);
        }, 1000);
      } else {
        Bus.$emit("collectListId", item);
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // forceRender() {
    //   this.componentKey += 1;
    // },
  },
};
</script>

<style scoped>
.el-col-12 {
  width: 100%;
}

.Asider {
  height: 84vh;
  overflow-x: hidden;
}

.Asider::-webkit-scrollbar {
  width: 6px;
}
.Asider::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgb(224, 224, 224);
}
.Asider::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgb(255, 255, 255);
}
</style>
