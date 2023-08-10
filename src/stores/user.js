// 管理用戶數據

import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定義管理用戶數據的 state
    const userInfo = ref({
      img: "../src/assets/pictures/avatarDefault.png",
      email: "test@gmail.com",
      name: "test001",
      telphone: "0912345678",
      adress: "測試用地址",
    });
    // 2. 定義獲取接口數據的 action 函數
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    //退出時清除用戶訊息
    const clearUserInfo = () => {
      userInfo.value = {};
    };

    // 宣告名為 nameEditRef 的 ref 變數，用來儲存欲修改的會員名稱
    const nameEditRef = ref("");

    const nameEditDone = ref(false);

    // 依照商品 id 修改商品名稱的函式
    const nameEditFunction = () => {
      if (nameEditRef.value == "") {
        return;
      }
      userInfo.value.name = nameEditRef.value;
      nameEditDone.value = true;
      nameEditRef.value = "";
    };

    // 3. 以對象的格式把 state 和 action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,

      nameEditRef,
      nameEditDone,
      nameEditFunction,
    };
  },
  {
    persist: true,
  }
);
