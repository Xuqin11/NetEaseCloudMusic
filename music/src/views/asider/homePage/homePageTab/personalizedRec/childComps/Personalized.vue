<template>
  <div class="personalized">
    <h2>推荐歌单></h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in result_1" :key="index">
        <div class="grid-content bg-purple">
          <span class="play">
            <i class="el-icon-video-play"></i>
            <i class="playCount">{{item.playCount}}</i>
          </span>
          <img :src="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
          <div class="playBtn">
            <img src="~assets/img/main/bofang.png" alt="">
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in result_2" :key="index">
        <div class="grid-content bg-purple">
          <span class="play">
            <i class="el-icon-video-play"></i>
            <i class="playCount">{{item.playCount}}</i>
          </span>
          <img :src="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { personalized } from "network/homePage";

export default {
  name: "Personalized",
  data() {
    return {
      result_1: [],
      result_2: [],
    };
  },
  created() {
    personalized().then((res) => {
      // console.log(res);
      // console.log(res.result);
      // console.log(this.result_1);
      this.result_1 = res.result.splice(0, 5);
      // console.log(this.result_1);
      this.result_2 = res.result.splice(5, 5);
      // this.picName_1 = res.result.map(item => item.name).splice(0,5)
      // this.picName_2 = res.result.map(item => item.name).splice(5,5)
      // console.log(res.result);
      // console.log(this.result_2);
    });
  },
};
</script>

<style scoped>
.personalized {
  margin-bottom: 30px
}

h2 {
  /* float: left; */
  text-align: left;
  margin: 0;
  margin-bottom: 10px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  position: relative;
  border-radius: 4px;
  min-height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.bg-purple {
  background-color: rgb(233, 238, 243);
}

.el-col-6 {
  width: 20%;
  height: 280px;
  /* margin-bottom: 20px; */
  cursor: pointer;
}

.el-col-6 img {
  width: 100%;
  border-radius: 5px;
}

.el-col-6 p {
  width: 100%;
  height: 50px;
  margin: 0;
  /* margin-top: -10px; */
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

.play {
  position: absolute;
  /* top: -10px; */
  right: 4px;
  color: rgb(253, 253, 253);
}

.playCount {
  margin-left: 2px;
  font-style: normal;
  font-weight: 200;
}

.playBtn {
  position: absolute;
  bottom: 60px;
  right: 10px;
}
</style>
