<template>
  <el-config-provider :size="globalConfig.componentSize" :locale="elLocale">
    <RouterView />
  </el-config-provider>
</template>

<script lang="ts" setup name="app">
import { useAppStore } from "/@/stores/appStore";
const store = useAppStore();
const { globalConfig } = storeToRefs(store);
let resizeTimer = 0;

const elLocale = computed(() => {
  return i18n.global.messages.value[globalConfig.value.locale];
});

const resizeWeb = () => {
  if (resizeTimer) {
    return clearTimeout(resizeTimer);
  }
  const _func = () => {
    const html = document.documentElement;
    const rootFontSize = 14;
    const wW = window.innerWidth;
    const whdef = wW / store.DESIGN_DRAFT_WIDTH; //计算比值
    const rem = whdef * rootFontSize;
    html.style.fontSize = rem + "px";
  };
  resizeTimer = window.setTimeout(_func, 300);
};

onBeforeMount(() => {
  // resizeWeb();
  // window.addEventListener("resize", resizeWeb);
});

onBeforeUnmount(() => {
  // window.removeEventListener("resize", resizeWeb);
});
</script>

<style lang="scss"></style>
