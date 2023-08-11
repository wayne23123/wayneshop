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

    // 宣告名為 nameEditRef 的 ref 變數，用來儲存欲修改的會員名稱
    const nameEditRef = ref("");

    //
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

    // 宣告名為 telephoneEditRef 的 ref 變數，用來儲存欲修改的電話號碼
    const telephoneEditRef = ref("");

    //
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

    // 宣告名為 emailEditRef 的 ref 變數，用來儲存欲修改的 email
    const emailEditRef = ref("");

    // 此函數檢查 email 格式是否正確
    function checkEmailFormat(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    //
    const emailEditFunction = () => {
      if (emailEditRef.value == "") {
        ElMessage.warning("email 不能為空！");
        return;
      } else if (emailEditRef.value == " ") {
        ElMessage.warning("email 不能為空！");
        return;
      } else if (!checkEmailFormat(emailEditRef.value)) {
        return;
      }
      ElMessage({ type: "success", message: "更改 email 成功" });
      userInfo.value.email = emailEditRef.value;
    };

    // 宣告名為 adressEditRef 的 ref 變數，用來儲存欲修改的地址
    const adressEditRef = ref("");

    //
    const adressEditFunction = () => {
      if (adressEditRef.value == "") {
        ElMessage.warning("地址不能為空！");
        return;
      } else if (adressEditRef.value == " ") {
        ElMessage.warning("地址不能為空！");
        return;
      }
      ElMessage({ type: "success", message: "更改地址成功" });
      userInfo.value.adress = adressEditRef.value;
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
      checkEmailFormat,
    };
  },
  {
    persist: true,
  }
);
