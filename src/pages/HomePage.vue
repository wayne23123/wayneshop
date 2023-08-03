<script setup>
import { ref } from "vue";
import Carousel from "../components/Carousel.vue";
import { useProductionStore } from "../stores/production";
import { useScroll } from "@vueuse/core";
// 解構賦值
const { y } = useScroll(window);

const productionStore = useProductionStore();

// 當點擊返回頂部時，滾動到頁面頂部
function toTopFunction() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <Carousel />
  <section class="sectionHoler40px"></section>
  <section class="sectionHoler40px">
    <div class="title" :class="{ titleShow: y > 220 }">
      <h3>今日新上架</h3>
    </div>
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionCarouselShop">
    <transition name="fade" tag="div">
      <div v-show="y > 290"><CarouselShop></CarouselShop></div>
    </transition>
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionHoler40px">
    <div class="title" :class="{ titleShow: y > 550 }">
      <h3>依分類挑商品</h3>
    </div>
  </section>
  <section class="sectionHoler40px"></section>

  <section class="sectionCategoryTop">
    <div class="categoryLayout">
      <transition name="listRight" tag="div">
        <div v-show="y > 600" class="categoryDivContainer">
          <div
            @mouseenter="productionStore.searchTerm = 'pants'"
            class="categoryDivOne"
          >
            <router-link to="/shop">
              <div class="categoryDivOneText"><h1>褲子</h1></div>
              <img
                class="categoryDivOneImgSize"
                src="../assets/imgs/w008.jpg"
              />
            </router-link>
          </div>
          <div
            @mouseenter="productionStore.searchTerm = 'clothes'"
            class="categoryDivTwo"
          >
            <router-link to="/shop">
              <div class="categoryDivTwoText"><h1>上衣</h1></div>
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w015.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w007.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w016.jpg"
              />
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionCategoryTop">
    <div class="categoryLayout">
      <transition name="listLeft" tag="div">
        <div v-show="y > 600" class="categoryDivContainer">
          <div
            @mouseenter="productionStore.searchTerm = 'shoes'"
            class="categoryDivTwo"
          >
            <router-link to="/shop">
              <div class="categoryDivTwoText"><h1>鞋子</h1></div>
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w002.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w004.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w010.jpg"
              />
            </router-link>
          </div>
          <div
            @mouseenter="productionStore.searchTerm = 'hat'"
            class="categoryDivOne"
          >
            <router-link to="/shop">
              <div class="categoryDivOneText"><h1>帽子</h1></div>
              <img
                class="categoryDivOneImgSize"
                src="../assets/imgs/w006.jpg"
              />
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionHoler40px">
    <div class="title" :class="{ titleShow: y > 1150 }">
      <h3>創造你的風格</h3>
    </div>
  </section>
  <section class="sectionHoler40px"></section>

  <transition name="fade" tag="div" v-show="y > 0">
    <button @click="toTopFunction" class="toTop">
      <div class="toTopButton">
        <div class="disCen">___</div>
        <div class="disCen">▲</div>
      </div>
    </button>
  </transition>
</template>

<style scoped lang="scss">
@import "@/styles/var.scss";
.sectionHoler40px {
  width: 100vw;
  max-width: 100%;
  height: 40px;
  background-color: $yellowColor;
  color: black;
  display: flex;
  justify-content: center;
}

.title {
  opacity: 0;
  transform: translateY(-100);
}

.titleShow {
  opacity: 1;
  transform: none;
  transition: all 0.8s ease;
}

.sectionCarouselShop {
  width: 100vw;
  max-width: 100%;
  height: 210px;
  background-color: $yellowColor;
}

.sectionCategoryTop {
  width: 100vw;
  max-width: 100%;
  height: 200px;
  background-color: $yellowColor;
  overflow: hidden;
}

.categoryDivContainer {
  display: flex;
  justify-content: space-evenly;
}

.categoryDivOne {
  height: 200px;
  width: 232px;
  background-color: white;
  overflow: hidden;
}

.categoryDivOneImgSize {
  width: 100%;
  height: auto;
}

.categoryDivOneText {
  position: absolute;
  height: 200px;
  width: 232px;
  background-color: #00000033;
  z-index: 10;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #fff;
}

.categoryDivOneImgSize:hover {
  transform: scale(1.2);
  transition: all 1s ease;
}

.categoryDivTwo {
  height: 200px;
  width: 50vw;
  background-color: white;
  overflow: hidden;
}

.categoryDivTwoText {
  position: absolute;
  height: 200px;
  width: 50vw;
  background-color: #00000033;
  z-index: 10;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.categoryDivTwoImgSize {
  width: auto;
  height: 100%;
}

.categoryDivTwoImgSize:hover {
  transform: scale(1.2);
  transition: all 1s ease;
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
}

.toTop:hover {
  background-color: #ab0101bd;
}
.toTopButton {
  position: relative;
  bottom: 7px;
  padding-left: 0;
  color: #999;
  pointer-events: none;
}

th {
  padding: 5px;
}

.bgcWhite {
  background-color: #fff;
  border: 1px solid black;
}

/* 控制TransitionGroup------------------------------------------------------------------------------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
/* left--------------------------------------------------------------------------------- */

.listLeft-enter-active,
.listLeft-leave-active {
  transition: all 3s ease;
}

.listLeft-enter-from {
  transform: translateX(-100%);
}
.listLeft-leave-to {
  transform: translateX(100%);
}

.listLeft-leave-active,
.listLeft-enter-active {
}

/* right--------------------------------------------------------------------------------- */

.listRight-enter-active,
.listRight-leave-active {
  transition: all 3s ease;
}

.listRight-enter-from {
  transform: translateX(100%);
}
.listRight-leave-to {
  transform: translateX(-100%);
}

.listRight-leave-active,
.listRight-enter-active {
}

/* up--------------------------------------------------------------------------------- */

.listUp-enter-active,
.listUp-leave-active {
  transition: all 3s ease;
}

.listUp-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.listUp-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media screen and (max-width: 865px) {
  .tableLayout {
    justify-content: flex-start;
  }
}
</style>
