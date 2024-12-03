import { useAppStore } from "/@/stores/appStore";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
const store = useAppStore();
const { globalConfig } = storeToRefs(store);
dayjs.locale(globalConfig.value.locale);
export const hcDayjs = dayjs;
