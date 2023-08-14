<script setup>
import { ref, watch } from "vue";
import { useDemoStore } from "../stores/demo";
import { useCartStore } from "../stores/cart";

import { useMouseInElement } from "@vueuse/core";

import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const demoStore = useDemoStore();
const cartStore = useCartStore();

const demoRef = ref("");
// 將demo store的最後一筆資料賦值給demoRef
function copyDemoStore() {
  demoRef.value = demoStore.demos.slice(-1)[0];
}
copyDemoStore();

const amountDemo = ref(1);
const sizeRef = ref("M");
// 複製商品資料的函式
function copyDemoFunction(event, demoLast) {
  // 將複製商品資料的參考值改成最後一筆商品資料的內容
  copyDemoRef.value = Object.assign({}, demoLast);
}

// 新增複製的商品到購物車
function addcopyDemoFunction() {
  proxy.$message({ text: "加入購物車成功", type: "success" });

  // 將複製商品的資料以物件的形式加入到空的購物車參考值中
  cartStore.emptyRefs.push({
    id: demoRef.value.id,
    order: demoRef.value.order,
    img: demoRef.value.img,
    title: demoRef.value.title,
    category: demoRef.value.category,
    star: demoRef.value.star,
    stars: demoRef.value.stars,
    price: demoRef.value.price,
    description: demoRef.value.description,
    color: demoRef.value.color,
    label: demoRef.value.label,
    counter: amountDemo.value * 1,
    size: sizeRef.value,
    kupeng: demoRef.value.kupeng,
    email: demoRef.value.email,
    name: demoRef.value.name,
    telphone: demoRef.value.telphone,
    adress: demoRef.value.adress,
    message: demoRef.value.message,
    d: demoRef.value.d,
    year: demoRef.value.year,
    month: demoRef.value.month,
    date: demoRef.value.date,
    hours: demoRef.value.hours,
    minutes: demoRef.value.minutes,
    seconds: demoRef.value.seconds,
    pay: demoRef.value.pay,
    complete: demoRef.value.complete,
  });

  // 以商品 id 為依據進行比較並更新購物車內商品的數量
  cartStore.comparisonByIdFunction();
}

// 放大鏡功能
// https://vueuse.org/core/useMouseInElement/#usemouseinelement
// 1. 獲取滑鼠相對位置
const target = ref(null);
// 在目標div綁定ref="target"
const { elementX, elementY, isOutside } = useMouseInElement(target);
// 2.控制滑塊跟隨滑鼠移動 (監聽elementX/Y變化, 一旦變化 重新設置left/top)
// 思路:
// 2-1 有效移動範圍內的計算邏輯
// 橫向: 100 < elementX < 300 , left = elementX - 小滑塊寬度一半
// 縱向: 100 < elementY < 300 , top = elementY - 小滑塊高度一半
// 2-2 邊界距離控制
// 橫向: elementX > 300 left = 200 elementX < 100 left = 0
// 縱向: elementY > 300 top = 200 elementY < 100 top = 0

// 控制滑塊座標
const left = ref(0);
const top = ref(0);

// 控制大圖座標
const positionX = ref(0);
const positionY = ref(0);
watch([elementX, elementY], () => {
  // console.log("xy變化了");
  // 沒移入盒子不執行
  if (isOutside.value) return;
  // 有效範圍內控制滑塊距離
  if (elementX.value > 100 && elementX.value < 400) {
    left.value = elementX.value - 100;
  }
  if (elementY.value > 100 && elementY.value < 400) {
    top.value = elementY.value - 100;
  }
  // 處理邊界
  if (elementX.value > 400) {
    left.value = 300;
  }
  if (elementX.value < 100) {
    left.value = 0;
  }
  if (elementY.value > 400) {
    top.value = 300;
  }
  if (elementY.value < 100) {
    top.value = 0;
  }

  // 控制大圖顯示
  positionX.value = -left.value * 2 + "px";
  positionY.value = -top.value * 2 + "px";
});

// 3.滑鼠移入盒子 (isOutside) , 滑塊和大圖才顯示 (v-show)
// v-show="!isOutside"
</script>

