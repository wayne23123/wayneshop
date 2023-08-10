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

    // 依照商品 id 修改商品名稱的函式
    const nameEditFunction = () => {
      if (nameEditRef.value == "") {
        ElMessage.warning("姓名不能為空！");
        return;
      } else if (nameEditRef.value == " ") {
        ElMessage.warning("姓名不能為空！");
        return;
      }
      ElMessage({ type: "success", message: "更改姓名成功" });
      userInfo.value.name = nameEditRef.value;
    };

    // 宣告名為 nameEditRef 的 ref 變數，用來儲存欲修改的會員名稱
    const telephoneEditRef = ref("");

    // 依照商品 id 修改商品名稱的函式
    const telephoneEditFunction = () => {
      if (telephoneEditRef.value == "") {
        ElMessage.warning("電話號碼不能為空！");
        return;
      } else if (telephoneEditRef.value == " ") {
        ElMessage.warning("電話號碼不能為空！");
        return;
      } else if (telephoneEditRef.value < 111111111) {
        ElMessage.warning("電話號碼格式錯誤！");
        return;
      } else if (telephoneEditRef.value > 999999999) {
        ElMessage.warning("電話號碼格式錯誤！");
        return;
      }
      ElMessage({ type: "success", message: "更改電話號碼成功" });
      userInfo.value.telephone = telephoneEditRef.value;
    };

    // 宣告名為 nameEditRef 的 ref 變數，用來儲存欲修改的會員名稱
    const emailEditRef = ref("");

    // 依照商品 id 修改商品名稱的函式
    const emailEditFunction = () => {
      if (emailEditRef.value == "") {
        ElMessage.warning("姓名不能為空！");
        return;
      } else if (emailEditRef.value == " ") {
        ElMessage.warning("姓名不能為空！");
        return;
      }
      ElMessage({ type: "success", message: "更改姓名成功" });
      userInfo.value.email = emailEditRef.value;
    };

    // 宣告名為 nameEditRef 的 ref 變數，用來儲存欲修改的會員名稱
    const adressEditRef = ref("");

    // 依照商品 id 修改商品名稱的函式
    const adressEditFunction = () => {
      if (adressEditRef.value == "") {
        ElMessage.warning("姓名不能為空！");
        return;
      } else if (adressEditRef.value == " ") {
        ElMessage.warning("姓名不能為空！");
        return;
      }
      ElMessage({ type: "success", message: "更改姓名成功" });
      userInfo.value.adress = adressEditRef.value;
    };

    // 宣告名為 nameEditRef 的 ref 變數，用來儲存欲修改的會員名稱
    const imgEditRef = ref("");

    // 依照商品 id 修改商品名稱的函式
    const imgEditFunction = () => {
      if (nameEditRef.value == "") {
        ElMessage.warning("姓名不能為空！");
        return;
      } else if (nameEditRef.value == " ") {
        ElMessage.warning("姓名不能為空！");
        return;
      }
      ElMessage({ type: "success", message: "更改姓名成功" });
      userInfo.value.img = imgEditRef.value;
    };

    // 3. 以對象的格式把 state 和 action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,

      nameEditRef,
      nameEditFunction,

      telephoneEditRef,
      telephoneEditFunction,

      adressEditRef,
      adressEditFunction,

      emailEditRef,
      emailEditFunction,

      imgEditRef,
      imgEditFunction,
    };
  },
  {
    persist: true,
  }
);
