<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
const userStore = useUserStore();

const router = useRouter();
const confirm = () => {
  // 退出登陸邏輯
  // 1. 清除用戶訊息 觸發 action
  userStore.clearUserInfo();
  // 2. 跳轉到登入頁
  router.push("/login");
};
</script>

<template>
  <nav>
    <div class="navContainer">
      <ul>
        <!-- 登入時顯示 -->
        <!-- 是否有 token -->
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:;" @click="$router.push('/member')"
              ><i class="iconfont icon-user"></i>
              {{ userStore.userInfo.account }}
            </a>
          </li>
          <li>
            <el-popconfirm
              @confirm="confirm"
              title="確定退出嗎?"
              confirm-button-text="確定"
              cancel-button-text="取消"
            >
              <template #reference>
                <a href="javascript:;">退出登陸</a>
              </template>
            </el-popconfirm>
          </li>
          <li>
            <a href="javascript:;" @click="$router.push('/member/order')"
              >我的訂單</a
            >
          </li>
          <li>
            <a href="javascript:;" @click="$router.push('/member')">會員中心</a>
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')">登錄</a>
          </li>
          <li><a href="javascript:;">幫助</a></li>
          <li><a href="javascript:;">關於</a></li>
        </template>
      </ul>
    </div>
  </nav>
  <!-- <section class="header">
    <router-link to="/" class="none"
      ><div class="svg"><img src="../assets/svgs/wss.svg" /></div
    ></router-link>
    <div class="navbar">
      <router-link to="/" class="router importSVG"
        ><div class="svg">
          <img src="../assets/svgs/home.svg" />Home
        </div></router-link
      >
      <router-link
        to="/shop"
        class="router importSVG"
        @mouseenter="productionStore.searchTerm = ''"
        ><div class="svg">
          <img src="../assets/svgs/shop.svg" />Shop
        </div></router-link
      >
      <router-link to="/about" class="router"> ✒About</router-link>
      <router-link
        @mouseenter="mouseEnterShowCart"
        to="/cart"
        :class="{ 'has-items': cartsHasProduction }"
        class="router importSVG"
      >
        <div class="svg">
          <img src="../assets/svgs/cart.svg" /> Cart({{ cartsTotalCounter }})
        </div></router-link
      >
      <router-link to="/login" class="router"><div>✎Login</div> </router-link>
    </div>
  </section>
  <transition name="fade">
    <div v-show="cartsHasProduction" class="redPlus">✚</div>
  </transition>

  <transition name="fade">
    <div v-show="cartShowRef" class="fakeCart">
      <div class="cartTop">
        <div class="cartTriangle"></div>
      </div>
      <div class="cartEmpty">
        <TransitionGroup name="fade" tag="div">
          <div
            v-for="cart in cartStore.carts.slice(0, 8)"
            :key="cart.id"
            class="cartEmptyTitle"
          >
            商品: {{ cart.title }} size: {{ cart.size }} 數量:
            {{ cart.counter }} 件
            <button
              @click="cartStore.removeCartItemById(cart.id)"
              class="cartEmptyTopButton"
            >
              刪除商品
            </button>
          </div>
        </TransitionGroup>
        <router-link v-if="cartStore.carts.length > 8" to="/cart">
          到購物車查看更多商品...
        </router-link>
        <hr />
        <div class="cartEmptyTop">
          <div>
            目前購物車總共 {{ cartsTotalCounter }} 件商品，總共 NT
            {{ cartsTotalPrice }} 元
            <button
              @click="cartStore.clearCartFunction()"
              class="cartEmptyTopButton"
            >
              刪除全部商品
            </button>
          </div>
        </div>
        <router-link to="/cart" class="goCart">結帳去</router-link>
      </div>
      <div @mouseenter="mouseEnterNoShowCart" class="fakebottom">
        <div class="fakebottomText">︽</div>
      </div>

      <div @mouseenter="mouseEnterNoShowCart" class="fakeright">.</div>
      <div @mouseenter="mouseEnterNoShowCart" class="fakeleft">.</div>
    </div>
  </transition> -->
</template>

<style scoped>
nav {
  background-color: #2b2a2a;
  color: white;
  height: 25px;
}

a {
  color: white;
  padding: 0 20px 0 20px;
  border-right: 1px solid white;
}

a:hover {
  color: greenyellow;
}

ul {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}

/* test---------------------------------------------------------------------------------------------------- */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
/* test---------------------------------------------------------------------------------------------------- */

@media screen and (max-width: 755px) {
  .router {
    padding: 0;
  }

  .redPlus {
    width: 100px;
    height: 100px;
    z-index: 300;
    color: red;
    position: fixed;
    right: 1px;
    font-size: 20px;
    pointer-events: none;
  }
}

@media screen and (max-width: 605px) {
  .header {
    height: 75px;
    display: flex;
    flex-wrap: wrap;
  }

  .none {
    transform: scale(0.3);
    height: 10px;
    transition: all 0.4s ease;
  }
  .redPlus {
    color: #ddd;
    pointer-events: none;
  }
}
</style>
