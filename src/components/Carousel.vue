<script setup>
import { ref } from "vue";

import clarkStreet from "@/assets/pictures/clark-street-q.jpg";
import clark from "@/assets/pictures/clark.jpg";
import carl from "@/assets/pictures/carl-r.jpg";
import hannah from "@/assets/pictures/hannah-m.jpg";
import openAlert from "@/assets/pictures/openAlert.jpg";

const imgs = ref([clarkStreet, clark, carl, hannah, openAlert]);

// showCarousel 代表從第0張開始
const showCarousel = ref(0);

// 綁訂在 TransitionGroup name 預設是 listLeft
const transitionName = ref("listLeft");

const buttonState = ref(false);

// 按下按鈕時，先將 buttonState 設為 true，一段時間後再設回 false
function buttonDisabled() {
  buttonState.value = true;
  setTimeout(() => (buttonState.value = false), 2100);
}

// 按上一張到小於0=>從左邊進來
// 按下一張到大於總長度=>從右邊進來
function setShowCarousel(index) {
  if (index < 0) {
    // 按上一張到小於0-->從左邊進來
    buttonDisabled();
    transitionName.value = "listLeft";
    showCarousel.value = imgs.value.length - 1;
  } else if (index > imgs.value.length - 1) {
    // 按下一張到大於總長度-->從右邊進來
    buttonDisabled();
    showCarousel.value = 0;
    transitionName.value = "listRight";
  } else {
    buttonDisabled();
    // 決定播放哪種過場動畫 條件: 目前第幾張,是否小於總數 成立:從右邊進來 不成立:從左邊進來
    transitionName.value =
      showCarousel.value < index ? "listRight" : "listLeft";
    showCarousel.value = index;
    // 顯示指定的圖片
  }
}

// intervalId 會被用來存放 setInterval 函數所返回的計時器ID，以便於之後停止計時器。
let intervalId = null;

// // 啟動自動播放功能
function startCarousel() {
  intervalId = setInterval(function () {
    if (showCarousel.value > imgs.value.length - 2) {
      showCarousel.value = -1;
    }
    showCarousel.value++;
  }, 5000);
}

startCarousel();

// 停止自動播放功能
function stopCarousel() {
  clearInterval(intervalId);
}
</script>

<template>
  <section>
    <div class="carouselSection">
      <button
        @mouseenter="stopCarousel"
        @mouseleave="startCarousel"
        @click="setShowCarousel(showCarousel - 1)"
        :disabled="buttonState"
        class="carouselLeft"
      >
        ⇦
      </button>
      <router-link to="/shop">
        <transition-group
          :name="transitionName"
          tag="div"
          class="carouselContainer"
        >
          <ul
            @mouseenter="stopCarousel"
            @mouseleave="startCarousel"
            class="page"
            v-for="(img, index) in imgs"
            :key="index"
            v-show="index == showCarousel"
          >
            <li><img class="pageImg" :src="img" /></li>
            <li><img class="pageImgPOA" :src="img" /></li>
          </ul>
        </transition-group>
      </router-link>
      <button
        @mouseenter="stopCarousel"
        @mouseleave="startCarousel"
        @click="setShowCarousel(showCarousel + 1)"
        :disabled="buttonState"
        class="carouselRight"
      >
        ⇨
      </button>
    </div>
    <div class="carouselOneToFiveContainer">
      <div class="carouselOneToFive">
        <button
          @mouseenter="stopCarousel"
          @mouseleave="startCarousel"
          @click="buttonDisabled(), (showCarousel = 0)"
          :disabled="buttonState"
        >
          ○
        </button>
        <button
          @mouseenter="stopCarousel"
          @mouseleave="startCarousel"
          @click="buttonDisabled(), (showCarousel = 1)"
          :disabled="buttonState"
        >
          ○
        </button>
        <button
          @mouseenter="stopCarousel"
          @mouseleave="startCarousel"
          @click="buttonDisabled(), (showCarousel = 2)"
          :disabled="buttonState"
        >
          ○
        </button>
        <button
          @mouseenter="stopCarousel"
          @mouseleave="startCarousel"
          @click="buttonDisabled(), (showCarousel = 3)"
          :disabled="buttonState"
        >
          ○
        </button>
        <button
          @mouseenter="stopCarousel"
          @mouseleave="startCarousel"
          @click="buttonDisabled(), (showCarousel = 4)"
          :disabled="buttonState"
        >
          ○
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  .carouselSection {
    height: 800px;
    width: 100vw;
    max-width: 100%;
    // background-color: #171717;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .carouselLeft {
      position: absolute;
      left: 10px;
      z-index: 11;
      padding: 25px;
      margin: 5px;
      color: #daa520;
      background-color: rgba(0, 0, 0, 0.642);
      border-radius: 30px;
    }

    .carouselRight {
      position: absolute;
      right: 10px;
      z-index: 11;
      padding: 25px;
      margin: 5px;
      color: #daa520;
      background-color: rgba(0, 0, 0, 0.642);
      border-radius: 30px;
    }

    .carouselContainer {
      position: relative;
      width: 100vw;
      height: 800px;
      // background-color: #daa520;
      overflow: hidden;

      .page {
        list-style: none;
        width: 100vw;
        height: 800px;

        li {
          .pageImg {
            width: 100%;
            height: 100%;
            z-index: 11;
          }

          .pageImgPOA {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 10;
            filter: blur(2px);
            transform: translate(0, -3%);
          }
        }
      }
    }
  }

  .carouselOneToFiveContainer {
    width: 100vw;
    max-width: 100%;
    padding: 0 0 30px 0;
    background-color: $yellowColor;
    display: flex;
    justify-content: center;
    .carouselOneToFive {
      // background-color: #171717;
      // position: absolute;
      z-index: 11;

      button {
        padding: 26px;
        margin: 5px;
        color: #daa520;
        background-color: rgba(0, 0, 0, 0.642);
        border-radius: 30px;
      }
    }
  }
}

@media only screen and (max-width: 700px) {
  section {
    .carouselSection {
      height: 400px;
      .carouselContainer {
        height: 400px;
        .page {
          height: 400px;
        }
      }
    }
  }
}

/* right--------------------------------------------------------------------------------- */

.listLeft-enter-active,
.listLeft-leave-active {
  transition: all 2s ease;
}

.listLeft-enter-from {
  transform: translateX(-100%);
}
.listLeft-leave-to {
  transform: translateX(100%);
}

.listLeft-leave-active,
.listLeft-enter-active {
  position: absolute;
}

/* right--------------------------------------------------------------------------------- */

.listRight-enter-active,
.listRight-leave-active {
  transition: all 2s ease;
}

.listRight-enter-from {
  transform: translateX(100%);
}
.listRight-leave-to {
  transform: translateX(-100%);
}

.listRight-leave-active,
.listRight-enter-active {
  position: absolute;
}
</style>
