<template>
  <div class="LoginDiv">
    <div class="LoginDivTop">
      <span @click="closeLoginDiv">X</span>
    </div>
    <div class="inputMsg">
      <el-input
        v-model="phone"
        placeholder="请输入手机号码"
        class="phone"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
        class="password"
      ></el-input>
    </div>
    <el-button @click="submit()">登录</el-button>
  </div>
</template>

<script>
import { login, userPlayList } from "network/login.js";

import "assets/css/my_input.css";

import Bus from "@/assets/js/bus.js";

export default {
  name: "LoginDiv",
  data() {
    return {
      phone: "",
      password: "",
      uid: "",
    };
  },
  methods: {
    // 登录
    // 登录提交按钮
    submit() {
      login(this.phone, this.password).then((res_1) => {
        this.$store.commit("userProfile", res_1);
        this.$store.commit("isLogin", true);
        this.uid = this.$store.state.userProfile.userId;
        this.submitClick();
        return userPlayList(this.uid)
      }).then((res_2) => {
        // 我添加的歌单
          let myList = res_2.playlist.filter((item) => {
            return item.subscribed === false;
          });
          // 我收藏的歌单
          let collectList = res_2.playlist.filter((item) => {
            return item.subscribed === true;
          });
          this.$store.commit("myList", myList);
          this.$store.commit("collectList", collectList);
          Bus.$emit("inceptMessage", this.msg);
      })
    },
    // 登录成功后登录窗口关闭
    submitClick() {
      this.$emit("flagClick");
    },
    closeLoginDiv() {
      this.$emit("closeLoginDiv");
    },
  },
};
</script>

<style scoped>
.LoginDiv {
  position: absolute;
  width: 300px;
  height: 400px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  margin: auto;
  border: 1px solid gray;
  z-index: 99;
  background-color: #fff;
  cursor: default;
}

.LoginDivTop {
  height: 10px;
  padding: 10px;
  line-height: 10px;
  text-align: right;
  color: #000;
}

.LoginDivTop span {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

.inputMsg {
  margin-top: 50px;
  background-color: #fff;
}

.inputMsg input {
  background-color: #fff !important;
}
</style>
