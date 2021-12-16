<template>
  <div class="collectList">
    <CollectListHeader :collect-list="collectList" />
    <div class="listMain">
      <el-row>
        <el-col :span="24">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="min-width: 200px;"
          >
            <el-tab-pane label="歌曲列表" name="first">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                @row-dblclick="rowDblClick"
              >
                <el-table-column prop="index" label="" width="100">
                </el-table-column>
                <el-table-column prop="name" label="音乐标题" width="350">
                </el-table-column>
                <el-table-column prop="singer" label="歌手"> </el-table-column>
                <el-table-column
                  prop="album"
                  label="专辑"
                  width="400"
                ></el-table-column>
                <el-table-column prop="duration" label="时长"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="'评论者(' + commentsTotal + ')'" name="second">
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
              <h4>精彩评论</h4>
              <div class="hotComment">
                <div class="hotCommentAvatar">
                  <img :src="hotCommentAvatar" alt="" />
                </div>
                <div class="hotCommentInfo">
                  <ul>
                    <li>
                      <span>{{ hotCommentsNickname }}:</span>
                      <div>{{ hotCommentContent }}</div>
                    </li>
                    <li>{{ hotCommentsTime }}</li>
                  </ul>
                </div>
              </div>
              <h4>最新评论({{ commentsTotal }})</h4>
              <div :key="componentKey">
                <div
                  class="comments"
                  v-for="(item, index) in comments"
                  :key="index"
                >
                  <div class="commentsAvatar">
                    <img :src="item.user.avatarUrl" alt="" />
                  </div>
                  <div class="commentsInfo">
                    <ul>
                      <li>
                        <span class="commentsNickname"
                          >{{ item.user.nickname }}:</span
                        >
                        <div>{{ item.content }}</div>
                        <div class="replied" v-if="item.beReplied.length != 0">
                          <span class="beRepliedNickname"
                            >@{{ item.beReplied[0].user.nickname }}:</span
                          >
                          <span>{{ item.beReplied[0].content }}</span>
                        </div>
                      </li>
                      <li>{{ time(item.time) }}</li>
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
                :page-size="60"
                @next-click="CnextClick"
                @current-change="CcurrentChange"
                @prev-click="CprevClick"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="收藏者" name="third">
              <div class="subscribers">
                <div
                  v-for="(item, index) in subscribers"
                  :key="index"
                  class="subscribersItem"
                >
                  <img :src="item.avatarUrl" />
                  <div>
                    <div class="subscribersNickname">{{ item.nickname }}</div>
                    <div
                      class="subscribersSignature"
                      v-if="item.signature !== ''"
                    >
                      {{ item.signature }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- 分页按钮 -->
              <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :total="commentsTotal"
                :page-size="60"
                @next-click="SnextClick"
                @current-change="ScurrentChange"
                @prev-click="SprevClick"
              >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Bus from "@/assets/js/bus.js";
import "assets/css/tab.css";
import "assets/css/pagination.css";

import {
  playListDetail,
  songDetail,
  playListComment,
  playlistSubscribers,
  songUrl,
} from "network/songList.js";

import { formDuration, formatDate } from "common/utils.js";

import CollectListHeader from "./childComps/CollectListHeader";

export default {
  name: "CollectList",
  components: {
    CollectListHeader,
  },
  data() {
    return {
      // componentKey_1: 0,
      componentKey: 0,
      componentKey_2: 0,
      // 歌单详情
      collectList: {},
      // 歌曲Id
      trackIds: "",
      // 歌曲数量
      trackCount: "",
      // 播放量
      playCount: "",
      // 歌单简介
      description: "",
      activeName: "first",
      // 表格数据
      tableData: [],
      // 评论总数
      commentsTotal: 0,
      // 评论
      textarea: "",
      // 热评头像
      hotCommentAvatar: "",
      // 热评用户名
      hotCommentsNickname: "",
      // 热评内容
      hotCommentContent: "",
      // 热评时间
      hotCommentsTime: "",
      // 评论
      comments: "",
      // 收藏者
      subscribers: "",
      // 音乐URL
      musicUrl: "",
      // 歌曲详情
      songDetail: "",
    };
  },
  mounted() {
    Bus.$on("collectListId", (collectList) => {
      // console.log(collectList);
      // this.forceRender()
      this.collectList = collectList;
      this.collectListCreateTime = formatDate(
        collectList.createTime,
        "onlyDate"
      );
      this.avatarUrl = this.collectList.creator.avatarUrl;
      this.nickname = collectList.creator.nickname;
      this.tags = collectList.tags;
      this.trackCount = collectList.trackCount;
      this.playCount = collectList.playCount;
      this.description = collectList.description;
      // 请求歌单详情
      playListDetail(collectList.id)
        .then((res_1) => {
          // console.log(res_1);
          this.trackIds = res_1.playlist.trackIds.map((item) => item.id);
          // console.log(this.trackIds);
          // 请求歌曲详情,把trackIds转换为字符串形式
          return songDetail(this.trackIds.join());
        })
        .then((res_2) => {
          // console.log(res_2);
          this.songDetail = res_2.songs;
          // console.log(this.songDetail);
          this.tableData = [];
          res_2.songs.forEach((item, index) => {
            let songInfo = {
              index: index + 1,
              name: item.name,
              singer: item.ar[0].name,
              album: item.al.name,
              duration: formDuration(item.dt),
            };
            this.tableData.push(songInfo);
          });
          // console.log(this.tableData);
        });
      // 请求歌单评论
      playListComment(collectList.id, 60).then((res) => {
        // console.log(res);
        // 热评
        this.commentsTotal = res.total;
        if (res.hotComments.length != 0) {
          this.hotCommentAvatar = res.hotComments[0].user.avatarUrl;
          this.hotCommentsNickname = res.hotComments[0].user.nickname;
          this.hotCommentContent = res.hotComments[0].content;
          this.hotCommentsTime = formatDate(res.hotComments[0].time, "allTime");
        }
        if (res.comments.length != 0) {
          this.comments = res.comments;
        }
      });
      // 请求歌单收藏者
      playlistSubscribers(collectList.id, 60).then((res) => {
        this.subscribers = res.subscribers;
        // console.log(res.subscribers);
      });
    });
  },
  created() {},
  methods: {
    // btnClick() {
    //   console,log('22')
    // },
    time(time) {
      return formatDate(time);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 评论下一页
    CnextClick(val) {
      this.playListComment(val);
      this.componentKey += 1;
    },
    // 评论改变当前页面
    CcurrentChange(val) {
      this.playListComment(val);
      this.componentKey += 1;
    },
    // 评论上一页
    CprevClick(val) {
      this.playListComment(val);
      this.componentKey += 1;
    },
    playListComment(val) {
      playListComment(this.collectList.id, 60, (val - 1) * 60).then((res) => {
        this.comments = res.comments;
      });
    },
    forceRender() {
      // this.componentKey_1 += 1;
    },
    // 收藏者下一页
    SnextClick(val) {
      this.playlistSubscribers(val);
      this.componentKey_2 += 1;
    },
    // 收藏者改变当前页面
    ScurrentChange(val) {
      this.playlistSubscribers(val);
      this.componentKey_2 += 1;
    },
    // 收藏者上一页
    SprevClick(val) {
      this.playlistSubscribers(val);
      this.componentKey_2 += 1;
    },
    // 请求歌单收藏者
    playlistSubscribers(val) {
      playlistSubscribers(this.collectList.id, 60, (val - 1) * 60).then(
        (res) => {
          this.subscribers = res.subscribers;
        }
      );
    },
    // 双击播放音频
    rowDblClick(row, column, event) {
      Bus.$emit("playList", this.tableData);
      Bus.$emit("musicPlay", row, this.songDetail, this.trackIds);
    },
  },
};
</script>

<style scoped>
.listMain {
  width: 100%;
}

.el-table_2_column_5 {
  width: 10% !important;
}

.commentBtn {
  padding: 5px 20px;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 20px;
  margin-top: 10px;
  background-color: #fff;
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

.replied {
  padding: 7px;
  background-color: rgb(244, 244, 244);
}

.beRepliedNickname {
  color: rgb(80, 125, 175);
}

.subscribers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.subscribersItem {
  display: flex;
  flex-grow: 1;
  width: 25%;
  height: 110px;
  margin-right: 10px;
  margin-bottom: 20px;
}

.subscribersItem img {
  border-radius: 50%;
  margin-right: 10px;
}

.subscribersItem div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.subscribersNickname {
  font-size: 14px;
}

.subscribersSignature {
  margin-top: -20px;
  font-size: 12px;
}

.pagination {
  position: relative;
  left: 40%;
}
</style>
