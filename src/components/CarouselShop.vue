<script setup>
import { ref } from "vue";
import { useProductionStore } from "../stores/production";
import { useDemoStore } from "../stores/demo";

const productionStore = useProductionStore();
const demoStore = useDemoStore();

// 這個空的ref用來複製當滑鼠移入商品卡片的時候,將此商品資訊複製到copyRef
const copyRef = ref({});

// 當滑鼠移入商品卡片的時候,將此商品資訊複製到copyRef,同時推進demoStore裡面的semos;
function copyCard(event, production) {
  copyRef.value = Object.assign({}, production);
  addDemosFunction();
}

// 使用push將複製的copyRef推進demoStore裡面的semos;
function addDemosFunction() {
  demoStore.demos.push({
    id: copyRef.value.id,
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
  });
}

// 控制Carousel-------------------------------------------------------------------------------------------------------

// carouselStart 代表商品列表的 right 屬性 0px
const carouselStart = ref(0);

const carouselStep = 210; // 每次移動的距離

// intervalId 會被用來存放 setInterval 函數所返回的計時器ID，以便於之後停止計時器。
let intervalId = null;

// 往右移動 carouselStep 的距離，當超出最右邊時回到最左邊
function moveCarouselRight() {
  carouselStart.value += carouselStep;
  if (carouselStart.value >= 1890) {
    carouselStart.value = 0;
  }
}

// 往左移動 carouselStep 的距離，當超出最左邊時回到最左邊
function moveCarouselLeft() {
  carouselStart.value -= carouselStep;
  if (carouselStart.value <= 0) {
    carouselStart.value = 0;
  }
}

// 開始輪播，設定 intervalId 為每 2 秒執行 moveCarouselRight
function startCarousel() {
  intervalId = setInterval(moveCarouselRight, 2000);
}

startCarousel();

// 停止輪播，清除 intervalId
function stopCarousel() {
  clearInterval(intervalId);
}
</script>

<template>
  <section class="sectionCarousel">
    <div class="carouselLayout">
      <button @click="moveCarouselLeft" class="carouselLeftButton">《</button>
      <button @click="moveCarouselRight" class="carouselRightButton">》</button>
      <div
        @mouseenter="stopCarousel"
        @mouseleave="startCarousel"
        class="caroselContainer"
      >
        <ul
          :style="{ right: carouselStart + 'px' }"
          @mouseenter="copyCard($event, production)"
          v-for="production in productionStore.productions.slice(0, 14)"
          :key="production.id"
          class="caroselUl"
        >
          <li>
            <router-link to="/demo"
              ><img class="caroselLi" :src="production.img" alt="" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sectionCarousel {
  width: 100%;
  max-width: 100%;
  height: 210px;
  position: relative;
}

.carouselLayout {
  width: 100%;
  height: auto;
  background-color: white;
  overflow: hidden;
}

.carouselLeftButton {
  position: absolute;

  color: red;
  font-size: 30px;
  z-index: 10;
  top: 90px;
}

.carouselRightButton {
  position: absolute;
  color: red;
  font-size: 30px;
  z-index: 10;
  top: 90px;
  right: 0;
}
.caroselContainer {
  display: flex;
  width: 3150px;
}

.caroselUl {
  position: relative;
  list-style: none;
  width: 210px;
  height: 210px;
  overflow: hidden;
  transition: all 1.6s ease;
}

.caroselLi {
  width: 100%;
  height: auto;
}
.caroselLi:hover {
  transform: scale(1.3);
  transition: all 0.6s ease;
}
</style>
