<script setup>
import { ref } from "vue";
import { useScroll } from "@vueuse/core";
// 解構賦值
const { y } = useScroll(window);

const showAboutOneRef = ref(false);

window.addEventListener("scroll", function () {
  // 當 scrollY大於0 則 showAboutOneRef 為 true
  showAboutOneRef.value = window.scrollY > 0;
});

const showAboutTwoRef = ref(false);

window.addEventListener("scroll", function () {
  // 當 scrollY大於250 則 showAboutTwoRef 為 true
  showAboutTwoRef.value = window.scrollY > 250;
});

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
  <div class="bgcIMG" :class="{ show: y >= 100 }">
    <img class="bgcIMGClass" src="../assets/pictures/carl-r.jpg" alt="" />
  </div>
  <section>
    <div class="sectionHolder"></div>
    <div class="titleLayout">
      <div class="title" :class="{ titleShow: y > 120 }">
        <h2 class="corDaa">關於我們</h2>
      </div>
    </div>
    <div class="sectionHolderSmall"></div>
    <div class="twoCardSection">
      <div class="twoCardLayout">
        <div class="cardLeft">
          <div class="cardLeftText" :class="{ cardLeftTextShow: y > 220 }">
            <div class="disCen">
              <h2 class="corB">Wayne's Shopping Spot</h2>
            </div>
            <p class="pTwo">
              是一家充滿活力和創意的網路商城，我們提供時尚的服飾、舒適的鞋子、時尚的帽子等多種產品。我們的目標是為客戶提供最好的購物體驗，讓他們感到舒適和自信。
            </p>
            <p class="pTwo">
              我們相信每個人都有自己的風格和品味，我們的產品提供多種不同風格和款式，讓每個客戶都能找到最適合自己的產品。我們堅信，時尚應該是讓人們感到自在和自信的，這也是我們產品的核心價值。"
            </p>
          </div>
        </div>
        <div class="imgRightLayout" :class="{ imgRightLayoutShow: y > 220 }">
          <img class="imgRight" src="../assets/pictures/openAlert.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="sectionHolderSmall"></div>
    <div class="titleLayout">
      <div class="title" :class="{ titleShow: y > 450 }">
        <h2 class="corDaa">更好的服務</h2>
      </div>
    </div>
    <div class="twoCardSection">
      <div class="twoCardLayout">
        <div class="imgRightLayout" :class="{ imgRightLayoutShow: y > 750 }">
          <img
            class="imgRight"
            src="../assets/pictures/clark-street-q.jpg"
            alt=""
          />
        </div>
        <div class="cardLeft">
          <div class="cardLeftText" :class="{ cardLeftTextShow: y > 750 }">
            <div class="disCen">
              <h2 class="corB">Wayne's Shopping Spot</h2>
            </div>
            <p class="pTwo">
              我們的產品設計風格多樣化，從經典風格到潮流時尚，滿足客戶不同的需求。我們的產品質量優良，我們也提供快速而可靠的配送服務，讓您購物更加方便、快捷。
            </p>
            <p class="pTwo">
              我們將購物視為一種探索和發現的過程，我們的產品設計充滿驚喜和美感，帶給客戶不斷的驚喜和樂趣。我們不斷進行研究和改進，以滿足客戶不斷變化的需求。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="sectionHolderSmall"></div>
  </section>

  <transition name="fade" tag="div" v-show="showAboutOneRef">
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
// $yellowColor;

.bgcIMG {
  position: absolute;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  z-index: 1;

  .bgcIMGClass {
    width: 100%;
    height: 100%;
  }
}

.show {
  position: fixed;
  top: 0;
  transition: all 0.3s linear;
}

section {
  width: 100vw;
  max-width: 100%;

  .sectionHolder {
    height: 270px;
    width: 100vw;
    max-width: 100%;
  }

  .titleLayout {
    width: 100vw;
    max-width: 100%;
    display: flex;
    justify-content: center;

    .title {
      background-color: #000000ac;

      z-index: 10;
      padding: 20px;
      opacity: 0;
      border-radius: 30px;

      .corDaa {
        color: $yellowColor;
      }
    }

    .titleShow {
      opacity: 1;
      transition: all 0.7s ease;
    }
  }

  .sectionHolderSmall {
    height: 50px;
    width: 100vw;
    max-width: 100%;
  }

  .twoCardSection {
    width: 100vw;
    max-width: 100%;

    .twoCardLayout {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .cardLeft {
        width: 45vw;
        color: #c4c4c4;
        padding: 40px;
        z-index: 10;

        .cardLeftText {
          background-color: $yellowColor;
          padding: 10px;
          border-radius: 15px;
          opacity: 0;
          transform: translateY(100%);

          h2 {
            color: black;
            border-bottom: 2px solid #c4c4c4;
          }

          p {
            font-size: 18px;
            color: #222;
            padding: 20px 10px;
          }
        }

        .cardLeftTextShow {
          opacity: 1;
          transform: none;
          transition: all 0.6s ease;
        }
      }

      .imgRightLayout {
        width: 45vw;
        z-index: 10;
        padding-top: 40px;
        opacity: 0;

        .imgRight {
          width: 100%;
          height: auto;
          border-radius: 30px;
        }
      }

      .imgRightLayoutShow {
        opacity: 1;
        transition: all 1s ease;
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

@media screen and (max-width: 700px) {
  .cardLeft {
    width: 500px;
  }
}
</style>
