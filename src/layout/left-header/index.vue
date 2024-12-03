<template>
  <div class="layout left-head-layout">
    <div class="left"></div>
    <div class="content-warpper">
      <Header />
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Header from "/@/components/header/index.vue";
import Main from "/@/components/main/index.vue";

const getKeepAliveNames = computed(() => {
  return [];
});
</script>

<style lang="scss">
.left-head-layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  .left {
    width: 200px;
    background-color: grey;
  }
  .content-warpper {
    flex: 1;
    display: flex;
    flex-direction: column;
    .head {
      height: 50px;
      background-color: beige;
    }
    .content {
      height: calc(100% - 50px);
    }
  }
}
</style>
