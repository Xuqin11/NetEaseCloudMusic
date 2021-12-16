<template>
  <div class="songDetail">
    <div
      class="top"
      :style="{
        backgroundImage:
          'linear-gradient(' +
          backgroundColor +
          ' -150%, rgba(255,255,255,255) 80%)',
      }"
    >
      <div class="left">
        <img
          src="~assets/img/main/player_bar.3b9b552f.png"
          alt=""
          :class="{ onplaying: isPlay }"
        />
        <img
          src="~assets/img/main/disc.e89e0c3e.png"
          alt=""
          :class="{ imgOnplaying: isPlay }"
        />
        <img :src="picUrl" alt="" :class="{ imgOnplaying: isPlay }" />
      </div>
      <div class="center">
        <marquee v-if="name">
          <template>
            <div class="name">
                {{ name }}
            </div>
          </template>
        </marquee>
        <div class="singer">{{ singer }} - {{ album }}</div>
        <ul class="lyric" ref="lyric">
          <li
            :class="{ chosen: index == highlightIndex }"
            v-for="(item, key, index) in currentMUsicLyric"
            :key="key"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="simiSong">
          <ul>
            <h3>喜欢这首歌的人也听</h3>
            <li v-for="(item, index) in simiSong" :key="index">
              <img :src="item.album.picUrl" alt="" />
              <span>{{ item.name }} - </span>
              <span v-for="(singer, index) in item.artists" :key="index"
                >{{ singer.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="commentsWrap">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="140"
        show-word-limit
        resize="none"
        rows="4"
      >
      </el-input>
      <button class="commentBtn">评论</button>
      <h4>全部评论({{ commentsTotal }})</h4>
      <div
        class="hotComment"
        v-for="(item, index, key) in hotComments"
        :key="key"
      >
        <div class="hotCommentAvatar">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="hotCommentInfo">
          <ul>
            <li>
              <span>{{ item.user.nickname }}:</span>
              <div>{{ item.content }}</div>
            </li>
            <li>{{ formatDate(item.time) }}</li>
          </ul>
        </div>
      </div>
      <h4 class="newComments">最新评论({{ commentsTotal }})</h4>
      <div :key="componentKey">
        <div class="comments" v-for="(item, index) in comments" :key="index">
          <div class="commentsAvatar">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="commentsInfo">
            <ul>
              <li>
                <span class="commentsNickname">{{ item.user.nickname }}:</span>
                <div>{{ item.content }}</div>
                <div class="replied" v-if="item.beReplied.length != 0">
                  <span class="beRepliedNickname"
                    >@{{ item.beReplied[0].user.nickname }}:</span
                  >
                  <span>{{ item.beReplied[0].content }}</span>
                </div>
              </li>
              <li>{{ formatDate(item.time) }}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 分页按钮 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="commentsTotal"
        :page-size="20"
        @next-click="CnextClick"
        @current-change="CcurrentChange"
        @prev-click="CprevClick"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Bus from "assets/js/bus.js";
import "assets/css/pagination.css";

import {
  lyric,
  simiSong,
  hotCommentsReq,
  commentsMusic,
} from "network/songDetail.js";
import { formatDate, getMainColor, getImage } from "common/utils.js";
import Marquee from "components/common/Marquee";

export default {
  name: "SongDetail",
  components: {
    Marquee,
  },
  data() {
    return {
      // 歌曲Id
      songId: "",
      // 歌曲封面
      picUrl: "",
      // 歌名
      name: "",
      // 歌手
      singer: "",
      // 专辑
      album: "",
      isPlay: false,
      // 歌词
      currentMUsicLyric: "",
      // 音频当前时刻
      lyricIndex: "",
      // 歌词高亮行数索引
      highlightIndex: "",
      // 相似歌曲
      simiSong: "",
      // 主题色
      backgroundColor: "",
      // 评论
      textarea: "",
      // 评论综述
      commentsTotal: 0,
      // 热评
      hotComments: "",
      // 全部评论
      comments: "",
      // 组件索引
      componentKey: 0,
    };
  },
  mounted() {
    Bus.$on("songDetailClick", (songId, picUrl, name, singer, album, flag) => {
      this.songId = songId;
      console.log(this.songId);
      this.picUrl = picUrl;
      this.backgroundImage = {
        backgroundImage: "url(" + this.picUrl + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      };
      this.name = name;
      this.singer = singer;
      this.album = album;
      lyric(songId).then((res) => {
        this.lyricFormat(res.lrc.lyric);
      });
      // 获取热门评论
      // hotCommentsReq(songId, 0).then((res) => {
      //   console.log(res);
      //   this.hotComments = res.hotComments;
      //   console.log(this.hotComments);
      // });
      // 获取热门评论
      commentsMusic(songId).then((res) => {
        this.hotComments = res.hotComments;
      });
      // 获取歌曲评论
      commentsMusic(songId, 20, 0).then((res) => {
        this.commentsMusic(songId, 20, 0);
      });
      // 相似歌曲
      simiSong(songId).then((res) => {
        // console.log(res);
        this.simiSong = res.songs;
      });
      // 获取主题色
      getMainColor(this.picUrl).then((res) => {
        // console.log(res[0].color);
        this.backgroundColor = res[0].color;
      });

      // console.log(getImage(this.picUrl));
    });
    // 接收监听暂停与播放状态
    Bus.$on("onplaying", () => {
      this.isPlay = true;
      // console.log("play");
    });
    Bus.$on("onpause", () => {
      // console.log("pause");
      this.isPlay = false;
    });
    // 监听音频当前时刻,并且滚动歌词
    Bus.$on("lyricIndex", (lyricIndex) => {
      this.lyricIndex = lyricIndex + "";
      let i = 0;
      for (let key in this.currentMUsicLyric) {
        if (key == this.lyricIndex) {
          this.highlightIndex = i;
          // console.log(i);
          if (i >= 2) {
            // console.log("yes");
            this.$refs.lyric.scrollTo({
              top: 35 * (i - 2),
              behavior: "smooth",
            });
          }
        }
        i++;
      }
    });
  },
  watch: {},
  methods: {
    lyricFormat(lyric) {
      // 处理歌词，转化成key为时间，value为歌词的对象
      let lyricArr = lyric.split("[").slice(1); // 先以[进行分割
      let lrcObj = {};
      lyricArr.forEach((item) => {
        let arr = item.split("]"); // 再分割右括号
        // 时间换算成秒
        let m = parseInt(arr[0].split(":")[0]);
        let s = parseInt(arr[0].split(":")[1]);
        arr[0] = m * 60 + s;
        if (arr[1] != "\n") {
          // 去除歌词中的换行符
          lrcObj[arr[0]] = arr[1];
        }
      });
      // 存储数据
      this.currentMUsicLyric = lrcObj;
      // console.log(this.currentMUsicLyric);
    },
    // 把时间戳转换为标准时间格式
    formatDate(time) {
      return formatDate(time);
    },
    // 获取歌曲评论
    commentsMusic(songId, val) {
      commentsMusic(songId, 20, (val - 1) * 20).then((res) => {
        // console.log(res);
        this.commentsTotal = res.total;
        // this.hotComments = res.hotComments;
        this.comments = res.comments;
      });
    },
    // 评论下一页
    CnextClick(val) {
      // console.log(val);
      this.commentsMusic(this.songId, val);
      this.componentKey += 1;
    },
    // 评论上一页
    CprevClick(val) {
      this.commentsMusic(this.songId, val);
      this.componentKey += 1;
    },
    // 改变当前评论页
    CcurrentChange(val) {
      this.commentsMusic(this.songId, val);
      this.componentKey += 1;
    },
  },
};
</script>

<style scoped>
.songDetail {
  position: absolute;
  width: 100%;
  height: 90%;
  z-index: 9999;
  overflow: scroll;
  overflow-x: hidden;
  background-color: #fff;
}

.top {
  display: flex;
  justify-content: center;
  height: 100%;
  backdrop-filter: blur(100px);
}

/* .topWrap {
  width: 100%;
  height: 73%;
} */

.left {
  width: 30%;
  position: relative;
  height: 100%;
  /* background-color: green; */
}

.onplaying {
  transform: none !important;
}

.left img:nth-child(1) {
  position: absolute;
  top: 90px;
  left: 50%;
  z-index: 99;
  transform-origin: 0 0;
  transform: rotate(-30deg);
  transition: transform 0.3s linear 0s;
}

.left img:nth-child(2) {
  width: 300px;
  height: 300px;
  margin-top: 170px;
  margin-left: 80px;
  animation: rotate 20s linear infinite;
  animation-play-state: paused;
}

.left img:nth-child(3) {
  position: absolute;
  top: 235px;
  left: 146px;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  animation: rotate 20s linear infinite;
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.imgOnplaying {
  animation-play-state: running !important;
}

.center {
  position: relative;
  width: 30%;
  height: 100%;
  overflow: hidden;
}

.name {
  position: absolute;
  min-width: 100%;
  margin-top: 20%;
  text-align: center;
  font-size: 30px;
  color: rgb(51, 51, 51);
  overflow: hidden;
  white-space: nowrap;
}

.singer {
  height: 4%;
  margin-top: 32%;
  text-align: center;
  color: rgb(148, 150, 144);
}

.lyric {
  position: absolute;
  top: 27%;
  height: 50%;
  min-width: 100%;
  padding: 0;
  overflow: scroll;
  overflow-x: hidden;
}

.lyric::-webkit-scrollbar {
  width: 8px;
}
.lyric::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: rgb(198, 201, 203);
}
.lyric::-webkit-scrollbar-track {
  border-radius: 20px;
}

.lyric li {
  margin: 20px 0;
  font-size: 14px;
  color: rgb(100, 100, 99);
  text-align: center;
  list-style: none;
}

.chosen {
  font-weight: 700;
  font-size: 16px !important;
  color: #000 !important;
}

.right {
  width: 30%;
}

.simiSong {
  position: relative;
  top: 35%;
  width: 300px;
  height: 280px;
  margin: 0 auto 0;
  overflow: scroll;
  overflow-x: hidden;
}

.simiSong::-webkit-scrollbar {
  width: 8px;
}
.simiSong::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: rgb(225, 225, 225);
}
.simiSong::-webkit-scrollbar-track {
  border-radius: 20px;
}

.simiSong ul {
  padding: 10px;
  margin: 0;
}

.simiSong h3 {
  margin: 0 0;
}

.simiSong li {
  margin: 5px 0;
  font-size: 12px;
  list-style: none;
}

.simiSong img {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  line-height: 100%;
  margin-right: 5px;
  vertical-align: middle;
}

.commentsWrap {
  width: 60%;
  margin: 0 auto 0;
  margin-top: 20px;
}

.el-textarea {
  width: 100%;
}

.commentBtn {
  display: block;
  padding: 5px 20px;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 20px;
  margin-top: 10px;
  margin-right: 0;
  background-color: #fff;
}

.commentBtn:hover {
  cursor: pointer;
}

.comments {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(242, 242, 242);
}

.hotComment,
.comments {
  display: flex;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(243, 243, 243);
}

.hotComment li,
.comments li {
  list-style: none;
}

.hotCommentAvatar,
.commentsAvatar {
  width: 3%;
  margin: 10px;
  margin-left: 0;
  margin-top: 0;
}

.hotComment img,
.comments img {
  width: 100%;
  border-radius: 50%;
}

.hotCommentInfo,
.commentsInfo {
  width: 97%;
}

.hotCommentInfo ul,
.commentsInfo ul {
  padding: 0 0;
  margin: 0 0;
}

.hotCommentInfo li,
.commentsInfo li {
  margin: 0 0;
}

.hotCommentInfo li:nth-child(1) span {
  display: inline-block;
  margin-bottom: 3px;
  font-size: 12px;
  color: rgb(80, 125, 175);
  cursor: default;
}

.commentsNickname {
  display: inline-block;
  margin-bottom: 3px;
  color: rgb(80, 125, 175);
}

.hotCommentInfo li:nth-child(1) div,
.commentsInfo li:nth-child(1) div {
  margin-bottom: 6px;
}

.hotCommentInfo li:nth-child(1),
.commentsInfo li:nth-child(1) {
  font-size: 12px;
  word-break: break-all;
  cursor: default;
}

.hotCommentInfo li:nth-child(2),
.commentsInfo li:nth-child(2) {
  font-size: 12px;
  color: rgb(159, 159, 159);
  cursor: default;
}

.newComments {
  margin-top: 50px;
}

.replied {
  padding: 7px;
  background-color: rgb(244, 244, 244);
}

.beRepliedNickname {
  color: rgb(80, 125, 175);
}

.pagination {
  text-align: center;
}
</style>
