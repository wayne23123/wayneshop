<script setup>
import { ref, computed } from "vue";
import { usePayStore } from "../stores/pay";
import { useAdminCartStore } from "../stores/admincart";
import { useCartStore } from "../stores/cart";

import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const cartStore = useCartStore();
const payStore = usePayStore();
const adminCartStore = useAdminCartStore();

// 使用 computed 計算購物車中的商品數量總和
const cartsTotalCounter = computed(() => {
  return payStore.pays.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    return acc + cur.counter;
  }, 0);
});

// 使用 computed 計算購物車中商品的價格總和
const cartsTotalPrice = computed(() => {
  return payStore.pays.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    // cur.counter * cur.price 表示當前商品的價格
    return acc + cur.counter * cur.price;
  }, 0);
});

const payCheckRef = ref(false);

// 展示付款成功;
function sendOrderFunction() {
  payStore.updateMultiplePayValues();
  payCheckRef.value = true;
  pushAdminCart();
  cartStore.clearCartFunction();
  let messageText = "付款成功!  感謝您的購買  您的訂單:\n";
  for (let pay of payStore.pays) {
    messageText += `商品名：${pay.title}，數量：${pay.counter} 個\n`;
  }

  proxy.$message({ text: messageText, type: "success" });
}

// 使用 JSON.stringify() 方法將 payStore.pays 轉換為字符串，再使用JSON.parse()方法將字符串轉換成一個新的陣列 paysCopy。
// 這樣就創建一個全新與原陣列無關的陣列
function pushAdminCart() {
  const paysCopy = JSON.parse(JSON.stringify(payStore.pays));
  adminCartStore.admincarts.push(...paysCopy);
}
</script>

<template>
  <section>
    <div class="sectionBuyProcess">
      <div class="buyProcessLayout">
        <div class="processDivOne">step1.確認購物清單</div>
        <div class="processDivTwo">step2.填寫購買資料</div>
        <div class="processDivThree">step3.付款去</div>
      </div>
    </div>
    <div class="sectionPay">
      <div class="payLayout">
        <div class="payCard">
          <table>
            <tr>
              <th></th>
              <th>品項</th>
              <th>尺寸</th>
              <th>數量</th>
              <th>單價</th>
            </tr>
            <tr v-for="pay in payStore.pays" :key="pay.key">
              <td><img :src="pay.img" alt="" width="40" height="40" /></td>
              <td>{{ pay.title }}</td>
              <td>{{ pay.size }}</td>
              <td>{{ pay.counter }}</td>
              <td v-if="payStore.pays[0].kupeng">
                <div class="noneText">{{ pay.price * pay.counter }}</div>
                <div class="yellowMarkPrice">
                  {{ Math.floor(pay.price * pay.counter * 0.7) }}
                </div>
              </td>
              <td v-else="payStore.pays[0].kupeng">
                <div>{{ pay.price * pay.counter }}</div>
              </td>
            </tr>
          </table>
          <div>
            <div v-show="payStore.pays[0].kupeng">
              <div class="useKupeng yellowMark">使用了優惠券!</div>
            </div>
            <div v-if="payStore.pays[0].kupeng">
              <div class="cartsTotalCounter">
                總共 {{ cartsTotalCounter }} 件商品

                <div>
                  <div class="noneText">原價 NT {{ cartsTotalPrice }} 元</div>
                  <div class="yellowMark">
                    特價 NT {{ Math.floor(cartsTotalPrice * 0.7) }} 元
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="cartsTotal">
                <div>總共 {{ cartsTotalCounter }} 件商品</div>
                <div>總共 NT {{ cartsTotalPrice }} 元</div>
              </div>
            </div>
          </div>

          <div v-for="(pay, index) in payStore.pays" :key="index">
            <div v-if="index === 0" class="formPadding">
              <span class="bgcTitle"> Email: </span>
              <span class="padL20"> {{ pay.email }} </span>
            </div>
            <div v-if="index === 0" class="formPadding">
              <span class="bgcTitle"> 姓名: </span
              ><span class="padL20"> {{ pay.name }} </span>
            </div>
            <div v-if="index === 0" class="formPadding">
              <span class="bgcTitle"> 收件人電話: </span
              ><span class="padL20"> {{ pay.telphone }}</span>
            </div>
            <div v-if="index === 0" class="formPadding">
              <span class="bgcTitle"> 收件人地址: </span
              ><span class="padL20"> {{ pay.adress }} </span>
            </div>
            <div v-if="index === 0" class="formPadding payCheck">
              <span class="bgcTitle"> 付款狀態: </span>
              <div v-if="payCheckRef" class="padL20">付款成功,感謝您的購買</div>
              <div v-else class="padL20">尚未付款</div>
            </div>
            <br />
          </div>
          <div v-if="payCheckRef">
            <router-link to="/shop">回到商城繼續逛逛</router-link>
          </div>
          <div v-else class="goShop">
            <router-link to="/form">上一步</router-link>
            <button @click="sendOrderFunction" class="a">送出訂單</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/var.scss";
