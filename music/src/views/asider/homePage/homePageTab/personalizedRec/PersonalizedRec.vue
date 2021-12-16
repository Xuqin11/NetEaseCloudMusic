<template>
  <div class="personalizedRec">
    <!-- <Tab/> -->
    <Banner/>
    <Personalized/>
    <Privatecontent/>
    <!-- <NewSong/> -->
    <PersonalizedMv/>
  </div>
</template>

<script>
// import "assets/css/asider.css";

import Tab from './childComps/Tab'
import Banner from './childComps/Banner'
import Personalized from './childComps/Personalized'
import Privatecontent from './childComps/Privatecontent'
import NewSong from './childComps/NewSong'
import PersonalizedMv from './childComps/PersonalizedMv'

export default {
  name: "PersonalizedRec",
  components: {
    Tab,
    Banner,
    Personalized,
    Privatecontent,
    NewSong,
    PersonalizedMv
  },
  data() {
    return {
     
    };
  },
};
</script>

<style scoped>
.personalizedRec .el-menu-item {
  margin: 3px 6px;
  border-radius: 3px;
}

.el-menu-item, .el-submenu__title {
  height: 47px;
  line-height: 47px;
}
</style>
