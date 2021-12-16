<template>
  <div class="footer">
    <audio
      class="audio"
      :src="musicUrl"
      autoplay
      ref="audio"
      @ended="ended"
      @canplay="getDuration"
      @timeupdate="updateTime"
      @playing="onplaying"
      @pause="onpause"
    ></audio>
    <div class="left">
      <img
        :src="picUrl"
        alt=""
        v-if="songDetail"
        @click="songDetailClick('block')"
      />
      <div class="songDetail">
        <div>{{ name }}</div>
        <div>{{ singer }}</div>
      </div>
    </div>
    <div class="center">
      <div class="control">
        <div>
          <svg
            class="icon"
            aria-hidden="true"
            v-if="order == 'sequence'"
            @click="orderClick"
          >
            <use xlink:href="#icon-shunxubofang"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            v-if="order == 'random'"
            @click="orderClick"
          >
            <use xlink:href="#icon-suijibofang"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            v-if="order == 'round'"
            @click="orderClick"
          >
            <use xlink:href="#icon-danquxunhuan"></use>
          </svg>
        </div>
        <div>
          <svg class="icon" aria-hidden="true" @click="back">
            <use xlink:href="#icon-skip--back--filled"></use>
          </svg>
        </div>
        <div @click="pauseSong" v-show="isPlaying">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pause--filled"></use>
          </svg>
        </div>
        <div @click="pauseSong" v-show="!isPlaying">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play--filled--alt"></use>
          </svg>
        </div>
        <div>
          <svg class="icon" aria-hidden="true" @click="forward">
            <use xlink:href="#icon-skip--forward--filled"></use>
          </svg>
        </div>
        <div>
          词
        </div>
      </div>
      <div class="sliderDiv">
        <div class="currentTime" v-if="currentTime">
          {{ formatSeconds(currentTime) }}
        </div>
        <div class="currentTime" v-else>00:00</div>
        <el-slider
          class="slider"
          v-model="process"
          :show-tooltip="false"
          @change="change"
        ></el-slider>
        <div class="duration" v-if="duration">
          {{ formatSeconds(duration) }}
        </div>
        <div class="duration" v-else>00:00</div>
      </div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true" @click="mute">
        <use xlink:href="#icon-yinliang"></use>
      </svg>
      <div class="volume">
        <el-slider
          v-model="volume"
          :show-tooltip="false"
          @input="changeVolume"
        ></el-slider>
      </div>
      <svg class="icon" aria-hidden="true" @click="playingList">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import Bus from "@/assets/js/bus.js";
import { formDuration, formatSeconds } from "common/utils.js";
import { songUrl, songDetail } from "network/songList.js";

import "assets/css/slider.css";

