<script setup>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import { loginAPI } from "../apis/user";
import { useRouter } from "vue-router";

import { useUserStore } from "../stores/user";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

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
  showLoadingF();
  // 有3個值, 只要2個, 先解構復職
  const { account, password } = form.value;
  // 調用實例方法
  formRef.value.validate(async (valid) => {
    // formRef.value.validate((valid) => {
    // valid: 所有表單都通過較驗 才為true
    // console.log(valid);
    // 以valid作為判斷條件, 如果通過較驗才執行登陸邏輯

    if (valid) {
      showLoading.value = true;
      // TODO LOGIN
      // const res = await loginAPI({ account, password });
      // 改造
      // await userStore.getUserInfo({ account, password });
      await setTimeout(() => console.log("1"), 1000);
      userStore.userInfo.token = "1";
      // console.log(res);
      // await userStore.getUserInfo({ account, password });
      // 1. 提示用戶

      setTimeout(() => {
        proxy.$message({ text: "登入成功", type: "success" });
      }, 800);
      // 2. 跳轉首頁
      setTimeout(() => router.replace({ path: "/" }), 1000);

      localStorage.setItem("token", "1");
    }
  });
};

// 顯示loading的函式
const showLoading = ref(false);
function showLoadingF() {
  showLoading.value = true;
  setTimeout(() => (showLoading.value = false), 1400);
}
</script>

<template>
  <section>
    <div class="formLayout">
      <div class="logo">
        <router-link to="/"
          ><div class="svgHover">
            <img src="../assets/svgs/wss.svg" width="200" /></div
        ></router-link>
      </div>
      <div class="bread">
        <div>
          <span>
            <router-link to="/" class="greenHov"> 首頁 ➣ </router-link></span
          >
          <span> 會員登入</span>
        </div>
      </div>
      <div class="formCardContainer">
        <div class="formCardLayout">
          <div class="formCard">
            <br />
            <div class="disCen bgcTitle">帳戶登入</div>
            <br />
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
                >點擊登入</el-button
              >
            </el-form>
            <br />
            <br />
          </div>
        </div>

        <div>
          <!-- <div>測試帳號 xiaotuxian001</div> -->
          <div>測試帳號 admin</div>
          <div>測試密碼 123456</div>
        </div>
      </div>
    </div>
    <div v-show="showLoading" class="loading"></div>
  </section>

  <Footer />
</template>

<style scoped lang="scss">
section {
  width: 100vw;
  max-width: 100%;

  .formLayout {
    // background-color: #daa520;

    .logo {
      background-color: $grayColor;
      padding-left: 50px;

      .svgHover:hover {
        transition: all 0.4s ease;
        filter: invert(30%) sepia(100%) saturate(500%) hue-rotate(100deg);
      }
    }

    .bread {
      background-color: $yellowColor;
      color: black;

      padding: 50px 0 0 50px;
      font-size: 26px;

      .breacPad {
        padding: 20px;
        margin-left: 20px;
      }
    }

    .greenHov:hover {
      color: #00b700;
    }

    .formCardContainer {
      height: 60vh;
      color: black;
      background-image: url(../assets/svgs/circle-scatter1.svg);
      background-repeat: no-repeat;
      background-size: cover;

      .formCardLayout {
        display: flex;
        justify-content: center;
        // background-color: #c4c4c4;

        .formCard {
          width: 350px;
          background-color: #c4c4c4;
          padding: 0 20px 0 20px;
          /* width: 250px; */
          border-radius: 15px;

          .bgcTitle {
            padding: 15px;
            border-radius: 15px;
            background-color: #535353;
            color: #c4c4c4;
            font-size: 30px;
          }

          .subBtn {
            width: 100%;
            background-color: #171717;
            color: #c4c4c4;
            font-size: 30px;

            border-radius: 15px;
          }
          .subBtn:hover {
            background-color: #aa0000;
            color: black;
            transition: all 0.3s ease;
            border-radius: 15px;
          }
        }
      }
    }
  }
  .loading {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;

    background-color: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(5px);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 200;
  }

  .loading::after {
    content: "";
    height: 48px;
    width: 48px;
    display: block;
    border: 2px solid white;
    border-radius: 50%;
    border-right-color: transparent;

    animation: infinite rotate 0.5s linear;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
