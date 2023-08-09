<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useProductionStore } from "../stores/production";

const cartStore = useCartStore();
const productionStore = useProductionStore();

// cartShowRef 控制右上角小購物車開關
const cartShowRef = ref(false);

function mouseEnterShowCart() {
  if (window.innerWidth > 605) {
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
</script>

<template>
  <header>
    <div class="logo">
      <router-link to="/" class="none"
        ><div class="svgH"><img src="../assets/svgs/wss.svg" /></div
      ></router-link>
    </div>
    <input type="checkbox" id="nav" hidden />
    <nav>
      <ul>
        <li>
          <router-link to="/" class="svgH"
            ><div class="">首頁</div></router-link
          >
        </li>
        <li>
          <router-link
            to="/shop"
            class="svgH"
            @mouseenter="productionStore.searchTerm = ''"
            ><div class="svg">商城</div></router-link
          >
        </li>
        <li><router-link to="/about" class="svgH">關於我們</router-link></li>
        <li>
          <router-link to="/cart" class="svgH">
            <div class="svg">
              購物車(<span class="corRed"> {{ cartsTotalCounter }} </span>)
            </div></router-link
          >
        </li>
      </ul>
    </nav>
    <label for="nav" class="hamburger">
      <div></div>
      <div></div>
      <div></div>
    </label>
  </header>
</template>

<style scoped>
.corRed {
  color: red;
}

a.router-link-exact-active {
  color: #00b700;
}

.svg {
  padding: 0 25px 0 25px;
}

.svgH:hover {
  transition: all 0.4s ease;
  filter: invert(30%) sepia(100%) saturate(500%) hue-rotate(100deg);
}

header {
  background: #c4c4c4;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  z-index: 200;
}

ul {
  display: flex;
}

a {
  display: inline-block;
  color: #000;
  padding: 5px 0;
  margin: 0 1;
  border: 3px solid transparent;
}

/* a:hover,
.active {
  border-bottom-color: black;
} */

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
  .hamburger {
    display: block;
  }
  nav {
    position: absolute;
    width: 100%;
    left: -100%;
    top: 95px;
    width: 100%;
    background-color: #9e9e9e;
    padding: 30px;
    transition: 0.3s;
    z-index: 200;
  }
  #nav:checked ~ nav {
    left: 0;
  }
  ul {
    display: block;
  }
  a {
    margin: 5px 0;
  }
  .svgH {
    display: flex;
    justify-content: center;
  }
}
</style>
