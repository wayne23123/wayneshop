<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { useScroll } from "@vueuse/core";

import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

// 解構賦值
const { y } = useScroll(window);

const userStore = useUserStore();

const router = useRouter();

const showLogoutRef = ref(false);

function showLogoutFunction() {
  showLogoutRef.value = !showLogoutRef.value;
}

function closeShowLogout() {
  showLogoutRef.value = false;
}

const confirm = () => {
  showLogoutRef.value = false;
  // 退出登入邏輯
  localStorage.removeItem("token");
  // 1. 清除用戶訊息 觸發 action
  userStore.clearUserInfo();

  showLoadingF();
  // 2. 跳轉到登入頁
  setTimeout(() => router.push("/login"), 800);
  proxy.$message({ text: "登出成功", type: "success" });
};

// 顯示loading的函式
const showLoading = ref(false);
function showLoadingF() {
  showLoading.value = true;
  setTimeout(() => (showLoading.value = false), 800);
}
</script>

<template>
  <nav>
    <div>
      <ul>
        <!-- 登入時顯示 -->
        <!-- 是否有 token -->
        <template v-if="userStore.userInfo.token">
          <li>
            <a
              href="javascript:;"
              @click="$router.push('/member/user')"
              class="borR"
            >
              <span class="imgLayout">
                <img
                  :src="userStore.userInfo.img"
                  alt=""
                  width="14"
                  height="14"
                  style="border-radius: 50%"
              /></span>
              <span class="padL10">{{ userStore.userInfo.name }}</span>
            </a>
          </li>
          <li>
            <div @click="showLogoutFunction()" class="pointer">
              <a href="javascript:;" class="borR">退出登入</a>
            </div>
            <div
              v-if="showLogoutRef && y < 100"
              @click="closeShowLogout()"
              class="dialogLayout"
            >
              <div class="dialogContent">
                <div class="triangle"></div>
                <div class="dialogContentText">
                  <p>確定登出?</p>
                  <br />
                  <div class="tableRightCardBtnLayout">
                    <div
                      @click="confirm()"
                      class="tableRightCardBtnLayoutBtnR pointer"
                    >
                      <div>確定</div>
                    </div>
                    <div class="tableRightCardBtnLayoutBtnL pointer">
                      <div>取消</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a
              href="javascript:;"
              @click="$router.push('/member/')"
              class="borR"
              >我的訂單</a
            >
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')" class="borR"
              >登錄</a
            >
          </li>
          <li>
            <RouterLink class="borR" to="/about">幫助</RouterLink>
          </li>
          <li><RouterLink to="/about">關於</RouterLink></li>
        </template>
      </ul>
    </div>
    <div v-show="showLoading" class="loading"></div>
  </nav>
</template>

<style scoped lang="scss">
nav {
  background-color: #2b2a2a;

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    li {
      a {
        color: $whiteColor;
        padding: 0 20px 0 20px;
        font-size: 20px;

        .imgLayout {
          width: 170px;
          height: 170px;
          border-radius: 50%;
          overflow: hidden;
        }

        .padL10 {
          padding: 0 0 0 10px;
        }
      }

      a:hover {
        color: $hoverGreenColor;
      }

      .borR {
        border-right: 1px solid $whiteColor;
      }
      .pointer {
        cursor: pointer;
      }

      .tableRightCardBtnLayout {
        display: flex;
        color: #000;
        .tableRightCardBtnLayoutBtnR {
          padding: 10px;
          border-radius: 15px;
          background-color: #accee3;
        }

        .tableRightCardBtnLayoutBtnR:hover {
          background-color: #98c6e3;
          color: #00b700;
          transition: all 0.3s ease;
        }

        .tableRightCardBtnLayoutBtnL {
          margin-left: 15px;
          padding: 10px;
          border-radius: 15px;
          background-color: #d8bebe;
        }

        .tableRightCardBtnLayoutBtnL:hover {
          background-color: #dbb2b2;
          color: #00b700;
          transition: all 0.3s ease;
        }
      }
      .dialogLayout {
        position: absolute;
        top: 70px;
        color: $whiteColor;

        z-index: 300;
      }

      .dialogContent {
        background-color: $middleGrayColor;
        padding: 10px;
        border-radius: 15px;
        border: 2px #000 solid;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
        text-align: center;

        .triangle {
          position: absolute;
          top: -25px;
          left: 25px;
          transform: rotate(225deg);
          width: 50px;
          height: 50px;
          border-right: 2px #000 solid;
          border-bottom: 2px #000 solid;
          background-color: $middleGrayColor;
          z-index: 300;
        }

        p {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          padding: 10px;
          font-size: 20px;
        }

        .dialogContentText {
          padding: 20px;
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
