import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import moment from "moment";
const DESIGN_DRAFT_WIDTH = 1920; //设计稿宽度
const CurrTime = moment().format("YYYY-MM");
/**
 * APP相关全局设置
 */
export const useWorkDateStore = defineStore("workDateStore", () => {
  const workDate = useLocalStorage<any>(
    `${__HC_NAME__}:workDate`,
    {
      [`${CurrTime}`]: {},
    },
    //需要添加此参数，方便后续更新数据，详情 https://www.vueusejs.com/core/useStorage/#merge-defaults
    { mergeDefaults: true }
  );
  const setWorkDate = (data: Partial<any>) => {
    workDate.value = {
      ...workDate.value,
      ...data,
    };
  };


  return { workDate, setWorkDate, DESIGN_DRAFT_WIDTH };
});