export default {
  name: "Footer",
  data() {
    return {
      // 音频地址
      musicUrl: "",
      // 歌单音频地址
      trackIds: "",
      // 歌单中歌曲索引
      songIndex: null,
      // 进度条
      process: 0,
      // 标记歌曲是否播放
      isPlaying: false,
      // 歌曲时长
      duration: "",
      // 当前时间
      currentTime: "",
      // 歌曲id
      songId: "",
      // 歌曲详情
      songDetail: "",
      // 歌曲封面
      picUrl: "",
      // 歌曲名字
      name: "",
      // 歌手
      singer: "",
      // 专辑
      album: "",
      // 音量
      volume: 100,
      // 当前音量
      currentVolume: "",
      // 播放顺序
      order: "sequence",
      // 歌单信息
      tableData: "",
    };
  },
  created() {},
  mounted() {
    // 点击进度条改变当前播放位置
    let runway = document.querySelector(".el-slider__runway");
    runway.onclick = () => {
      this.$refs.audio.currentTime = (this.process / 100) * this.duration;
      if (this.isPlaying == false) {
        this.pauseSong();
      }
    };
    // 双击歌单歌曲列表播放歌曲
    Bus.$on("musicPlay", (row, songDetail, trackIds) => {
      this.songIndex = row.index - 1;
      console.log(this.songIndex);
      this.songDetail = songDetail;
      this.trackIds = trackIds;
      this.isPlaying = true;
      this.picUrl = this.songDetail[row.index - 1].al.picUrl;
      console.log(this.picUrl);
      this.name = this.songDetail[row.index - 1].name;
      this.singer = this.songDetail[row.index - 1].ar[0].name;
      this.album = this.tableData[this.songIndex].album;
      this.musicUrl =
        "https://music.163.com/song/media/outer/url?id=" +
        this.trackIds[this.songIndex] +
        ".mp3";
      this.songId = this.trackIds[this.songIndex];
    });
    // 点击其他地方进行歌曲播放
    Bus.$on("musicPlay_2", (songId) => {
      // this.songId = songId
      songDetail(songId).then((res) => {
        this.songId = songId;
        this.songDetail = res;
        this.name = res.songs[0].name;
        this.picUrl = res.songs[0].al.picUrl;
        console.log(this.picUrl);
        this.singer = res.songs[0].ar[0].name;
        this.album = res.songs[0].al.name;
        console.log(res);
      });
      // console.log("https://music.163.com/song/media/outer/url?id=" + songId + ".mp3");
      this.isPlaying = true;
      this.musicUrl =
        "https://music.163.com/song/media/outer/url?id=" + songId + ".mp3";
    });
    Bus.$on("playList", (tableData) => {
      this.tableData = tableData;
      // this.album = this.tableData[this.songIndex].album;
      // console.log(tableData);
      // console.log(this.songIndex);
      // this.album = tableData[this.songIndex].album
      // console.log(this.album);
    });
  },
  methods: {
    ended() {
      if (this.order == "sequence" || this.order == "random") {
        this.forward();
      } else {
        // 如果是循环播放则音频播放结束后重新加载音频
        this.$refs.audio.load();
      }
    },
    // 暂停与播放
    pauseSong() {
      if (this.isPlaying) {
        this.isPlaying = false;
        this.$refs.audio.pause();
      } else {
        this.isPlaying = true;
        this.$refs.audio.play();
      }
    },
    // 格式化时间
    formatSeconds(time) {
      return formatSeconds(time);
    },
    // 获取音频当前时间
    updateTime(e) {
      this.currentTime = e.srcElement.currentTime;
      // console.log(this.currentTime);
      Bus.$emit("lyricIndex", parseInt(this.currentTime));
      this.process = (this.currentTime / this.duration) * 100;
    },
    // 获取音频长度
    getDuration() {
      this.duration = this.$refs.audio.duration;
    },
    // 拖动进度条改变当前播放位置
    change(event) {
      this.process = event;
      this.currentTime = (this.process / 100) * this.duration;
    },
    // 音量调节窗口
    volumeDiv() {
      this.isVolume = true;
    },
    // 调整音频音量
    changeVolume(event) {
      // console.log(event);
      this.$refs.audio.volume = event / 100;
    },
    // 静音
    mute() {
      if (this.volume != 0) {
        this.currentVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.currentVolume;
      }
    },
    // 下一首歌曲
    forward(flag) {
      if (this.order == "sequence" || this.order == "round") {
        if (this.songIndex >= 0 && this.songIndex < this.trackIds.length - 1) {
          this.songIndex++;
        } else {
          this.songIndex = 0;
        }
      }
      if (this.order == "random") {
        this.songIndex = Math.floor(Math.random() * this.trackIds.length);
      }
      this.musicUrl =
        "https://music.163.com/song/media/outer/url?id=" +
        this.trackIds[this.songIndex] +
        ".mp3";
      this.songId = this.trackIds[this.songIndex];
      this.picUrl = this.songDetail[this.songIndex].al.picUrl;
      this.name = this.songDetail[this.songIndex].name;
      this.singer = this.songDetail[this.songIndex].ar[0].name;
      this.songDetailClick("cut");
      this.isPlaying = true;
    },
    // 上一首歌曲
    back() {
      if (this.order == "sequence") {
        if (this.songIndex > 0 && this.songIndex < this.trackIds.length) {
          this.songIndex--;
        } else {
          this.songIndex = this.trackIds.length - 1;
        }
      }
      if (this.order == "random") {
        this.songIndex = Math.floor(Math.random() * this.trackIds.length);
      }
      if (this.order == "round") {
      }
      this.musicUrl =
        "https://music.163.com/song/media/outer/url?id=" +
        this.trackIds[this.songIndex] +
        ".mp3";
      this.songId = this.trackIds[this.songIndex];
      this.picUrl = this.songDetail[this.songIndex].al.picUrl;
      this.name = this.songDetail[this.songIndex].name;
      this.singer = this.songDetail[this.songIndex].ar[0].name;
      this.songDetailClick("cut");
      this.isPlaying = true;
    },
    // 切换播放顺序
    orderClick() {
      if (this.order == "sequence") {
        this.order = "random";
      } else if (this.order == "random") {
        this.order = "round";
      } else {
        this.order = "sequence";
      }
    },
    // 播放列表的显示与隐藏
    playingList() {
      Bus.$emit("playingList");
    },
    // 歌词页面的显示与隐藏
    songDetailClick(flag) {
      Bus.$emit(
        "songDetailClick",
        this.songId,
        this.picUrl,
        this.name,
        this.singer,
        this.album,
        flag
      );
    },
    // 监听音频播放
    onplaying() {
      Bus.$emit("onplaying");
    },
    // 监听音频暂停播放
    onpause() {
      Bus.$emit("onpause");
    },
  },
};
</script>

<style scoped>
audio {
  display: none;
}

.footer {
  display: flex;
  height: 100%;
}

.left {
  display: flex;
  width: 32%;
  background-color: #fff;
}

.left img {
  margin: 10px;
  border: 1px solid rgb(242, 242, 242);
  border-radius: 5px;
  cursor: pointer;
}

.songDetail {
  display: flex;
  flex-direction: column;
}

.songDetail div {
  height: 22%;
  text-align: left;
  color: rgb(55, 55, 55);
}

.songDetail div:nth-child(2) {
  font-size: 12px;
}

.center {
  flex-grow: 0.4;
  padding: 0 10px 0 10px;
  background-color: #fff;
}

.control {
  display: flex;
  height: 50%;
  padding: 0, 0;
  margin-top: 10px;
  margin-bottom: -10px;
  align-items: center;
  justify-content: center;
}

.control div {
  width: 30px;
  height: 30px;
  margin: 0 20px 0;
  line-height: 30px;
  border-radius: 50%;
}

.control div:nth-child(1):hover,
.control div:nth-child(2):hover,
.control div:nth-child(5):hover,
.control div:nth-child(6):hover {
  color: rgb(239, 103, 103);
}

.control div:hover {
  cursor: pointer;
}

.control div:nth-child(3),
.control div:nth-child(4) {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: rgb(244, 244, 244);
}

.control div:nth-child(3):hover,
.control div:nth-child(4):hover {
  background-color: rgb(229, 229, 229);
}

.control svg {
  font-size: 20px;
}

.sliderDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -18px;
}

.slider {
  margin: 0 15px 0;
}

.currentTime,
.duration {
  font-size: 12px;
  color: rgb(159, 159, 159);
}

.right {
  display: flex;
  flex-grow: 0.6;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  font-size: 20px;
  background-color: #fff;
}

.right svg {
  margin: 0 10px;
  cursor: pointer;
}
</style>
