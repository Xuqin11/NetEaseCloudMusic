import Vue from "vue";
import VueRouter from "vue-router";

// 发现音乐
const HomePage = () => import("../views/asider/homePage/HomePage");
const PersonalizedRec = () => import("../views/asider/homePage/homePageTab/personalizedRec/PersonalizedRec");
const Singer = () => import("../views/asider/homePage/homePageTab/singer/Singer");
const SongList = () => import("../views/asider/homePage/homePageTab/songList/SongList");
// 私人FM
const PersonalizedFM = () => import("../views/asider/personalizedFM/PersonalizedFM");
// 视频
const Video = () => import("../views/asider/video/Video");
// 歌单
const CollectList = () => import("views/asider/collectList/CollectList")


Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/homePage",
  },
  {
    path: "/homePage",
    // name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: "",
        redirect: "/homePage/personalizedRec",
      },
      {
        path: "personalizedRec",
        component: PersonalizedRec,
      },
      {
        path: "singer",
        component: Singer,
      },
      {
        path: "songList",
        component: SongList,
      },
    ],
  },
  {
    path: "/video",
    name: "Video",
    component: Video,
  },
  {
    path: "/personalizedFM",
    name: "Personalized",
    component: PersonalizedFM,
  },
  {
    path: "/collectList",
    name: "collectList",
    component: CollectList
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
});


// router.beforeEach((to,from,next)=>{
//   if(to.path ==='/login'){
//     next();
//   }else {
//     let token = localStorage.getItem('token');
//     if(token ===null || token ===''){
//       next('/login');
//     }else {
//       // alert(localStorage.getItem("Authorization"));
//       next();
//     }
//   }
// });
export default router;
