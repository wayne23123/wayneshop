<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useProductionStore } from "../stores/production";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const cartStore = useCartStore();
const productionStore = useProductionStore();

// cartShowRef 控制右上角小購物車開關
const cartShowRef = ref(false);

function mouseEnterShowCart() {
  if (window.innerWidth > 700) {
    cartShowRef.value = true;
  }
}
function mouseEnterNoShowCart() {
  cartShowRef.value = false;
}

// 當 carts 陣列中友值時則 cartsHasProduction 為 true
const cartsHasProduction = computed(() => {
  return cartStore.carts.length > 0;
});

// 使用 computed 計算購物車中的商品數量總和
const cartsTotalCounter = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    return acc + cur.counter;
  }, 0);
});

// 使用 computed 計算購物車中商品的價格總和
const cartsTotalPrice = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    // cur.counter * cur.price 表示當前商品的價格
    return acc + cur.counter * cur.price;
  }, 0);
});

import { useScroll } from "@vueuse/core";
// 解構賦值
const { y } = useScroll(window);

function successReduceOne() {
  proxy.$message({ text: "成功刪除一件商品", type: "success" });
}

function successReduceAll() {
  proxy.$message({ text: "成功刪除全部商品", type: "success" });
}
</script>

<template>
  <section>
    <header :class="{ show: y > 78 }">
      <div>
        <router-link to="/"
          ><div class="svgHover">
            <img src="../assets/svgs/wss.svg" width="130" /></div
        ></router-link>
      </div>
      <input type="checkbox" id="nav_check" hidden />
      <nav>
        <ul>
          <li>
            <router-link to="/" class="svgHover"
              ><div class="">首頁</div></router-link
            >
          </li>
          <li>
            <router-link
              to="/shop"
              class="svgHover"
              @mouseenter="productionStore.searchTerm = ''"
              ><div class="svg">商城</div></router-link
            >
          </li>
          <li>
            <router-link to="/about" class="svgHover">關於我們</router-link>
          </li>
          <li>
            <router-link
              @mouseenter="mouseEnterShowCart"
              to="/cart"
              class="svgHover"
            >
              <div class="svg">
                購物車(<span class="corRed"> {{ cartsTotalCounter }} </span>)
              </div></router-link
            >
          </li>
        </ul>
      </nav>
      <label for="nav_check" class="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </label>
    </header>
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
                @click="
                  {
                    cartStore.removeCartItemById(cart.id, cart.size);
                    successReduceOne();
                  }
                "
                class="cartEmptyTopButton"
              >
                刪除商品
              </button>
            </div>
          </TransitionGroup>
          <router-link
            v-if="cartStore.carts.length > 8"
            to="/cart"
            class="toCartRouter"
          >
            到購物車查看更多商品...
          </router-link>
          <hr />
          <div class="cartEmptyTop">
            <div>
              目前購物車總共 {{ cartsTotalCounter }} 件商品，總共 NT
              {{ cartsTotalPrice }} 元
              <button
                v-if="cartStore.cartsHasProductionFunction()"
                @click="
                  {
                    cartStore.clearCartFunction();
                    successReduceAll();
                  }
                "
                class="cartEmptyTopButton"
              >
                刪除全部商品
              </button>
              <button v-else class="cartEmptyTopButton">目前已無商品</button>
            </div>
          </div>

          <transition name="fade" tag="div">
            <div>
              <router-link
                v-if="cartStore.cartsHasProductionFunction()"
                @mouseenter="copyStepOne"
                to="/cart"
                class="goCart"
                >前去結帳</router-link
              >
              <router-link
                v-else
                @mouseenter="copyStepOne"
                to="/shop"
                class="goCart"
              >
                購物車空了?前往商城
              </router-link>
            </div>
          </transition>
        </div>
        <div @mouseenter="mouseEnterNoShowCart" class="fakebottom">
          <div class="fakebottomText">︽</div>
        </div>

        <div @mouseenter="mouseEnterNoShowCart" class="fakeright">.</div>
        <div @mouseenter="mouseEnterNoShowCart" class="fakeleft">.</div>
      </div>
    </transition>
  </section>
