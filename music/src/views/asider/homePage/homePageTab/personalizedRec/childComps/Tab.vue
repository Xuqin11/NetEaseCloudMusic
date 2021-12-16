<template>
  <div class="tab">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first"></el-tab-pane>
      <el-tab-pane label="专属定制" name="second"></el-tab-pane>
      <el-tab-pane label="歌单" name="third"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import 'assets/css/tab.css'
// import 'assets/css/asider.css'

export default {
  name: "Tab",
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped></style>
