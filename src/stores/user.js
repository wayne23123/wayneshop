// 管理用戶數據

import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定義管理用戶數據的 state
    const userInfo = ref({
      name: "test001",
      telephone: "0912345678",
      adress: "測試用地址",
      email: "test@gmail.com",
      img: "../src/assets/pictures/avatarDefault.png",
      token: "",
    });
    // 2. 定義獲取接口數據的 action 函數
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value.token = res.result.token;
      // userInfo.value.name = "test001";
      // userInfo.value.telephone = "0912345678";
      // userInfo.value.adress = "測試用地址";
      // userInfo.value.email = "test@gmail.com";
    };

    //退出時清除用戶 token
    const clearUserInfo = () => {
      userInfo.value.token = "";
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
