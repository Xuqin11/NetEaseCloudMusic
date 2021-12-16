<template>
  <div class="Login">
    <img :src="avatarUrl" alt="" @click="getFlag()" />
    <span @click="getFlag()">{{ userName }}</span>
    <login-div v-if="isFlag" @flagClick="flagClick()" @closeLoginDiv="closeLoginDiv()" />
    <span class="loginOut" v-if="isLogin" @click="loginOut">退出登录</span>
  </div>
</template>

<script>
import LoginDiv from "./LoginDiv";

import { logout } from "network/login";

import Bus from "@/assets/js/bus.js";

export default {
  name: "Login",
  components: {
    LoginDiv,
  },
  data() {
    return {
      isLogin: Boolean(this.$store.state.isLogin),
      isFlag: false,
      userName: this.$store.state.isLogin === true ? this.$store.state.userProfile.nickname : '未登录',
      avatarUrl: this.$store.state.isLogin === true ? this.$store.state.userProfile.avatarUrl : require("@/assets/img/header/yonghu.png"),
      msg: "",
    };
  },
  created() {
  },
  methods: {
    getFlag() {
      if (this.$store.state.isLogin == false) {
        this.isFlag = true;
      }
    },
    closeLoginDiv() {
      this.isFlag = false
    },
    flagClick() {
      this.isLogin = true;
      this.userName = this.$store.state.userProfile.nickname;
      this.avatarUrl = this.$store.state.userProfile.avatarUrl;
    },
    // 退出登录
    loginOut() {
      logout().then((res) => {
        this.isLogin = false;
        this.userName = "未登录";
        this.avatarUrl = require("@/assets/img/header/yonghu.png");
        this.$store.commit("userProfile", "");
        this.$store.commit("myList", "");
        this.$store.commit("collectList", "");
        this.$store.commit("isLogin", false)
        Bus.$emit("inceptMessage", this.msg);
      });
    },
  },
};
</script>

<style scoped>
.Login {
  float: left;
  margin-left: 500px;
  color: #c0c4cc;
}

.Login:hover {
  cursor: pointer;
}

img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 15px;
  vertical-align: middle;
}

.span {
  vertical-align: middle;
}

.loginOut {
  margin-left: 20px;
}
</style>
