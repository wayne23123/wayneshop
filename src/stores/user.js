// 管理用戶數據

import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定義管理用戶數據的 state
    const userInfo = ref({});
    // 2. 定義獲取接口數據的 action 函數
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    //退出時清除用戶訊息
    const clearUserInfo = () => {
      userInfo.value = {};
    };

    // 3. 以對象的格式把 state 和 action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