// $yellowColor
// $darkYellowColor
// $grayColor
// $darkGrayColor

section {
  .sectionBuyProcess {
    padding: 20px 0;
    width: 100vw;
    max-width: 100%;
    background-color: $yellowColor;
    display: flex;
    justify-content: center;

    .buyProcessLayout {
      width: 70vw;
      background-color: #daa520;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .processDivOne {
        width: 200px;
        height: 100px;
        margin: 10px;
        color: black;
        background-color: #ddd;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .processDivTwo {
        width: 200px;
        height: 100px;
        margin: 10px;

        color: black;
        background-color: #ddd;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .processDivThree {
        width: 200px;
        height: 100px;
        margin: 10px;
        color: rgb(200, 200, 200);
        background-color: rgb(0, 0, 0);
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .sectionPay {
    width: 100vw;
    max-width: 100%;
    padding: 0 0 50px 0;

    background-color: #000;
    display: flex;
    justify-content: center;
    background-image: url("../assets/svgs/stacked-waves-2.svg");
    background-repeat: no-repeat;
    background-size: cover;

    .payLayout {
      width: 500px;

      .payCard {
        background-color: $grayColor;
        color: black;
        padding: 50px;
        border-radius: 15px;

        table {
          tr {
            td {
              border-top: solid 1px gray;
              border-bottom: solid 1px gray;

              padding: 15px;

              .useKupeng {
                margin: 10px;
              }

              .yellowMarkPrice {
                background-color: #daa520;
              }

              .yellowMark {
                background-color: #daa520;
                width: 130px;
              }
            }
          }
        }

        .useKupeng {
          margin: 10px;
        }

        .yellowMarkPrice {
          background-color: #daa520;
        }

        .yellowMark {
          background-color: #daa520;
          width: 130px;
        }

        .cartsTotalCounter {
          margin: 10px;
          display: flex;
          justify-content: space-between;

          .noneText {
            text-decoration: line-through;
          }
        }

        .cartsTotal {
          padding: 10px;
          display: flex;
          justify-content: space-between;
        }
      }

      .formPadding {
        padding: 10px;

        .bgcTitle {
          padding: 0 15px;
          border-radius: 15px;
          background-color: #c4b9b9;
          border-bottom: 2px #565656 solid;
        }

        .padL20 {
          padding-left: 20px;
        }
      }
      .payCheck {
        display: flex;
      }

      a {
        background-color: #daa520;
        margin: 15px;
        padding: 10px;
      }

      .a {
        background-color: #daa520;
        margin: 15px;
        padding: 10px;
      }

      a:hover {
        color: rgb(0, 144, 0);
        background-color: #fabd21;
      }

      .a:hover {
        color: rgb(0, 144, 0);
        background-color: #fabd21;
      }

      .goShop {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
