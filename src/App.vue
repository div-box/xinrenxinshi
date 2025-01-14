<template>
  <el-config-provider :size="globalConfig.componentSize" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script lang="ts" setup name="app">
import { useAppStore } from "/@/stores/appStore";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const store = useAppStore();
const { globalConfig } = storeToRefs(store);
</script>

<style lang="scss"></style>
