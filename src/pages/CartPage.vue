<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useSteponeStore } from "../stores/stepone";

import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const cartStore = useCartStore();
const steponeStore = useSteponeStore();

// 這個 Ref 保存在第一步對 carts 增減的狀態
const emptyCopyCartsRef = ref({});

// 當滑鼠移入 前去結帳 時會觸發保存當下的 carts 到 emptyCopyCartsRef 並清空 stepones 後推進去
function copyStepOne() {
  // 保存當下的 carts 狀態
  emptyCopyCartsRef.value = cartStore.carts;
  // 清空 stepones
  steponeStore.stepones = [];
  // 將 carts 狀態加入 stepones
  steponeStore.stepones.push(...emptyCopyCartsRef.value);
}

// 計算所有商品數量
const total = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    return acc + cur.counter;
  }, 0);
});

// 計算所有商品總價格
const totalPrice = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    // cur.counter * cur.price 表示當前商品的價格
    return acc + cur.counter * cur.price;
  }, 0);
});

const inputKupengRef = ref("");

const useKupengRef = ref(false);

// 當使用者輸入優惠碼時會觸發
function useKupengFunction() {
  // 保存當下的 carts 狀態
  emptyCopyCartsRef.value = cartStore.carts;
  if (inputKupengRef.value === "") {
    proxy.$message({ text: "優惠碼不能為空", type: "error" });

    return;
  } else if (inputKupengRef.value === " ") {
    proxy.$message({ text: "優惠碼不能為空", type: "error" });
    return;
  } else if (inputKupengRef.value === "open") {
    cartStore.updateMultipleKupengValues();
    useKupengRef.value = true;
    proxy.$message({ text: "套用優惠碼成功", type: "success" });
  } else {
    proxy.$message({ text: "非活動優惠碼", type: "error" });
    return;
  }
}

// 顯示loading的函式
const showLoading = ref(false);
function showLoadingF() {
  showLoading.value = true;
  setTimeout(() => (showLoading.value = false), 800);
}
showLoadingF();

function successPlus() {
  proxy.$message({ text: "成功增加一件商品", type: "success" });
}

function successReduce() {
  proxy.$message({ text: "成功減少一件商品", type: "success" });
}

function successReduceOne() {
  proxy.$message({ text: "成功刪除一件商品", type: "success" });
}

function successReduceAll() {
  proxy.$message({ text: "成功刪除全部商品", type: "success" });
}
</script>

<template>
  <section>
    <Marquee />
    <div class="sectionBuyProcess">
      <div class="buyProcessLayout">
        <div class="processDivOne">step1.確認購物清單</div>
        <div class="processDivTwo">step2.填寫購買資料</div>
        <div class="processDivThree">step3.付款去</div>
      </div>
    </div>

    <div class="sectionTable">
      <table>
        <thead>
          <tr>
            <th>REMOVE</th>
            <th>IMAGE</th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>SIZE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <TransitionGroup name="fade" tag="tbody">
          <tr v-for="cart in cartStore.carts" :key="cart.id">
            <td>
              <button
                @click="
                  {
                    cartStore.removeCartItemById(cart.id, cart.size);
                    successReduceOne();
                  }
                "
                class="removeButton"
              >
                Remove
              </button>
            </td>
            <td><img :src="cart.img" alt="" width="100" height="110" /></td>
            <td>{{ cart.title }}</td>
            <td>NT {{ cart.price }} 元</td>
            <td>{{ cart.size }}</td>
            <td>
              <button
                @click="
                  {
                    cartStore.decreaseCartItemById(cart.id, cart.size);
                    successReduce();
                  }
                "
                class="addLeft"
              >
                -1
              </button>
              {{ cart.counter }} 件
              <button
                @click="
                  {
                    cartStore.increaseCartItemById(cart.id, cart.size);
                    successPlus();
                  }
                "
                class="addLeft"
              >
                +1
              </button>
            </td>
            <td v-if="useKupengRef">
              <div class="textNone">
                原價 NT {{ cart.counter * cart.price }} 元
              </div>
              <div class="yellow">
                特價 NT {{ Math.floor(cart.counter * cart.price * 0.7) }} 元
              </div>
            </td>
            <td v-else>價格 NT {{ cart.counter * cart.price }} 元</td>
          </tr>
        </TransitionGroup>
      </table>
    </div>

    <div class="sectionInputKupeng">
      <div class="sectionInputKupengLayout">
        <div>
          <input
            v-model="inputKupengRef"
            type="text"
            placeholder="輸入優惠碼"
            class="nputKupengInput"
          />
          <button @click="useKupengFunction" class="nputKupengButton">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>

    <div class="sectionTotal">
      <div class="sectionTotalLayout">
        <div class="totalLeftButton">
          <div>
            <div
              v-if="cartStore.cartsHasProductionFunction()"
              @click="
                {
                  cartStore.clearCartFunction();
                  successReduceAll();
                }
              "
              class="leftClearBtn"
            >
              清除購物車
            </div>
            <div v-else><router-link to="/shop">前往至商城</router-link></div>
          </div>
        </div>

        <div class="totalMiddleButton">
          <div>
            <div v-if="useKupengRef">
              <div class="totalUse">
                <span class="bgcDa">使用了優惠碼</span>
              </div>
              <div class="totalPriceTop">原價NT{{ totalPrice }}元</div>
              <div class="totalPriceBottom">
                特價NT{{ Math.floor(totalPrice * 0.7) }}元
              </div>
            </div>
            <div v-else>
              <div>目前購物車</div>
              <div>總共{{ total }}件商品</div>
              <div>總共NT{{ totalPrice }}元</div>
            </div>
          </div>
        </div>

        <div class="totalRightButton">
          <div>
            <div
              v-if="cartStore.cartsHasProductionFunction()"
              @mouseenter="copyStepOne"
            >
              <router-link to="/form"> 前去結帳 </router-link>
            </div>
            <div v-else>
              <router-link to="/shop">前往商城</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="showLoading" class="loading"></div>
  </section>
