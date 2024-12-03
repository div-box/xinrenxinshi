import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const defaultUserInfo = {
  name: "",
  token: "",
};
type IUserInfo = typeof defaultUserInfo;

export const useUserStore = defineStore("userStore", () => {
  const userInfo = useLocalStorage(`${__HC_NAME__}:userInfo`, {});
  const setUserInfo = (data: Partial<IUserInfo>) => {
    userInfo.value = {
      ...userInfo.value,
      ...data,
    };
  };

  return { userInfo, setUserInfo };
});
