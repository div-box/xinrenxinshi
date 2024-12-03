<template>
  <div class="layout head-bottom-layout">
    <Header />
    <Main />
  </div>
</template>

<script setup lang="ts">
import Header from "/@/components/header/index.vue";
import Main from "/@/components/main/index.vue";
</script>

<style lang="scss" scoped>
.head-bottom-layout {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .head {
    height: 50px;
    background-color: cornsilk;
  }
  .content {
    height: calc(100% - 50px);
    overflow: auto;
  }
}
</style>
