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
  <section>
    <header>
      <div>
        <router-link to="/"
          ><div class="svgHover">
            <img src="../assets/svgs/wss.svg" width="130" /></div
        ></router-link>
      </div>
      <input type="checkbox" id="nav" hidden />
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
            <router-link to="/cart" class="svgHover">
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
  </section>
</template>

<style scoped lang="scss">
section {
  header {
    background: $grayColor;
    // height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    z-index: 200;
    border-bottom: 1px solid #a9a8a8;

    a.router-link-exact-active {
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
</style>
