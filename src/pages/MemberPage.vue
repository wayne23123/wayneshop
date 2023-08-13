<script setup>
import { ref } from "vue";

// 顯示loading的函式
const showLoading = ref(false);
function showLoadingF() {
  showLoading.value = true;
  setTimeout(() => (showLoading.value = false), 800);
}
showLoadingF();
</script>

<template>
  <section>
    <div class="container">
      <div class="memberAside">
        <div class="userManage">
          <div>
            <h4>交易管理</h4>
            <br />
            <div>
              <RouterLink to="/member/"
                ><div class="links">
                  <span :class="{ active: orderActiveRef }">我的訂單</span>
                </div>
              </RouterLink>
            </div>
            <br />
          </div>
          <div>
            <h4>我的帳戶</h4>
            <br />
            <div class="links">
              <RouterLink to="/member/user">個人中心</RouterLink>
            </div>
            <br />
          </div>
        </div>
      </div>
      <div class="article">
        <RouterView />
      </div>
    </div>
    <div v-show="showLoading" class="loading"></div>
  </section>
</template>

<style scoped lang="scss">
section {
  a.router-link-active {
    /* 到頁面 active 顏色 */
    color: #00b700;
    border-bottom: 1px #00b700 solid;
  }

  a:hover {
    color: #01ca01;
  }

  .container {
    display: flex;
    padding: 10px;
    background-color: $yellowColor;
    min-height: 30vw;

    .memberAside {
      width: 180px;
      margin-right: 15px;
      border-radius: 2px;
      /* background-color: #c4c4c4; */
      background-image: url(../assets/svgs/stacked-peaks1.svg);

      background-repeat: no-repeat;
      background-size: cover;
      border-bottom: 1px solid #f6f6f6;

      .userManage {
        width: 180px;
        /* background-color: #c4c4c4; */

        h4 {
          color: #464646;
          background-color: #adadad;
          font-size: 18px;
          font-weight: 400;
          padding: 20px 52px 5px;
          border-top: 1px solid #f6f6f6;
          border-left: 1px solid #f6f6f6;
        }

        .links {
          padding: 0 52px 10px;
        }
      }
    }
  }
  .article {
    width: 100%;
    background-color: #c4c4c4;
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

@media screen and (max-width: 1100px) {
  section {
    .container {
      flex-wrap: wrap;

      .memberAside {
        width: 100%;
        margin-right: 0;
        display: flex;
        justify-content: center;

        .userManage {
          display: flex;
          justify-content: center;
          width: 100%;
        }
      }
    }
  }
}
</style>
