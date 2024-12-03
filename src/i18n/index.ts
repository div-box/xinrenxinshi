import { createI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import pinia from "/@/stores/index";
import { useAppStore } from "/@/stores/appStore";
import enLocale from "element-plus/dist/locale/en.mjs";
import zhcnLocale from "element-plus/dist/locale/zh-cn.mjs";
import zhtwLocale from "element-plus/dist/locale/zh-tw.mjs";
// import langData from "/@/i18n/lang";
// 定义变量内容
const messages: any = {};
const element = { en: enLocale, "zh-cn": zhcnLocale, "zh-tw": zhtwLocale };
const itemize = { en: [], "zh-cn": [], "zh-tw": [] };
const stores = useAppStore(pinia);
const { globalConfig } = storeToRefs(stores);

// 处理最终格式
type lang = keyof typeof itemize;
Object.keys(itemize).map((key: string) => {
  messages[<lang>key] = {
    // ...langData[<lang>key],
    name: key,
    el: element[<lang>key].el,
  };
});

// 导出语言国际化
// https://vue-i18n.intlify.dev/guide/essentials/fallback.html#explicit-fallback-with-one-locale
export const i18n = createI18n({
  legacy: false,
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
  fallbackWarn: false,
  locale: globalConfig.value.locale,
  fallbackLocale: zhcnLocale.name,
  messages,
});

watch(
  () => globalConfig.value.locale,
  (l) => {
    i18n.global.locale.value = l;
  }
);

/* @ts-ignore */
export const t = i18n.global.t;
