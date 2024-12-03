<template>
  <header class="header">
    <div class="left">
      <img src="/@/assets/img/homeLogo.png" alt="" />
    </div>

    <div class="right">
      <el-icon id="fullScreen" @click="fullScreen" style="cursor: pointer"><FullScreen /></el-icon>
      <div class="date-time">
        <span class="date">{{ date }}</span>
        <span class="time">{{ time }}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { FullScreen } from "@element-plus/icons-vue";
const time = ref(hcDayjs().format("HH:mm:ss"));
const date = ref(hcDayjs().format("YYYY-MM-DD"));
const route = useRoute();
let timer: any = null;
const fullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
onMounted(() => {
  timer = setInterval(() => {
    date.value = hcDayjs().format("YYYY-MM-DD");
    time.value = hcDayjs().format("HH:mm:ss");
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
<style lang="scss" scoped>
.header {
  padding: 0 20px;
  box-sizing: border-box;
  height: var(--hc-header-height);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: linear-gradient(to right, #266751, #3a8a6d, #266751);
  background: var(--hc-base-color);
  color: #fff;
  font-size: 24px;

  .left {
    height: var(--hc-header-height);
    img {
      height: var(--hc-header-height);
    }
  }

  .right {
    height: var(--hc-header-height);
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .date-time {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      margin-left: 10px;
    }
  }
}
</style>
: number | null | undefined(: any)
