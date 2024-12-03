<template>
  <div class="layout header-left-tree-layout">
    <Header />
    <div class="content-warpper">
      <div class="left"></div>
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
.header-left-tree-layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .header {
    height: 50px;
    background-color: beige;
  }

  .content-warpper {
    flex: 1;
    display: flex;
    height: calc(100% - 50px);

    .left {
      width: 200px;
      background-color: grey;
    }
    .content {
      flex: 1;
    }
  }
}
</style>
