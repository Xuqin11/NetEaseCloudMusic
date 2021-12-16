<template>
  <div class="search" id="search">
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="input"
      class="selfInput"
    >
    </el-input>
  </div>
</template>

<script>
import 'assets/css/my_input.css'

export default {
  name: "Search",
  data() {
    return {
      input: '',
    }
  }
};
</script>

<style  scoped>
.el-input__inner {
  border-radius: 20px;
}

.el-input {
  float: left;
  width: 200px;
  margin-left: 200px;
  /* border-radius: 100px; */
}
</style>

