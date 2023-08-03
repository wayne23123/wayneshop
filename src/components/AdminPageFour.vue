<script setup>
import { ref, computed } from "vue";
import { useProductionStore } from "../stores/production";

const productionStore = useProductionStore();

const newTitle = ref("商品名稱");
const newPrice = ref("價格");
const newStar = ref("★★★★★");
const newStars = ref("");
const newCategory = ref("hat");
const newDescription = ref("");

// inputTitle 的值發生改變時觸發此函式，將新的值指定給 newTitle
function inputTitle(e) {
  newTitle.value = e.target.value;
}

// inputPrice 的值發生改變時觸發此函式，將新的值指定給 newPrice
function inputPrice(e) {
  newPrice.value = e.target.value;
}

// inputStars 的值發生改變時觸發此函式，將新的值指定給 newStars
function inputStars(e) {
  newStars.value = e.target.value;
  // 根據 newStars 的值改變 newStar 的值
  if (newStars.value == 1) {
    newStar.value = "★";
  } else if (newStars.value == 2) {
    newStar.value = "★★";
  } else if (newStars.value == 3) {
    newStar.value = "★★★";
  } else if (newStars.value == 4) {
    newStar.value = "★★★★";
  } else if (newStars.value == 5) {
    newStar.value = "★★★★★";
  }
}

// inputCategory 的值發生改變時觸發此函式，將新的值指定給 newCategory
function inputCategory(e) {
  newCategory.value = e.target.value;
}

// inputDescription 的值發生改變時觸發此函式，將新的值指定給 newDescription
function inputDescription(e) {
  newDescription.value = e.target.value;
}

// 用於顯示上傳圖片的預覽
const imageUrl = ref("");
const onFileChange = (event) => {
  const file = event.target.files[0];
  // 取得選取的檔案
  const reader = new FileReader();
  // 建立一個FileReader物件
  // 當讀取圖片完成後執行以下程式碼
  reader.onload = () => {
    // 將選取的圖片轉換成Base64編碼格式，並存入imageUrl的value中
    imageUrl.value = reader.result; // 將選取的圖片轉換成Base64編碼格式
  };
  reader.readAsDataURL(file);
};

const timeIdRef = ref("");

function setTimeId() {
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

  timeIdRef.value =
    yearStr + monthStr + dateStr + hoursStr + minutesStr + secondsStr;
}

const newProductionRef = ref([
  {
    id: timeIdRef,
    order: "",
    img: imageUrl,
    title: newTitle,
    category: newCategory,
    star: newStar,
    stars: newStars,
    price: newPrice,
    description: newDescription,
    color: "orange",
    label: "Other",
    counter: 1,
    size: "M",
    kupeng: false,
    email: "",
    name: "",
    telphone: "",
    adress: "",
    message: "",
    d: "",
    year: "",
    month: "",
    date: "",
    hours: "",
    minutes: "",
    seconds: "",
    pay: false,
    complete: false,
  },
]);

// 使用push將複製的copyRef推進demoStore裡面的semos;
// 使用 JSON.stringify() 方法將 payStore.pays 轉換為字符串，再使用JSON.parse()方法將字符串轉換成一個新的陣列 paysCopy。
// 這樣就創建一個全新與原陣列無關的陣列
function addProductionsFunction() {
  const newProduction = JSON.parse(JSON.stringify(newProductionRef.value));
  productionStore.productions.push(...newProduction);
  alert("上架成功 !");
}
</script>

