<template>
  <div class="homePageTab">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first"></el-tab-pane>
      <el-tab-pane label="歌手" name="second"></el-tab-pane>
      <el-tab-pane label="歌单" name="third"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import "assets/css/tab.css";

export default {
  name: "HomePageTab",
  data() {
    return {
      activeName: "first",
    };
  },
  created() {},
  methods: {
    handleClick(tab) {
      if (tab.index == 0 && this.$route.path.search("personalizedRec") == -1) {
        console.log("personalizedRecClick");
        this.$router.replace("/homePage/personalizedRec");
      }
      if (tab.index == 1 && this.$route.path.search("singer") == -1) {
        console.log("singerClick");
        this.$router.replace("/homePage/singer");
      }
      if (tab.index == 2 && this.$route.path.search("songList") == -1) {
        console.log("singerList");
        this.$router.replace("/homePage/songList");
      }
    },
  },
};
</script>

<style scoped></style>
