<template>
  <div class="PersonalizedMv">
    <h2>推荐MV</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in res" :key="index">
        <div class="grid-content bg-purple">
          <img :src="item.picUrl" alt="" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { PersonalizedMv } from "network/homePage.js";

export default {
  name: "personalizedMv",
  data() {
    return {
      res: "",
    };
  },
  created() {
    PersonalizedMv().then((res) => {
      this.res = res.result;
      // console.log(this.res);
      // console.log(res);
      // this.picUrl = res.map(item => {
      //   item.picUrl
      // })
      // console.log(this.picUrl);
    });
  },
};
</script>

<style scoped>
h2 {
  margin: 0;
  margin-bottom: 10px;
  text-align: left;
}

.el-row {
  display: flex;
  justify-content: space-around;
  height: 23vh;
  margin-bottom: 20px;
  overflow: hidden;
}
.el-col {
  /* width: 24%; */
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
  border-radius: 4px;
  min-height: 150px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-col-6 {
  width: 33%;
}

img {
  width: 100%;
  height: 100%;
}
</style>
