<template>
  <div class="header">
    <Logo />
    <Search />
    <Login :key="componentKey"/>
    <Message />
  </div>
</template>

<script>
import Logo from "components/content/header/Logo";
import Search from "components/content/header/Search";
import Login from "components/content/header/Login";
import Message from "components/content/header/Message";

import Bus from '@/assets/js/bus.js'

export default {
  name: "Header",
  components: {
    Logo,
    Search,
    Login,
    Message
  },
  data() {
    return {
      componentKey: 0
    }
  },
  created() {
    Bus.$on("inceptMessage", (msg) => {
      this.forceRender()
    });
  },
  methods: {
    forceRender() {
      this.componentKey += 1
    }
  },
};
</script>

<style scoped></style>
