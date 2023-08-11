<script setup>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import { loginAPI } from "../apis/user";
import { useRouter } from "vue-router";

import { useUserStore } from "../stores/user";

const userStore = useUserStore();

// https://element-plus.org/zh-CN/component/form.html
// 表單較驗 (帳號名 + 密碼)
// 1.準備表單
const form = ref({
  account: "",
  password: "",
  agree: true,
});

// 2.準備規則
const rules = {
  account: [{ required: true, message: "帳戶不能空白", trigger: "blur" }],
  password: [
    { required: true, message: "密碼不能空白", trigger: "blur" },
    { min: 6, max: 14, message: "密碼長度為6-14字符", trigger: "blur" },
  ],
  agree: [
    // 自定義校驗規則
    {
      validator: (rule, value, callback) => {
        // console.log(value);
        // rule代表當前用的規則
        // value當前用戶輸入的規則
        // callback較驗處理函數, 較驗通過或不通過都要調用
        // 自定義校驗邏輯:
        // 勾選就通過,不勾選不通過
        if (value) {
          callback();
        } else {
          callback(new Error("請勾選協議!"));
        }
      },
    },
  ],
};

// 3. 獲取form實例做統一較驗
const formRef = ref(null);

const router = useRouter();
const doLogin = () => {
  // 有3個值, 只要2個, 先解構復職
  const { account, password } = form.value;
  // 調用實例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表單都通過較驗 才為true
    // console.log(valid);
    // 以valid作為判斷條件, 如果通過較驗才執行登陸邏輯

    if (valid) {
      // TODO LOGIN
      // const res = await loginAPI({ account, password });
      // 改造
      await userStore.getUserInfo({ account, password });
      // console.log(res);
      // await userStore.getUserInfo({ account, password });
      // 1. 提示用戶
      ElMessage({ type: "success", message: "登陸成功" });

      // 2. 跳轉首頁
      router.replace({ path: "/" });

      localStorage.setItem("token", "1");
    }
  });
};
</script>

<template>
  <section class="sectionLogin">
    <div class="formLayout">
      <div class="logo">
        <router-link to="/" class="none"
          ><div class="svg">
            <img src="../assets/svgs/wss.svg" /></div
        ></router-link>
      </div>
      <br />
      <br />
      <div class="bread">
        <div>
          <span> <router-link to="/" class="none"> 首頁 ➣ </router-link></span>
          <span> 會員登入</span>
        </div>
      </div>
      <div class="disCen">
        <div class="formCard">
          <br />
          <div class="disCen">帳戶登入</div>
          <br />
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="right"
            label-width="60px"
            status-icon
          >
            <el-form-item prop="account" label="帳號">
              <el-input v-model="form.account" />
            </el-form-item>
            <el-form-item prop="password" label="密碼">
              <el-input v-model="form.password" />
            </el-form-item>
            <el-form-item prop="agree" label-width="22px">
              <el-checkbox size="large" v-model="form.agree">
                我已同意隱私條款和服務條款
              </el-checkbox>
            </el-form-item>
            <el-button size="large" class="subBtn" @click="doLogin"
              >點擊登陸</el-button
            >
          </el-form>
          <br />
          <br />
        </div>
        <br />
      </div>
    </div>

    <br />
    <br />
    <div>
      <div>測試帳號 xiaotuxian001</div>
      <div>測試密碼 123456</div>
    </div>
    <Footer />
  </section>
</template>

<style scoped>
.bread {
  background-color: #daa520;
  color: black;
  padding-left: 20px;
}
.none:hover {
  color: green;
}
section {
  background-color: #daa520;
  color: rgb(46, 46, 46);
}

.logo {
  background-color: #c4c4c4;
}

.disCen {
  display: flex;
  justify-content: center;
}

.formCard {
  width: 350px;
  background-color: #c4c4c4;
  padding: 0 20px 0 20px;
  /* width: 250px; */
  border-radius: 15px;
}

.subBtn {
  width: 100%;
  background-color: #b7b7b7;
}

.subBtn:hover {
  background-color: #a5a4a4;
}
</style>
