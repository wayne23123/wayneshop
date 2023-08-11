<script setup>
import { ref } from "vue";
import { useSteponeStore } from "../stores/stepone";
import { usePayStore } from "../stores/pay";
import { useRouter } from "vue-router";

const steponeStore = useSteponeStore();
const payStore = usePayStore();

const inputEmailRef = ref("");

function inputEmail(e) {
  inputEmailRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 email 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].email = inputEmailRef.value;
  }
}

const inputNameRef = ref("");

function inputName(e) {
  inputNameRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 name 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].name = inputNameRef.value;
  }
}

const inputTelphoneRef = ref("");

function inputTelphone(e) {
  inputTelphoneRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 telphone 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].telphone = inputTelphoneRef.value;
  }
}

const inputinputAdressRef = ref("");

function inputinputAdress(e) {
  inputinputAdressRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 adress 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].adress = inputinputAdressRef.value;
  }
}

function inputinputMessage(e) {
  const value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 message 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].message = value;
  }
}

let d = new Date();
let year = d.getUTCFullYear();
let month = d.getMonth() + 1;
let date = d.getDate();
let hours = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();

let yearStr = String(year).padStart(4, "0"); // 將年份轉成 4 位數字，不足補零
let monthStr = String(month).padStart(2, "0"); // 將月份轉成 2 位數字，不足補零
let dateStr = String(date).padStart(2, "0"); // 將日期轉成 2 位數字，不足補零
let hoursStr = String(hours).padStart(2, "0"); // 將小時轉成 2 位數字，不足補零
let minutesStr = String(minutes).padStart(2, "0"); // 將分鐘轉成 2 位數字，不足補零
let secondsStr = String(seconds).padStart(2, "0"); // 將秒數轉成 2 位數字，不足補零
// let counterStr = String(counter).padStart(3, "0"); // 將計數器轉成 3 位數字，不足補零
// let counterStr = String(counter).padStart(3, "0");

function setArrayTime() {
  // 用 for 迴圈把抓到 date 的值寫進 stepones 裡面每一筆資料的 date 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].d = d;
    steponeStore.stepones[i].year = year;
    steponeStore.stepones[i].month = month;
    steponeStore.stepones[i].date = date;
    steponeStore.stepones[i].hours = hours;
    steponeStore.stepones[i].minutes = minutes;
    steponeStore.stepones[i].seconds = seconds;
    steponeStore.stepones[i].order =
      monthStr +
      dateStr +
      hoursStr +
      minutesStr +
      secondsStr +
      String(steponeStore.counters).padStart(3, "0");
  }
  steponeStore.counters++;
}

// 此函數檢查 email 格式是否正確
function checkEmailFormat(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const router = useRouter();
// 當滑鼠移入付款去時 先將 pays 清空後把 stepones 的資料全部堆進 pays
function pushPayFunction() {
  if (inputNameRef.value === "") {
    ElMessage({
      type: "warning",
      message: "請輸入姓名",
    });
    return;
  }

  if (inputTelphoneRef.value === "") {
    ElMessage({
      type: "warning",
      message: "請輸入電話",
    });
    return;
  } else if (inputTelphoneRef.value == " ") {
    ElMessage.warning("電話號碼不能為空！");
    return;
  } else if (inputTelphoneRef.value < 111111111) {
    ElMessage.warning("電話號碼格式錯誤！");
    return;
  } else if (inputTelphoneRef.value > 999999999) {
    ElMessage.warning("電話號碼格式錯誤！");
    return;
  }

  if (!checkEmailFormat(inputEmailRef.value)) {
    ElMessage({
      type: "warning",
      message: "請確認Email格式",
    });
    return;
  }

  if (inputinputAdressRef.value === "") {
    ElMessage({
      type: "warning",
      message: "請輸入地址",
    });
    return;
  }
  // 設定時間陣列
  setArrayTime();
  // 清空 pays 數組
  payStore.pays.splice(0);
  // 將 stepones 陣列的所有元素推送到 pays 數組中
  payStore.pays.push(...steponeStore.stepones);
  router.replace({ path: "/pay" });
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
    <div class="sectionCart">
      <div class="formLayout">
        <div class="formWidth">
          <br />

          <div class="formTitle"><span class="bgcTitle">姓名:</span></div>
          <input
            @input="inputName"
            placeholder="請輸入姓名..."
            type="text"
            class="formMargin"
          />

          <div class="formTitle"><span class="bgcTitle">電話:</span></div>
          <input
            @input="inputTelphone"
            placeholder="請輸入電話..."
            type="number"
            class="formMargin"
          />

          <div class="formTitle"><span class="bgcTitle">email:</span></div>
          <input
            @input="inputEmail"
            placeholder="請輸入email..."
            type="email"
            class="formMargin"
          />

          <div class="formTitle"><span class="bgcTitle">地址:</span></div>
          <input
            @input="inputinputAdress"
            placeholder="請輸入地址..."
            type="text"
            class="formMargin"
          />
          <div class="formTitle"><span class="bgcTitle">備註:</span></div>
          <textarea
            @input="inputinputMessage"
            placeholder="有什麼想說的嗎..."
            cols="30"
            rows="10"
            class="formMargin"
          ></textarea>
          <div class="formButtonLayout">
            <router-link to="/cart" class="goCart">上一步</router-link>
            <div @click="pushPayFunction" class="goPay">付款去</div>
          </div>

          <div v-show="sectionDebugRef">{{ payStore.pays }}</div>
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
      background-color: $yellowColor;
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

        color: rgb(200, 200, 200);
        background-color: rgb(0, 0, 0);
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .processDivThree {
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
    }
  }

  .sectionCart {
    padding: 0 0 50px 0;
    width: 100vw;
    max-width: 100%;
    background-color: #000;
    display: flex;
    justify-content: center;
    background-image: url("../assets/svgs/stacked-waves-2.svg");
    background-repeat: no-repeat;
    background-size: 100% auto;

    .formLayout {
      padding: 20px 50px;
      background-color: $grayColor;
      color: black;
      display: flex;
      justify-content: center;
      border-radius: 15px;

      .formWidth {
        width: 400px;
        .formTitle {
          padding-left: 15px;

          .bgcTitle {
            padding: 10px 15px;
            border-radius: 15px;
            background-color: #c4b9b9;
          }
        }

        input {
          width: 100%;
          height: 40px;
          background-color: #fff7f7;
          border-radius: 10px;
        }
        textarea {
          background-color: #fff7f7;
          border-radius: 10px;
          width: 100%;
        }

        .formMargin {
          margin: 15px;
        }

        .formButtonLayout {
          display: flex;
          justify-content: space-between;

          a {
            background-color: #daa520;
            margin: 15px;
            padding: 10px;
          }

          a:hover {
            color: rgb(0, 144, 0);
            background-color: #fabd21;
          }

          .goPay {
            background-color: #daa520;
            margin: 15px;
            padding: 10px;
            cursor: pointer;
          }

          .goPay:hover {
            color: rgb(0, 144, 0);
            background-color: #fabd21;
          }
        }
      }
    }
  }
}
</style>
