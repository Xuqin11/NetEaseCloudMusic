<template>
  <div class="collectListHeader">
    <div class="cover">
      <img :src="collectList.coverImgUrl" alt="" />
    </div>
    <div class="listInfo">
      <el-tag type="danger">歌单</el-tag>
      <h1 class="name">{{ collectList.name }}</h1>
      <div class="creator">
        <img :src="avatarUrl" alt="" />
        <div class="nickname">{{ nickname }}</div>
        <div class="createTime">{{ collectListCreateTime }}创建</div>
      </div>
      <div class="btn">
        <el-row>
          <el-button type="primary">收藏</el-button>
        </el-row>
        <div class="tags">标签:{{ collectList.tags }}</div>
        <div class="count">
          <span>歌曲:{{ collectList.trackCount }}</span>
          <span>播放:{{ collectList.playCount }}</span>
        </div>
        <p class="description">简介:{{ collectList.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils.js";

export default {
  name: "CollectListHeader",
  props: {
    collectList: {
      type: Object,
      default: "",
    },
  },
  data() {
    return {
      // 作者头像
      avatarUrl: "",
      // 作者昵称
      nickname: "",
      // 歌单创建时间
      collectListCreateTime: null,
    };
  },
  watch: {
    collectList() {
      this.avatarUrl = this.collectList.creator.avatarUrl;
      this.nickname = this.collectList.creator.nickname;
      this.collectListCreateTime = formatDate(
        this.collectList.createTime,
        "onlyDate"
      );
    },
  },
};
</script>

<style scoped>
.cover img {
  float: left;
  width: 200px;
  height: 200px;
}

.listInfo {
  float: left;
}

.listInfo h1 {
  margin-top: 0;
  margin-bottom: 15px;
  line-height: 33px;
}

.el-tag.el-tag--danger {
  float: left;
  margin-left: 20px;
  border-color: rgb(236, 65, 65);
  color: rgb(236, 65, 65);
  font-size: 16px;
  background-color: #fff;
}

.creator {
  display: flex;
  margin-top: -10px;
  margin-left: 20px;
  text-align: left;
  line-height: 25px;
}

.creator img {
  width: 25px;
  height: 25px;
  border-radius: 15px;
}

.nickname {
  color: rgb(80, 125, 175);
}

.listInfo h1 {
  text-align: left;
}

.creator div {
  margin-left: 15px;
  font-size: 14px;
}

.el-button--primary {
  margin-left: 20px;
  margin-top: 10px;
  border-color: rgb(236, 65, 65);
  border-radius: 20px;
  color: #fff;
  background-color: rgb(236, 65, 65);
}

.tags,
.count {
  height: 25px;
  margin-left: 20px;
  text-align: left;
  line-height: 25px;
  font-size: 10px;
  color: rgb(55, 55, 55);
}

.count span {
  display: inline-block;
  margin-right: 20px;
}

.btn p {
  width: 1000px;
  height: 20px;
  margin-bottom: 0;
  margin-left: 20px;
  font-size: 10px;
  line-height: 20px;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
