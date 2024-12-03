import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const themeEnum = {
  dark: {},
  light: {},
};

interface IglobalConfig {
  locale: "zh-cn" | "en" | "zh-tw";
  layout: string;
  componentSize: "large" | "default" | "small";
  theme: keyof typeof themeEnum;
  path: string | undefined;
  options: {
    signin: string;
    signout: string;
    targetTime: number;
  };
}

const DESIGN_DRAFT_WIDTH = 1920; //设计稿宽度

/**
 * APP相关全局设置
 */
export const useAppStore = defineStore("appStore", () => {
  const globalConfig = useLocalStorage<IglobalConfig>(
    `${__HC_NAME__}:globalConfig`,
    {
      locale: "zh-cn",
      layout: "headBottom",
      componentSize: "default",
      theme: "light",
      path: "/deviceList",
      options: {
        signin: "",
        signout: "",
        targetTime: 9,
      },
    },
    //需要添加此参数，方便后续更新数据，详情 https://www.vueusejs.com/core/useStorage/#merge-defaults
    { mergeDefaults: true }
  );
  const setGlobalConfig = (data: Partial<IglobalConfig>) => {
    globalConfig.value = {
      ...globalConfig.value,
      ...data,
    };
  };

  watch(
    () => globalConfig.value.theme,
    (theme: keyof typeof themeEnum) => {
      const html = document.getElementsByTagName("html")[0];
      html.setAttribute("data-theme", theme);
      html.setAttribute("class", theme);
    }
  );

  return { globalConfig, setGlobalConfig, DESIGN_DRAFT_WIDTH };
});