</template>

<style scoped lang="scss">
section {
  width: 100vw;
  max-width: 100%;
  // background-color: #c4c4c4;
  .sectionBuyProcess {
    width: 100vw;
    max-width: 100%;
    background-color: $yellowColor;
    display: flex;
    justify-content: center;

    .buyProcessLayout {
      width: 70vw;
      background-color: $yellowColor;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .processDivOne {
        padding: 20px 10px;
        font-size: 26px;
        margin: 10px;
        color: rgb(200, 200, 200);
        background-color: rgb(0, 0, 0);
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .processDivTwo {
        padding: 20px;
        margin: 10px;
        color: black;
        background-color: #ddd;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
      }

      .processDivThree {
        padding: 20px 50px;
        margin: 10px;
        color: black;
        background-color: #ddd;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
      }
    }
  }

  .sectionTable {
    display: flex;
    justify-content: center;
    color: black;
    background-color: $grayColor;

    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;

      th,
      td {
        font-size: 26px;
        padding: 10px;
        border-bottom: solid 1px black;
      }
      tr {
        td {
          .removeButton {
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.15);
            font-size: 20px;
            border-radius: 10px;
          }

          .removeButton:hover {
            background-color: #565656;
            color: #fff;
          }
          .addLeft {
            margin: 0 10px;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.15);
            font-size: 20px;
            border-radius: 10px;
          }

          .addLeft:hover {
            background-color: #565656;
            color: #fff;
          }

          .yellow {
            background-color: #daa520;
          }

          .textNone {
            text-decoration: line-through;
          }
        }
      }
    }
  }

  .sectionInputKupeng {
    width: 100vw;
    max-width: 100%;
    background-color: #c4c4c4;
    display: flex;
    justify-content: center;

    .sectionInputKupengLayout {
      padding: 20px 0;
      width: 50vw;
      /* background-color: #fff; */
      display: flex;
      justify-content: center;

      .nputKupengInput {
        border-radius: 5px;
        font-size: 20px;
        padding: 20px;
      }
      .nputKupengButton {
        margin-left: 10px;
        background-color: #daa520;
        padding: 10px;
        border-radius: 15px;
        font-size: 20px;
      }

      .nputKupengButton:hover {
        color: rgb(0, 144, 0);
        background-color: #fabd21;
      }
    }
  }

  .sectionTotal {
    width: 100vw;
    max-width: 100%;
    padding: 50px 0;

    color: black;
    display: flex;
    justify-content: center;
    background-color: #939393;

    .sectionTotalLayout {
      width: 70vw;

      // background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .totalLeftButton {
        // background-color: black;
        padding: 30px 30px;
        margin: 10px;
        font-size: 26px;

        .leftClearBtn {
          border-radius: 15px;
          background-color: black;
          color: white;
          cursor: pointer;
          padding: 30px 30px;
        }

        .leftClearBtn:hover {
          background-color: #aa0000;
          color: black;
          transition: all 0.4s ease;
        }

        a {
          border-radius: 15px;
          background-color: black;
          color: white;
          cursor: pointer;
          padding: 30px 30px;
        }

        a:hover {
          background-color: #aa0000;
          color: black;
          transition: all 0.4s ease;
        }
      }

      .totalMiddleButton {
        // background-color: #171717;
        padding: 30px 30px;
        margin: 10px;
        font-size: 26px;
      }

      .totalRightButton {
        // background-color: #171717;
        padding: 30px 30px;
        margin: 10px;
        font-size: 26px;

        a {
          background-color: #daa520;
          padding: 30px 30px;
          border-radius: 15px;
        }

        a:hover {
          color: rgb(0, 144, 0);
          background-color: #fabd21;
          transition: all 0.4s ease;
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

    z-index: 300;
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

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

@media only screen and (max-width: 700px) {
  section {
    .sectionTotal {
      .sectionTotalLayout {
      }
    }
  }
}

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
</style>
