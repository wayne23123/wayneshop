<script setup></script>

<template>
  <section>
    <div class="sectionTitle">
      <div class="">
        <div class="titleTextLarge"><div class="borB">FEATURE</div></div>
      </div>
    </div>
    <div class="bgcImgLayout">
      <img
        class="bgcImg"
        src="../assets/pictures/clark-street-qfilterjpg.jpg"
        alt=""
      />
    </div>
    <div class="divContainer">
      <div class="divLayout">
        <div class="divCard bgcOrange">
          <div class="divCardLeft">
            <div class="leftImgLayout">
              <img
                class="leftImg"
                src="../assets/pictures/freestocks.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="divCardRight">
            <div class="rightTitle">WSS 商城是什麼</div>
            <div class="rightText pTwo">
              Wayne's Shopping Spot
              是一家充滿活力和創意的網路商城，我們提供時尚的服飾、舒適的鞋子、時尚的帽子等多種產品。
            </div>
          </div>
        </div>
        <div class="divCard bgcGray">
          <div class="divCardRight">
            <div class="rightTitle">用戶體驗</div>
            <div class="rightText pTwo">
              Wayne's Shopping Spot 始終 將用戶體驗置於首位，不斷優
              化網站的功能和性能，讓顧客 在使用網站時感受更加舒適和 流暢。
            </div>
          </div>
          <div class="divCardLeft">
            <div class="leftImgLayout">
              <img class="leftImg" src="../assets/pictures/heidi.jpg" alt="" />
            </div>
          </div>
        </div>
        <div class="divCard bgcOrange">
          <div class="divCardLeft">
            <div class="leftImgLayout">
              <img
                class="leftImg"
                src="../assets/pictures/hannah-m.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="divCardRight">
            <div class="rightTitle">購物便利性</div>
            <div class="rightText pTwo">
              顧客可以 輕鬆地在 Wayne's Shopping Spot 網站上購物，
              隨時隨地進行線上購物，選擇 自己喜愛的產品，快速簡單地 下單。
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  width: 100vw;
  max-width: 100%;
  padding: 50px 0 0;
  background-color: #262626;

  .sectionTitle {
    width: 100vw;
    max-width: 100%;

    color: $yellowColor;
    display: flex;
    justify-content: center;
    .titleTextLarge {
      padding: 10px 0;
      font-size: 36px;
      font-weight: bold;
      color: $yellowColor;
      display: flex;
      justify-content: center;
    }

    .titleText {
      font-size: 30px;
      color: #171717;
      display: flex;
      justify-content: center;
    }
    .borB {
      border-bottom: 1px solid $yellowColor;
    }
  }

  .bgcImgLayout {
    width: 100vw;
    max-width: 100%;
    height: 1200px;
    position: absolute;
    z-index: 1;

    .bgcImg {
      width: 100%;

      height: 100%;
    }
  }

  .divContainer {
    display: flex;
    justify-content: center;
    padding: 50px 0;

    .divLayout {
      // width: 1000px;
      background-color: #333;
      padding: 30px 30px;
      // padding: 30px 0;
      border-radius: 30px;
      z-index: 50;

      .divCard {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px;

        margin-bottom: 30px;
        border-radius: 15px;

        .divCardLeft {
          .leftImgLayout {
            width: 400px;
            height: 300px;
            .leftImg {
              width: 100%;
              height: 100%;
            }
          }
        }
        .divCardRight {
          width: 400px;
          padding: 10px 50px;

          .rightTitle {
            display: flex;
            justify-content: center;
            color: #f3f6e0;
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .rightText {
            font-size: 24px;
            color: #f3f6e0;
          }
        }
      }
      .bgcOrange {
        background-color: #d69c2f;
      }

      .bgcGray {
        background-color: #272727;
      }

      .divCard:hover {
        transform: scale(1.1);
        transition: all 0.6s ease;
      }
    }
  }
}

@media only screen and (max-width: 700px) {
  section {
    .divContainer {
      .divLayout {
        padding: 30px 0;
        .divCard:hover {
          transform: none;
        }
      }
    }
  }
}
</style>