</template>

<style scoped lang="scss">
section {
  header {
    position: fixed;
    background: $grayColor;
    // height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    z-index: 100;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    transform: translateY(-100%);
    opacity: 0;

    a.router-link-active {
      color: #00b700;
    }

    a {
      display: inline-block;
      color: #000;
      padding: 5px 0;
      margin: 0 1;
      border: 3px solid transparent;
    }

    .svgHover {
      font-size: 26px;
    }

    .svgHover:hover {
      transition: all 0.4s ease;
      filter: invert(30%) sepia(100%) saturate(500%) hue-rotate(100deg);
    }

    nav {
      ul {
        display: flex;
        li {
          .svg {
            padding: 0 25px 0 25px;

            .corRed {
              color: red;
            }
          }
        }
      }
    }
  }

  .show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .fakeCart {
    position: fixed;
    z-index: 201;
    right: 80px;
    top: 55px;

    // background-color: #8a0202;

    .cartTop {
      display: flex;
      justify-content: flex-end;
      right: 40px;

      .cartTriangle {
        position: relative;
        width: 40px;
        height: 40px;
        top: 20px;
        right: 20px;
        transform: rotate(225deg);
        background-color: $grayColor;
        z-index: 210;
        border-right: solid 2px black;
        border-bottom: solid 2px black;
      }
    }

    .cartEmpty {
      background-color: $grayColor;
      color: black;
      padding: 20px;
      border-radius: 10px;
      border: solid 2px black;
      z-index: 202;

      .cartEmptyTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $grayColor;
        z-index: 215;
        font-size: 26px;
      }

      .toCartRouter {
        font-size: 20px;
      }

      .toCartRouter:hover {
        color: #00b700;
      }

      .cartEmptyTopButton {
        margin: 10px 15px 0px 10px;
        padding: 10px;
        font-size: 26px;

        background-color: #000000;
        color: $whiteColor;
      }

      .cartEmptyTopButton:hover {
        background-color: #aa0000;
        color: black;
        transition: all 0.2s ease;
      }
    }

    .cartEmptyTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;

      .cartEmptyTopButton {
        margin: 10px 15px 0px 10px;
        padding: 10px;

        background-color: #000000;
        color: $whiteColor;
      }

      .cartEmptyTopButton:hover {
        background-color: #aa0000;
        color: black;
        transition: all 0.2s ease;
      }
    }

    .goCart {
      position: relative;
      top: 5px;
      background-color: #daa520;
      padding: 10px;
      font-size: 30px;
    }

    .goCart:hover {
      background-color: #fbbf27;
      color: $hoverGreenColor;
    }

    .fakebottom {
      color: red;
      /* background-color: green */

      .fakebottomText {
        font-size: 26px;
      }
    }

    .fakeleft {
      // background-color: green;
      position: relative;
    }

    .fakeright {
      display: flex;
      justify-content: flex-end;
      // background-color: green;
      position: relative;
      left: 250px;
    }
  }
}

.hamburger {
  cursor: pointer;
  display: none;
}

.hamburger div {
  width: 30px;
  height: 3px;
  margin: 5px 0;
  background-color: black;
}
@media only screen and (max-width: 900px) {
  header {
    padding: 0 30px;
  }
}
@media only screen and (max-width: 700px) {
  header {
    transform: translateY(-500%);
  }
  .hamburger {
    display: block;
  }
  nav {
    position: absolute;
    width: 100%;
    left: -100%;
    top: 70px;
    width: 100%;
    background-color: #9e9e9e;
    padding: 30px;
    transition: 0.3s;
    z-index: 99;
  }
  #nav_check:checked ~ nav {
    left: 0;
  }
  ul {
    flex-direction: column;
    align-items: center;
  }
  a {
    margin: 5px 0;
  }
  .svgH {
    display: flex;
    justify-content: center;
  }
}

/* cart----------------------------------------------------------------------- */

/* 控制TransitionGroup------------------------------------------------------------------------------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
