<script setup>
import { ref } from "vue";

import { useProductionStore } from "../stores/production";
import { useDemoStore } from "../stores/demo";
import { useCartStore } from "../stores/cart";

import { useScroll } from "@vueuse/core";

import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

// 解構賦值
const { y } = useScroll(window);

const productionStore = useProductionStore();
const demoStore = useDemoStore();
const cartStore = useCartStore();

const carouselShopShowRef = ref(false);
window.addEventListener("scroll", function () {
  // 當 scrollY大於290 則 carouselShopShowRef 為 true
  carouselShopShowRef.value = window.scrollY > 290;
});

// 當點擊返回頂部時，滾動到頁面頂部
function toTopFunction() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// 這個空的ref用來複製當滑鼠移入商品卡片的時候,將此商品資訊複製到copyRef
const copyRef = ref({});

// 當滑鼠移入商品卡片的時候,將此商品資訊複製到copyRef,同時推進demoStore裡面的semos;
function copyCard(event, production) {
  copyRef.value = Object.assign({}, production);
  addDemosFunction();
}

// 使用 push 將複製的 copyRef 推進 demoStore 裡面的 demos;
function addDemosFunction() {
  demoStore.demos.push({
    id: copyRef.value.id,
    order: copyRef.value.order,
    img: copyRef.value.img,
    title: copyRef.value.title,
    category: copyRef.value.category,
    star: copyRef.value.star,
    stars: copyRef.value.stars,
    price: copyRef.value.price,
    description: copyRef.value.description,
    color: copyRef.value.color,
    label: copyRef.value.label,
    counter: copyRef.value.counter,
    size: copyRef.value.size,
    kupeng: copyRef.value.kupeng,
    email: copyRef.value.email,
    name: copyRef.value.name,
    telphone: copyRef.value.telphone,
    adress: copyRef.value.adress,
    message: copyRef.value.message,
    d: copyRef.value.d,
    year: copyRef.value.year,
    month: copyRef.value.month,
    date: copyRef.value.date,
    hours: copyRef.value.hours,
    minutes: copyRef.value.minutes,
    seconds: copyRef.value.seconds,
    pay: copyRef.value.pay,
    complete: copyRef.value.complete,
  });
}

// 這個 amountRef 用 v-model 綁定卡片下的選單
const amountRef = ref(1);

// 這個sizeRef用v-model綁定卡片下的選單
const sizeRef = ref("M");

