<template>
  <div>
    <HomePageTab />
    <!-- <PersonalizedRec/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import HomePageTab from "./homePageTab/HomePageTab";
import PersonalizedRec from "./homePageTab/personalizedRec/PersonalizedRec";

export default {
  name: "homePage",
  components: {
    PersonalizedRec,
    HomePageTab,
  },
  created() {
    
  },
};
</script>

<style scoped></style>
