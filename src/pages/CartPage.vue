<script setup>
import { ref, reactive, computed } from "vue";
import Footer from "../components/Footer.vue";
// import Marquee from "../components/Marquee.vue";
import { useCartStore } from "../stores/cart";
import { useSteponeStore } from "../stores/stepone";

const sectionDebugRef = ref(false);

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
  if (inputKupengRef.value == "open") {
    steponeStore.updateMultipleKupengValues();
    useKupengRef.value = true;
    ElMessage({ type: "success", message: "套用優惠碼成功" });
  } else {
    ElMessage({
      type: "warning",
      message: "非活動優惠碼",
    });
    return;
  }
}
</script>

<template>
  <Marquee />

  <section class="sectionBuyProcess">
    <div class="buyProcessLayout">
      <div class="processDivOne">step1.確認購物清單</div>
      <div class="processDivTwo">step2.填寫購買資料</div>
      <div class="processDivThree">step3.付款去</div>
    </div>
  </section>
  <section class="sectionCart">
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
                @click="cartStore.removeCartItemById(cart.id, cart.size)"
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
                @click="cartStore.decreaseCartItemById(cart.id, cart.size)"
                class="addLeft"
              >
                -1
              </button>
              {{ cart.counter }} 件
              <button
                @click="cartStore.increaseCartItemById(cart.id, cart.size)"
                class="addRight"
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
  </section>
  <section class="sectionInputKupeng">
    <div class="sectionInputKupengLayout">
      <div class="inputKupeng">
        <input v-model="inputKupengRef" type="text" placeholder="輸入優惠碼" />
        <button @click="useKupengFunction" class="nputKupengButton">
          套用優惠碼
        </button>
      </div>
    </div>
  </section>
  <section class="sectionTotal">
    <div class="sectionTotalLayout">
      <div
        v-if="cartStore.cartsHasProductionFunction()"
        @click="cartStore.clearCartFunction()"
        class="totalLeftButton"
      >
        清除購物車
      </div>
      <router-link
        v-else
        @mouseenter="copyStepOne"
        to="/shop"
        class="totalLeftButton"
      >
        <div>前往至商城</div>
      </router-link>

      <div>
        <transition name="fade" tag="div" class="POA">
          <div v-if="useKupengRef">
            <div class="totalUse">使用了優惠碼</div>
            <div class="totalPrice">目前購物車總共 {{ total }} 件商品，</div>
            <div class="totalPriceTop">原本 NT {{ totalPrice }} 元</div>
            <div class="totalPriceBottom">
              特價 NT {{ Math.floor(totalPrice * 0.7) }} 元
            </div>
          </div>
          <div v-else>
            目前購物車總共 {{ total }} 件商品，總共 NT {{ totalPrice }} 元
          </div>
        </transition>
      </div>

      <div>
        <transition name="fade" tag="div" class="totalRightButton">
          <router-link
            v-if="cartStore.cartsHasProductionFunction()"
            @mouseenter="copyStepOne"
            to="/form"
            class="router"
            >前去結帳</router-link
          >
          <router-link
            v-else
            @mouseenter="copyStepOne"
            to="/shop"
            class="router"
          >
            <div>到商城看新商品</div>
          </router-link>
        </transition>
      </div>
    </div>
  </section>

  <section v-show="sectionDebugRef" class="sectionDebug">
    <div>stepones 訂單的狀態{{ emptyCopyCartsRef }}</div>
    <div v-for="cart in cartStore.carts" :key="cart.id">
      carts的狀態{{ cart }}
    </div>
  </section>
  <section class="footerHolder"></section>
</template>

<style scoped>
.sectionDebug {
  display: flex;
  background-color: black;
  color: green;
  width: 100%;
  height: 60vh;
}

.sectionDebug button {
  background-color: green;
}
.sectionHolder {
  height: 110px;
  width: 100vw;
  max-width: 100%;
  background-color: #daa520;
}

.sectionBuyProcess {
  width: 100vw;
  max-width: 100%;
  background-color: #daa520;
  display: flex;
  justify-content: center;
}

.buyProcessLayout {
  width: 60vw;
  background-color: #daa520;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.processDivOne {
  width: 200px;
  height: 100px;
  margin: 10px;
  color: rgb(200, 200, 200);
  background-color: rgb(0, 0, 0);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.processDivTwo {
  width: 200px;
  height: 100px;
  margin: 10px;
  color: black;
  background-color: #ddd;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.processDivThree {
  width: 200px;
  height: 100px;
  margin: 10px;
  color: black;
  background-color: #ddd;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sectionCart {
  width: 100vw;
  max-width: 100%;
  background-color: #c4c4c4;
}

.footerHolder {
  height: 0;
  width: 100vw;
  max-width: 100%;
  background-color: #daa520;
}

.sectionTable {
  display: flex;
  justify-content: center;
  color: black;
}

table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

th,
td {
  padding: 10px;
  border-bottom: solid 1px black;
}

.addLeft {
  margin-right: 10px;
  padding: 10px;
}

.addRight {
  margin-left: 10px;
  padding: 10px;
}

.sectionInputKupeng {
  width: 100vw;
  max-width: 100%;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
}

.sectionInputKupengLayout {
  width: 50vw;
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
}
.nputKupengButton {
  background-color: #daa520;
  padding: 10px;
}

.nputKupengButton:hover {
  color: #777777;
}

.sectionTotal {
  width: 100vw;
  max-width: 100%;
  height: 190px;
  color: black;
  display: flex;
  justify-content: center;
  background-color: #939393;
}

.sectionTotalLayout {
  width: 60vw;
  height: 190px;
  /* background-color: #fff; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.totalLeftButton {
  background-color: black;
  color: white;
  padding: 20px;
  cursor: pointer;
}

.totalLeftButton:hover {
  background-color: #aa0000;
  color: black;
  transition: all 0.6s ease;
}

.POA {
  width: 196px;
  position: absolute;
  transform: translate(-50%, -50%);
}

.totalRightButton {
  display: flex;
  justify-content: center;
  width: 150px;
  position: absolute;
  transform: translate(-50%, -50%);
}

a {
  background-color: #daa520;
  padding: 20px;
}

a:hover {
  color: rgb(0, 144, 0);
  transition: all 0.4s ease;
}

.totalUse {
  background-color: #daa520;
  width: 100px;
}
.totalPrice {
  display: flex;
}

.totalPriceTop {
  text-decoration: line-through;
  width: 120px;
}
.totalPriceBottom {
  background-color: #daa520;
  width: 120px;
}

.yellow {
  background-color: #daa520;
}

.textNone {
  text-decoration: line-through;
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
</style>