// 使用 push 將複製的 copyRef 推進 cartStore 裡面的 emptyRefs 再用 comparisonByIdFuntion來比較後加入購物車;
function addCartsFunction() {
  proxy.$message({ text: "加入購物車成功", type: "success" });
  cartStore.emptyRefs.push({
    id: copyRef.value.id,
    order: copyRef.value.order,
    img: copyRef.value.img,
    title: copyRef.value.title,
    category: copyRef.value.category,
    star: copyRef.value.star,
    stars: copyRef.value.stars,
    price: copyRef.value.price,
    description: copyRef.value.description,
    color: copyRef.value.color,
    label: copyRef.value.label,
    counter: amountRef.value * 1,
    size: sizeRef.value,
    kupeng: copyRef.value.kupeng,
    email: copyRef.value.email,
    name: copyRef.value.name,
    telphone: copyRef.value.telphone,
    adress: copyRef.value.adress,
    message: copyRef.value.message,
    d: copyRef.value.d,
    year: copyRef.value.year,
    month: copyRef.value.month,
    date: copyRef.value.date,
    hours: copyRef.value.hours,
    minutes: copyRef.value.minutes,
    seconds: copyRef.value.seconds,
    pay: copyRef.value.pay,
    complete: copyRef.value.complete,
  });
  cartStore.comparisonByIdFunction();
}

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
    <div>
      <CarouselShop />
      <Marquee />
      <div class="topNavBar">
        <div class="topNavBarLayout">
          <div class="topNavBarCenter">
            <label for="input-field">搜尋:</label>
          </div>
          <div class="topNavBarCenter">
            <input
              @mouseenter="productionStore.searchTerm = []"
              id="input-field"
              v-model="productionStore.searchTerm"
              class="searchInput"
              type="text"
              placeholder="搜尋商品..."
            />
          </div>

          <br />
          <div class="topNavBarCenter">
            <label for="showAll"> 全部商品 </label>
            <input
              id="showAll"
              type="radio"
              name="category"
              value=""
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showHat"> 帽子分類</label>
            <input
              id="showHat"
              type="radio"
              name="category"
              value="hat"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showShoes"> 鞋子分類</label>
            <input
              id="showShoes"
              type="radio"
              name="category"
              value="shoes"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showClothes"> 衣服分類</label>
            <input
              id="showClothes"
              type="radio"
              name="category"
              value="clothes"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showPants"> 褲子分類</label>
            <input
              id="showPants"
              type="radio"
              name="category"
              value="pants"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
        </div>
      </div>

      <div class="bread">
        <div class="breacPad">
          <span>
            <router-link to="/" class="greenHov"> 首頁 ➣ </router-link></span
          >
          <span>商城</span>
        </div>
      </div>

      <div class="shopContainer">
        <div
          @mouseenter="copyCard($event, production)"
          class="shopCard"
          v-for="production in productionStore.searchedProductionTitle"
          :id="production.id"
        >
          <div class="cardImg">
            <router-link to="/demo">
              <img class="imgSize" :src="production.img" />
              <img class="imgPOR" :src="production.img" />
            </router-link>
          </div>
          <div class="cardCart">
            <select name="sizeRef" v-model="sizeRef">
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="S">S</option>
            </select>
            <select name="amount" v-model="amountRef">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <button @click="addCartsFunction" class="cardCartButton">
              <div class="buttonText">🛒</div>
            </button>
          </div>
          <div class="cardLeft">
            <div class="cardTitle">{{ production.title }}</div>
            <div class="cardCategory">種類: {{ production.category }}</div>
            <div class="cardStar">{{ production.star }}</div>
            <div class="cardPrice">NT {{ production.price }}</div>
          </div>
        </div>
      </div>

      <!-- <Footer /> -->

      <div class="topNavBar opa" :class="{ show: y >= 295 }">
        <div class="topNavBarLayout">
          <div class="topNavBarCenter">
            <label for="input-field">搜尋:</label>
          </div>
          <div class="topNavBarCenter">
            <input
              @mouseenter="productionStore.searchTerm = []"
              id="input-field"
              v-model="productionStore.searchTerm"
              class="searchInput"
              type="text"
              placeholder="搜尋商品..."
            />
          </div>

          <br />
          <div class="topNavBarCenter">
            <label for="showAll"> 全部商品</label>
            <input
              id="showAll"
              type="radio"
              name="category"
              value=""
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showHat"> 帽子分類</label>
            <input
              id="showHat"
              type="radio"
              name="category"
              value="hat"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showShoes"> 鞋子分類</label>
            <input
              id="showShoes"
              type="radio"
              name="category"
              value="shoes"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showClothes"> 衣服分類</label>
            <input
              id="showClothes"
              type="radio"
              name="category"
              value="clothes"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
          <br />
          <div class="topNavBarCenter">
            <label for="showPants"> 褲子分類</label>
            <input
              id="showPants"
              type="radio"
              name="category"
              value="pants"
              v-model="productionStore.searchTerm"
              class="inputRadio"
            />
          </div>
        </div>
      </div>
      <transition name="fade" tag="div" v-show="carouselShopShowRef">
        <button @click="toTopFunction" class="toTop">
          <div class="toTopButton">
            <div class="disCen">___</div>
            <div class="disCen">▲</div>
          </div>
        </button>
      </transition>
      <div v-show="showLoading" class="loading"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  width: 100vw;
  max-width: 100%;
  .topNavBar {
    background-color: $darkYellowColor;
    color: black;
    display: flex;
    align-items: center;
    .topNavBarLayout {
      display: flex;
      flex-wrap: wrap;

      .topNavBarCenter {
        padding: 10px 0 10px 15px;

        label {
          cursor: pointer;
        }
        .searchInput {
          width: 150px;
          height: 30px;
          border-radius: 10px;
        }
        .inputRadio {
          display: none;
        }
      }
    }
  }

  .opa {
    opacity: 0;
    position: fixed;
  }

  .show {
    z-index: 99;
    position: fixed;
    top: 70px;
    width: 100%;
    transition: all 0.1s linear;
    opacity: 1;
  }

  .bread {
    background-color: $yellowColor;
    color: black;

    .breacPad {
      padding: 20px;
      margin-left: 20px;
    }
  }

  .greenHov:hover {
    color: #00b700;
  }

  .shopContainer {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    background-color: $yellowColor;
    width: 100vw;
    max-width: 100%;
    .shopCard {
      display: flex;
      flex-direction: column;
      margin: 12px;
      padding: 0 10px;
      border-radius: 15px;
      background-color: gray;
      height: 350px;
      width: 15vw;
      min-width: 250px;
      overflow: hidden;
      left: 60px;

      .cardImg {
        position: relative;
        width: 230px;
        height: 230px;
        top: 15px;
        background-color: black;
        overflow: hidden;
        .imgSize {
          width: 100%;
          height: auto;
          z-index: 20;
        }

        .imgSize:hover {
          transform: scale(1.2);
          transition: all 0.5s ease;
        }

        .imgPOR {
          position: relative;
          width: 100%;
          height: 100%;
          filter: blur(5px);
          transform: translate(0, 0);
          z-index: 1;
        }
      }

      .cardCart {
        position: relative;
        bottom: -95px;
        left: 115px;
        z-index: 50;
        .cardCartButton {
          position: relative;
          bottom: 10px;
          background-color: rgba(255, 0, 0, 0.772);
          padding: 18px;
          border-radius: 50%;

          .buttonText {
            position: absolute;
            right: 9px;
            bottom: 9px;
            pointer-events: none;
          }
        }

        .cardCartButton:hover {
          background-color: rgba(255, 0, 0, 1);
        }
      }

      .cardLeft {
        position: relative;
        bottom: 15px;

        .cardTitle {
          color: black;
        }

        .cardCategory {
          color: rgba(30, 30, 30, 0.7);
        }
        .cardStar {
          color: yellow;
        }

        .cardPrice {
          color: black;
        }
      }
    }
  }

  .toTop {
    top: 550px;
    right: 22px;
    position: fixed;
    z-index: 200;
    background-color: #7f010190;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    .toTopButton {
      position: relative;
      bottom: 7px;
      padding-left: 0;
      color: #999;
      pointer-events: none;
    }
  }

  .toTop:hover {
    background-color: #ab0101bd;
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
