<template>
  <div class="privatecontent">
    <h2>独家放送</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in result" :key="index">
        <div class="grid-content bg-purple">
          <img :src="item.sPicUrl" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { privatecontent } from "network/homePage.js";

export default {
  name: "Privatecontent",
  data() {
    return {
      result: [],
    };
  },
  created() {
    privatecontent().then((res) => {
      // console.log(res);
      this.result = res.result;
    });
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
  margin-bottom: 10px;
}

.el-row {
  width: 100%;
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 200px;
}

.grid-content img {
  width: 100%;
  border-radius: 5px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-col-6 {
  width: 33%;
  cursor: pointer;
  padding: 0 0!important;
}

.el-col-6:nth-child(2) {
  margin-left: .5%;
  margin-right: .5%;
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
</style>
