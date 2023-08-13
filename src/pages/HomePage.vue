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
    <div class="title" :class="{ titleShow: y > 199 }">
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
    <div class="title" :class="{ titleShow: y > 450 }">
      <h3>依分類挑商品</h3>
    </div>
  </section>
  <section class="sectionHoler40px"></section>

  <section class="sectionCategoryTop">
    <div>
      <transition name="listRight" tag="div">
        <div v-show="y > 550" class="categoryDivContainer">
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
    <div class="title" :class="{ titleShow: y > 950 }">
      <h3>創造你的風格</h3>
    </div>
  </section>

  <section @mouseenter="productionStore.searchTerm = ''" class="sectionToShop">
    <div>
      <div class="disCen">
        <div class="toShopLayout">
          <div>
            <div class="disCen">
              <img src="../assets/svgs/wss.svg" />
            </div>
            <div class="disCen corB">最新流行小舖</div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <router-link to="/shop" class="totalLeftButton">
          <button class="btn btn-background-slide">➜ 前往線上商城</button>
        </router-link>
      </div>
    </div>
  </section>

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
.sectionHoler40px {
  width: 100vw;
  max-width: 100%;
  height: 40px;
  background-color: $yellowColor;
  color: black;
  display: flex;
  justify-content: center;
}

.sectionHoler40px {
  width: 100vw;
  max-width: 100%;
  height: 40px;
  background-color: $yellowColor;
  color: black;
  display: flex;
  justify-content: center;
  .title {
    opacity: 0;
    transform: translateY(-100);
  }
  .titleShow {
    opacity: 1;
    transform: none;
    transition: all 0.8s ease;
  }
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
  .categoryDivContainer {
    display: flex;
    justify-content: space-evenly;
    .categoryDivOne {
      height: 200px;
      width: 232px;
      background-color: white;
      overflow: hidden;
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

      .categoryDivOneImgSize {
        width: 100%;
        height: auto;
      }
      .categoryDivOneImgSize:hover {
        transform: scale(1.2);
        transition: all 1s ease;
      }
    }

    .categoryDivTwo {
      height: 200px;
      width: 50vw;
      background-color: white;
      overflow: hidden;
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

      h1 {
        color: #fff;
      }

      .categoryDivTwoImgSize {
        width: auto;
        height: 100%;
      }

      .categoryDivTwoImgSize:hover {
        transform: scale(1.2);
        transition: all 1s ease;
      }
    }
  }
}

.sectionToShop {
  width: 100vw;
  max-width: 100%;

  // background-color: #000;
  background-image: url(../assets/svgs/polygon-scatter2.svg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  padding: 120px 0;

  .toShopLayout {
    width: 200px;
    height: 200px;

    background-color: #252525;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .corB {
      color: #daa520;
    }
  }

  .btn {
    background-color: #eeeeee;
    color: #222;
    font-size: 22px;
    padding: 20px 60px;
    border: none;
    outline: none;
    position: relative;
    cursor: pointer;
  }

  .btn.btn-background-slide::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background-color: #daa520;

    transition: transform 300ms ease-in-out;
    transform: scaleX(0);
    transform-origin: left;
  }

  .btn.btn-background-slide:hover::before,
  .btn.btn-background-slide:focus::before {
    transform: scaleX(1);
  }

  .btn.btn-background-slide {
    transition: color 300ms ease-in-out;
    z-index: 1;
  }

  .btn.btn-background-slide:hover,
  .btn.btn-background-slide:focus {
    color: rgb(0, 183, 0);
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
</style>
