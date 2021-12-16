<template>
  <div class="playList">
    <h3>当前播放</h3>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="" min-width="150"> </el-table-column>
      <el-table-column prop="singer" label="" min-width="150"> </el-table-column>
      <el-table-column prop="duration" label=""> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Bus from "@/assets/js/bus.js"

export default {
  name: "PlayList",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    // 双击歌曲时将歌单列表显示在播放列表上
    Bus.$on("playList", (tableData) => {
      this.tableData = tableData
      console.log(tableData)
    })
  }
};
</script>

<style scoped>
.playList {
  position: absolute;
  right: 0;
  width: 430px;
  height: 81.6vh;
  border-left: 1px solid rgb(224, 224, 224);
  overflow: scroll;
  overflow-x: hidden;
  z-index: 99;
  background-color: #fff;
}

h3 {
  padding: 0;
  margin: 10px;
}
</style>
