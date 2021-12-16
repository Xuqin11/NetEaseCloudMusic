import Vue from "vue";
import Vuex from "vuex";

// 1. 安装插件
Vue.use(Vuex);

// 2. 创建store对象
const store = new Vuex.Store({
  state: {
    userProfile: window.sessionStorage.getItem("userProfile")
      ? JSON.parse(window.sessionStorage.getItem("userProfile"))
      : "",
    myList: window.sessionStorage.getItem("myList")
      ? JSON.parse(window.sessionStorage.getItem("myList"))
      : "",
    collectList: window.sessionStorage.getItem("collectList")
      ? JSON.parse(window.sessionStorage.getItem("collectList"))
      : "",
    isLogin: window.sessionStorage.getItem("isLogin")
      ? JSON.parse(window.sessionStorage.getItem("isLogin"))
      : false,
  },
  mutations: {
    userProfile(state, payload) {
      if (payload != "") {
        state.userProfile = payload.profile;
        window.sessionStorage.setItem(
          "userProfile",
          JSON.stringify(payload.profile)
        );
      } else {
        state.userProfile = "";
        window.sessionStorage.removeItem("userProfile");
      }
    },
    myList(state, payload) {
      if (payload != "") {
        // 登录
        state.myList = payload;
        window.sessionStorage.setItem("myList", JSON.stringify(payload));
        console.log(payload);
      } else {
        // 退出登录
        state.myList = "";
        window.sessionStorage.removeItem("myList");
      }
    },
    collectList(state, payload) {
      if (payload != "") {
        state.collectList = payload;
        window.sessionStorage.setItem("collectList", JSON.stringify(payload));
        console.log(payload);
      } else {
        state.collectList = "";
        window.sessionStorage.removeItem("collectList");
      }
    },
    isLogin(state, payload) {
      state.isLogin = payload;
      console.log(Boolean(payload));
      window.sessionStorage.setItem("isLogin", Boolean(payload));
    },
  },
  actions: {},
  getters: {},
});

// 3. 挂载Vue实例
export default store;