<template>
  <section>
    <!-- {{ elementX }} , {{ elementY }} , {{ isOutside }} -->

    <div class="bread">
      <div>
        <span>
          <router-link to="/" class="greenHov"> 首頁 ➣ </router-link></span
        >
        <span>
          <router-link to="/shop" class="greenHov"> 商城 ➣ </router-link></span
        >
        <span> 商品預覽</span>
      </div>
    </div>

    <div class="sectionDemo">
      <div @mouseenter="copyDemoFunction($event, demoRef)" class="demoLayout">
        <div class="leftImgLayout" ref="target">
          <div class="leftImg">
            <img class="imgSize" :src="demoRef.img" />

            <!-- 蒙層小滑塊 -->
            <div
              class="layer"
              :style="{ left: `${left}px`, top: `${top}px` }"
              v-show="!isOutside"
            ></div>
          </div>
          <div class="large" v-show="!isOutside">
            <img class="imgLargeSize" :src="demoRef.img" />
          </div>
        </div>

        <div class="rightInfoContainer">
          <div class="rightInfoLayout">
            <div class="rightInfo">
              <div class="demoTitle">{{ demoRef.title }}</div>

              <div class="demoPrice">商品價格: {{ demoRef.price }}</div>
              <div class="demoStar">
                社群評價:
                <div class="demoYellowStar">{{ demoRef.star }}</div>
              </div>
              <div>
                <select class="sizeRef" name="sizeRef" v-model="sizeRef">
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="S">S</option>
                </select>
                <select
                  class="amountDemo"
                  name="amountDemo"
                  v-model="amountDemo"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <button class="demoButton" @click="addcopyDemoFunction">
                  新增至購物車
                </button>
              </div>
              <div class="demoCategory">商品種類: {{ demoRef.category }}</div>
              <div class="demoDescriptionTitle">商品簡介:</div>
              <div class="demoDescription">{{ demoRef.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  .bread {
    padding: 50px;
    background-color: $yellowColor;
    color: black;
    font-size: 26px;
  }

  .greenHov:hover {
    color: #00b700;
  }

  .sectionDemo {
    width: 100vw;
    max-width: 100%;

    padding: 50px 0 150px 0;
    display: flex;
    justify-content: center;
    // background-color: #daa520;
    background-image: url(../assets/svgs/stacked-peaks2.svg);
    background-repeat: no-repeat;
    background-size: cover;

    .demoLayout {
      position: relative;
      width: 1000px;
      max-width: 800px;
      /* background-color: #500000; */
      display: flex;
      justify-content: center;

      .leftImgLayout {
        .leftImg {
          width: 600px;
          height: 600px;
          background-color: #343333;
          overflow: hidden;
          position: relative;

          .imgSize {
            width: 100%;
            height: 100%;
          }

          .layer {
            width: 300px;
            height: 300px;
            background: rgba(0, 0, 0, 0.2);
            left: 0;
            top: 0;
            position: absolute;
          }
        }

        .large {
          position: absolute;
          top: 0;
          left: 412px;
          width: 600px;
          height: 600px;
          z-index: 10;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-repeat: no-repeat;
          background-color: #f8f8f8;
          overflow: hidden;

          .imgLargeSize {
            width: 1000px;
            height: 1000px;
            object-position: v-bind(positionX) v-bind(positionY);
          }
        }
      }
    }

    .rightInfoContainer {
      .rightInfoLayout {
        width: 600px;
        height: 600px;
        padding: 0 20px 0 20px;

        .rightInfo {
          padding: 15px;
          background-color: #a3a3a3;
          border-radius: 15px;
          padding: 40px;

          .demoTitle {
            color: black;
            padding: 5px;
            font-size: 32px;
          }

          .demoPrice {
            color: black;
            padding: 5px;
            font-size: 26px;
          }

          .demoStar {
            color: #565656;
            padding: 5px;
            display: flex;
            font-size: 24px;

            .demoYellowStar {
              color: yellow;
              padding-left: 5px;
            }
          }

          .sizeRef {
            font-size: 18px;
            margin: 5px;
            padding: 4px;
          }

          .amountDemo {
            font-size: 18px;
            margin: 5px;
            padding: 4px;
          }

          .demoButton {
            background-color: #daa520;
            color: black;
            padding: 6px 10px 6px 10px;
            margin-left: 5px;
            font-size: 20px;
          }

          .demoButton:hover {
            background-color: #ffb700;
            color: rgb(0, 144, 0);
            padding: 7px 11px 7px 11px;
          }

          .demoCategory {
            color: #565656;
            font-size: 24px;
          }
          .demoDescriptionTitle {
            color: black;
            padding: 5px 0;
            font-size: 26px;
          }

          .demoDescription {
            color: black;
            font-size: 24px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 820px) {
  .demoLayout {
    flex-wrap: wrap;
    .leftImgLayout {
      .layer {
        display: none;
      }

      .large {
        display: none;
      }
    }

    .rightInfoContainer {
      padding: 50px 0 0 0;
    }
  }
}
</style>
