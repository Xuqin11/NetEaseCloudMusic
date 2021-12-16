<template>
  <div class="marquee" ref="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Marquee",
  data() {
    return {
      outWidth: null,
      inWidth: null,
      // 需要移动的距离
      position: null,
      // 当前移动的距离
      nowPosition: null,
      // 当前的marginLeft的值
      nowMarginLeft: 0,
      // 定时器
      time: null,
      // 是否移到最左边的标志
      leftFlag: false,
    };
  },
  mounted() {
    this.outWidth = this.$refs.content.clientWidth;
    this.inWidth = this.$refs.content.children[0].clientWidth;
    if (this.inWidth > this.outWidth) {
      this.position = this.inWidth - this.outWidth;
      this.nowPosition = this.inWidth - this.outWidth;
      this.$refs.content.children[0].style.marginLeft = 0;
      this.time = setInterval(() => {
        this.moveLeft();
      }, 20);
    }
  },
  watch: {
    leftFlag() {
      if (this.leftFlag == true) {
        this.time = setInterval(() => {
          this.moveRight();
        }, 20);
      } else {
        this.time = setInterval(() => {
          this.moveLeft();
        }, 20);
      }
    },
  },
  methods: {
    // 向左移动
    moveLeft() {
      this.nowMarginLeft++;
      this.nowPosition--;
      // console.log(this.nowPosition);
      this.$refs.content.children[0].style.marginLeft =
        -this.nowMarginLeft + "px";
      // console.log(this.$refs.content.children[0].style.marginLeft);
      if (this.nowPosition <= 0) {
        clearInterval(this.time);
        // this.rightFlag = false;
        this.leftFlag = true;
        // console.log(this.leftFlag);
      }
    },
    // 向右移动
    moveRight() {
      this.nowMarginLeft--;
      // console.log(this.nowMarginLeft);
      this.nowPosition++;
      this.$refs.content.children[0].style.marginLeft =
        -this.nowMarginLeft + "px";
      if (this.nowPosition >= this.position) {
        clearInterval(this.time);
        this.leftFlag = false;
        // this.rightFlag = true;
      }
    },
  },
};
</script>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
}
</style>