<template>
  {{ test }}
  <div class="pageFourLayOut">
    <form @submit.prevent="addProductionsFunction" class="newCard">
      <div>
        <label>商品名稱:</label>
        <input
          @input="inputTitle"
          type="text"
          placeholder="請輸入商品名稱..."
          maxlength="32"
          required
        />
      </div>
      <br />
      <div>
        <label>商品價格:</label>
        <input
          @input="inputPrice"
          type="number"
          placeholder="請輸入商品價格..."
          min="1"
          max="99999999999"
          maxlength="11"
          required
        />
      </div>
      <br />
      <div>
        <label>商品星數:</label>
        <label for="starOne">1</label>

        <input
          id="starOne"
          type="radio"
          name="stars"
          @input="inputStars"
          value="1"
          class="inputRadio"
        />
        <label for="starTwo">2</label>
        <input
          id="starTwo"
          type="radio"
          name="stars"
          @input="inputStars"
          value="2"
          class="inputRadio"
        />
        <label for="starThree">3</label>
        <input
          id="starThree"
          type="radio"
          name="stars"
          @input="inputStars"
          value="3"
          class="inputRadio"
        />

        <label for="starFour">4</label>
        <input
          id="starFour"
          type="radio"
          name="stars"
          @input="inputStars"
          value="4"
          class="inputRadio"
        />

        <label for="starFive">5</label>
        <input
          CHECKED
          id="starFive"
          type="radio"
          name="stars"
          @input="inputStars"
          value="5"
          class="inputRadio"
        />
      </div>
      <br />
      <div>
        <label>商品種類:</label>
        <label for="categoryHat">hat</label>
        <input
          checked
          id="categoryHat"
          type="radio"
          name="category"
          @input="inputCategory"
          value="hat"
          class="inputRadio"
        />

        <label for="categoryClothes"> clothes</label>
        <input
          id="categoryClothes"
          type="radio"
          name="category"
          @input="inputCategory"
          value="clothes"
          class="inputRadio"
        />

        <label for="categoryPants"> pants</label>
        <input
          id="categoryPants"
          type="radio"
          name="category"
          @input="inputCategory"
          value="pants"
          class="inputRadio"
        />

        <label for="categoryShoes"> shoes</label>
        <input
          id="categoryShoes"
          type="radio"
          name="category"
          @input="inputCategory"
          value="shoes"
          class="inputRadio"
        />
      </div>
      <br />
      <div class="inputDescription">
        <label>商品敘述: </label>
        <textarea
          @input="inputDescription"
          placeholder="請輸入商品敘述..."
          cols="22"
          rows="5"
          required
        ></textarea>
      </div>

      <br />

      <div>
        上傳圖片<input class="inputImg" type="file" @change="onFileChange" />
      </div>
      <br />
      <button @mouseenter="setTimeId" type="submit">上架新商品</button>
    </form>
    <div class="copyCard">
      <div class="shopCard">
        <div class="cardImg">
          <img class="imgSize" v-if="imageUrl" :src="imageUrl" alt="preview" />
          <img class="imgPOR" v-if="imageUrl" :src="imageUrl" alt="preview" />
        </div>
        <div class="cardCart">
          <select name="sizeRef">
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="S">S</option>
          </select>
          <select name="amount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button class="cardCartButton">
            <div class="buttonText">🛒</div>
          </button>
        </div>
        <div class="cardLeft">
          <div class="cardTitle">{{ newTitle }}</div>
          <div class="cardCategory">種類: {{ newCategory }}</div>
          <div class="cardStar">{{ newStar }}</div>
          <div class="cardPrice">NT {{ newPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pageFourLayOut {
  width: 100vw;
  max-width: 100%;
  background-color: #565656;
  padding: 13px;
  display: flex;
  flex-wrap: wrap;
}

.newCard {
  width: 350px;
  background-color: #c4c4c4;
  padding: 15px;
  color: black;
  border-radius: 15px;
  left: 10px;
}

label {
  margin-left: 3px;
  margin-right: 3px;
}

.inputRadio {
  width: 15px;
  height: 15px;
}

img {
  width: 200px;
  height: 100px;
}

.inputDescription {
  display: flex;
}

.inputImg {
  width: 100px;
  background-color: #c4c4c4;
  border: none;
}

button {
  padding: 15px;
}

form input[type="number"] {
  width: 227px;
}
form input::-webkit-outer-spin-button,
form input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
form input[type="number"] {
  -moz-appearance: textfield;
}

/* V card--------------------------------------------------------------------------- */
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
}

.cardImg {
  position: relative;
  width: 230px;
  height: 230px;
  top: 15px;
  background-color: black;
  overflow: hidden;
}

.imgSize {
  width: 100%;
  height: auto;
  z-index: 11;
}

.imgPOR {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
  filter: blur(5px);
  transform: translate(0, -50%);
}

.imgSize:hover {
  transform: scale(1.2);
  transition: all 0.5s ease;
}

.cardCart {
  position: relative;
  bottom: -95px;
  left: 115px;
  z-index: 50;
}

.cardCartButton {
  position: relative;
  bottom: 10px;
  background-color: rgba(255, 0, 0, 0.772);
  padding: 18px;
  border-radius: 50%;
}

.cardCartButton:hover {
  background-color: rgba(255, 0, 0, 1);
}

.buttonText {
  position: absolute;
  right: 9px;
  bottom: 9px;
  pointer-events: none;
}

.cardTitle {
  color: black;
}
.cardLeft {
  position: relative;
  bottom: 15px;
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
</style>
