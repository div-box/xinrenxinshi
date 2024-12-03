<template>
  <component :is="layouts[globalConfig.layout]" />
</template>

<script setup lang="ts" name="layout">
import { useAppStore } from "../stores/appStore";
import { storeToRefs } from "pinia";

// 引入组件
const layouts: any = {
  headBottom: defineAsyncComponent(() => import("/@/layout/head-bottom/index.vue")),
  leftHeader: defineAsyncComponent(() => import("/@/layout/left-header/index.vue")),
  headerLeftTree: defineAsyncComponent(() => import("/@/layout/header-left-tree/index.vue")),
};
const store = useAppStore();
const { globalConfig } = storeToRefs(store);

// 窗口大小改变时
const onLayoutResize = () => {
  // if (!Local.get('oldLayout')) Local.set('oldLayout', 'defaults')
  // const clientWidth = document.body.clientWidth
  // mittBus.emit('layoutMobileResize', {
  //   layout: 'defaults',
  //   clientWidth
  // })
};

// 页面加载前
onBeforeMount(() => {
  onLayoutResize();
  window.addEventListener("resize", onLayoutResize);
});

// 页面卸载时
onUnmounted(() => {
  window.removeEventListener("resize", onLayoutResize);
});
</script>

<style lang="scss"></style>
