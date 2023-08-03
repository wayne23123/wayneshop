<script setup>
import { ref, computed } from "vue";
import { useProductionStore } from "../stores/production";

const productionStore = useProductionStore();

// 這個 showDetailRef 用來顯示訂單 detail
const showDetailRef = ref({});
// 定義一個名為 showDetailFunction 的函式，傳入 id 參數
function showDetailFunction(id) {
  // 使用 Vue 的 $set 方法，將 showDetailRef 中 order 對應的值設為相反的 boolean 值
  showDetailRef.value[id] = !showDetailRef.value[id];
}

// 這個 showDeleteDivRef 用來顯示 移除商品的文字方塊
const showDeleteDivRef = ref({});
// 滑鼠移入商品圖片時,顯示 移除商品 移除商品的文字方塊
function showDeleteDivFunction(id) {
  showDeleteDivRef.value[id] = !showDeleteDivRef.value[id];
}

// 滑鼠移出卡片時,清空所有編輯,並收起卡片
function closeFunction() {
  showDetailRef.value = {};
  showDeleteDivRef.value = {};
  productionStore.titleEditRef = "";
  productionStore.categoryEditRef = "";
  productionStore.starsEditRef = "";
  productionStore.priceEditRef = "";
  productionStore.titleEditDone = false;
  productionStore.categoryEditDone = false;
  productionStore.starsEditDone = false;
  productionStore.priceEditDone = false;
}
</script>

<template>
  <div class="pageFiveLayOut">
    <div
      class="shopCard"
      v-for="production in productionStore.searchedProductionTitle"
      :id="production.id"
      @mouseleave="closeFunction"
    >
      <div
        @mouseenter="showDeleteDivFunction(production.id)"
        @mouseleave="showDeleteDivFunction(production.id)"
        class="cardImg"
      >
        <button @click="productionStore.deleteProductFunction(production.id)">
          <div
            v-if="showDeleteDivRef[production.id]"
            class="categoryDivOneText"
          >
            <h1>移除商品</h1>
            <h1 class="red">✖</h1>
          </div>
          <img class="imgSize" :src="production.img" />
          <img class="imgPOR" :src="production.img" />
        </button>
      </div>
      <div class="cardCart">
        <button
          @click="showDetailFunction(production.id)"
          class="cardCartButton"
        >
          <div v-if="showDetailRef[production.id]" class="buttonText">完成</div>
          <div v-else="showDetailRef[production.id]" class="buttonText">
            編輯
          </div>
        </button>
      </div>

      <div v-if="showDetailRef[production.id]" class="cardLeft">
        <div class="flex">
          標題:<input
            v-model="productionStore.titleEditRef"
            class="inputText"
            type="text"
            maxlength="32"
          />
          <button @click="productionStore.titleEditFunction(production.id)">
            <div v-if="productionStore.titleEditDone" class="green">完成☑</div>
            <div v-else="productionStore.titleEditDone">更改☐</div>
          </button>
        </div>
        <div class="flex">
          種類:
          <select
            name="category"
            v-model="productionStore.categoryEditRef"
            class="inputText"
          >
            <option value="hat">hat</option>
            <option value="clothes">clothes</option>
            <option value="pants">pants</option>
            <option value="shoes">shoes</option>
          </select>
          <button @click="productionStore.categoryEditFunction(production.id)">
            <div v-if="productionStore.categoryEditDone" class="green">
              完成☑
            </div>
            <div v-else="productionStore.categoryEditDone">更改☐</div>
          </button>
        </div>

        <div class="flex">
          星數:

          <label for="starOne">1</label>
          <input
            id="starOne"
            type="radio"
            name="stars"
            v-model="productionStore.starsEditRef"
            value="1"
            class="inputRadio"
          />
          <label for="starTwo">2</label>
          <input
            id="starTwo"
            type="radio"
            name="stars"
            v-model="productionStore.starsEditRef"
            value="2"
            class="inputRadio"
          />
          <label for="starThree">3</label>
          <input
            id="starThree"
            type="radio"
            name="stars"
            v-model="productionStore.starsEditRef"
            value="3"
            class="inputRadio"
          />

          <label for="starFour">4</label>
          <input
            id="starFour"
            type="radio"
            name="stars"
            v-model="productionStore.starsEditRef"
            value="4"
            class="inputRadio"
          />

          <label for="starFive">5</label>
          <input
            checked
            id="starFive"
            type="radio"
            name="stars"
            v-model="productionStore.starsEditRef"
            value="5"
            class="inputRadio"
          />

          <button @click="productionStore.starsEditFunction(production.id)">
            <div v-if="productionStore.starsEditDone" class="green">完成☑</div>
            <div v-else="productionStore.starsEditDone">更改☐</div>
          </button>
        </div>
        <div class="flex">
          價格:<input
            v-model="productionStore.priceEditRef"
            class="inputText"
            type="text"
            min="1"
            max="99999999999"
            maxlength="11"
          />
          <button @click="productionStore.priceEditFunction(production.id)">
            <div v-if="productionStore.priceEditDone" class="green">完成☑</div>
            <div v-else="productionStore.priceEditDone">更改☐</div>
          </button>
        </div>
      </div>
      <div v-else="showDetailRef[production.id]" class="cardLeft">
        <div class="cardTitle">
          {{ production.title }}
        </div>
        <div class="cardCategory">種類: {{ production.category }}</div>
        <div class="cardStar">{{ production.star }}</div>
        <div class="cardPrice">NT {{ production.price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: #ddd;
}

button:hover {
  background-color: #565656;
  color: #fff;
}
.flex {
  display: flex;
}
.inputText {
  width: 126.5px;
  height: 24px;
}

.pageFiveLayOut {
  width: 100vw;
  max-width: 100%;
  background-color: #565656;
  padding: 13px;
  display: flex;
  flex-wrap: wrap;
}

.inputRadio {
  margin-right: 4px;
  cursor: pointer;
}

.red {
  color: red;
}

.green {
  background-color: green;
  color: white;
  padding: 3px 0 3px 0;
}

/* V card--------------------------------------------------------------------------- */
.shopCard {
  display: flex;
  flex-direction: column;
  margin: 1px;
  padding: 0 10px;
  border-radius: 15px;
  background-color: gray;
  height: 350px;
  width: 15vw;
  min-width: 250px;
  overflow: hidden;
  transform: scale(1);
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

.cardCart {
  position: relative;
  bottom: -95px;
  left: 200px;
  z-index: 50;
}

.cardCartButton {
  position: relative;
  bottom: 10px;
  background-color: rgba(255, 0, 0, 0.772);
  padding: 18px;
  border-radius: 50%;
}

.buttonText {
  position: absolute;
  right: 5px;
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

.categoryDivOneText {
  position: absolute;
  height: 218px;
  width: 232px;
  background-color: #00000056;
  z-index: 500;
}

h1 {
  color: #fff;
}
</style>
