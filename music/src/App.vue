<template>
  <div id="app">
    <container>

    </container>
  </div>
</template>

<script>
import Container from "components/content/Container";
// Vue.forceUpdate();
export default {
  name: "app",
  components: {
    Container,
  },
  created() {
    if (this.$router.path !== "/homePage") {
      this.$router.push("/homePage");
    }
  },
};
</script>

<style>
@import "assets/css/normalize.css";
</style>
