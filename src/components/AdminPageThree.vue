<script setup>
import { ref, computed } from "vue";
import { useAdminCartStore } from "../stores/admincart";

const adminCartStore = useAdminCartStore();

// 呼叫 orderDoneFunction，從 Vuex store 中取得訂單
adminCartStore.orderFunction;

// 定義一個名為 completeTrue 的函式，傳入 orderId 參數
function completeTrue(orderId) {
  // 使用 forEach 迴圈，針對每筆訂單檢查是否符合 orderId
  adminCartStore.admincarts.forEach((order) => {
    if (order.order === orderId) {
      // 如果符合，則將 complete 設為 true
      order.complete = true;
    }
  });
}

// 定義一個名為 completeFalse 的函式，傳入 orderId 參數
function completeFalse(orderId) {
  adminCartStore.admincarts.forEach((order) => {
    if (order.order === orderId) {
      order.complete = false;
    }
  });
}

// 這個 showDetailRef 用來顯示訂單 detail
const showDetailRef = ref({});

// 定義一個名為 showDetailFunction 的函式，傳入 order 參數
function showDetailFunction(order) {
  // 使用 Vue 的 $set 方法，將 showDetailRef 中 order 對應的值設為相反的 boolean 值
  showDetailRef.value[order] = !showDetailRef.value[order];
}

// 這個函式用來關閉訂單 detail
function closeFunction() {
  showDetailRef.value = {};
}
</script>

<template>
  <div class="pageOneLayOut">
    <div class="inputOne">
      <label for="inputOneID">搜尋訂單編號: </label>
      <input
        id="inputOneID"
        type="text"
        placeholder="請輸入訂單號碼..."
        v-model="adminCartStore.orderDoneSearchTermRef"
      />
      <button @click="closeFunction" class="inputOneButton">搜尋</button>
    </div>
    <div
      v-if="adminCartStore.orderDoneSearchTermRef.length < 1"
      class="dataButton"
    >
      <div @click="adminCartStore.reverseOrderDoneRefs" class="dataButtonOrder">
        訂單編號▼
      </div>
      <div class="dataButtonName">姓名</div>
      <div class="dataButtonDate">日期</div>
      <div class="dataButtonKupeng">優惠券</div>
      <div class="dataButtonCounter">總件數</div>
      <div class="dataButtonPrice">總共價格</div>
      <div class="dataButtonState">訂單狀態</div>
      <div class="dataButtonD">✓</div>
      <div class="dataButtonU">✕</div>
    </div>

    <div class="dataLayout">
      <div
        v-for="(cartItems, order) in adminCartStore.orderDoneSearchTermFunction"
        :key="order"
        class="cardLayout"
      >
        <div
          v-if="adminCartStore.orderDoneSearchTermRef.length < 1"
          class="cardTitle"
        >
          <div
            class="cardTitleOrder pointer"
            @click="showDetailFunction(order)"
          >
            {{ cartItems[0].order }}
          </div>
          <div class="cardTitleName pointer" @click="showDetailFunction(order)">
            {{ cartItems[0].name }}
          </div>
          <div class="cardTitleDate pointer" @click="showDetailFunction(order)">
            {{ cartItems[0].year }}年{{ cartItems[0].month }}月{{
              cartItems[0].date
            }}日{{ cartItems[0].hours }}點{{ cartItems[0].minutes }}分
          </div>
          <div
            class="pointer"
            v-if="cartItems[0].kupeng"
            @click="showDetailFunction(order)"
          >
            使用優惠券
          </div>
          <div
            class="pointer"
            v-else="cartItems[0].kupeng"
            @click="showDetailFunction(order)"
          >
            沒用優惠券
          </div>
          <div
            class="cardTitleCounter pointer"
            @click="showDetailFunction(order)"
          >
            買了
            {{ cartItems.reduce((acc, cur) => acc + cur.counter, 0) }} 件物品
          </div>
          <div
            class="cardTitlePrice pointer"
            v-if="cartItems[0].kupeng"
            @click="showDetailFunction(order)"
          >
            總金額: NT$
            {{
              cartItems.reduce(
                (acc, cur) => acc + cur.price * cur.counter * 0.7,
                0
              )
            }}
          </div>
          <div
            class="cardTitlePrice pointer"
            v-else="cartItems[0].kupeng"
            @click="showDetailFunction(order)"
          >
            總金額: NT$
            {{
              cartItems.reduce((acc, cur) => acc + cur.price * cur.counter, 0)
            }}
          </div>
          <div
            class="green pointer"
            v-if="cartItems[0].complete"
            @click="showDetailFunction(order)"
          >
            訂單已經完成
          </div>
          <div
            class="red pointer"
            v-else="cartItems[0].complete"
            @click="showDetailFunction(order)"
          >
            訂單尚未完成
          </div>
          <button @click="completeTrue(cartItems[0].order)">完成訂單 ✓</button>
          <button @click="completeFalse(cartItems[0].order)">
            未完成訂單 ✕
          </button>
        </div>

        <table v-if="showDetailRef[order]">
          <tr
            v-if="adminCartStore.orderDoneSearchTermRef.length < 1"
            v-for="cartItem in cartItems"
            :key="cartItem.id"
          >
            <td>商品: {{ cartItem.title }}</td>
            <td>
              <img :src="cartItem.img" alt="" width="40" height="40" />
            </td>
            <td>數量: {{ cartItem.counter }} 個</td>
            <td v-if="cartItem.kupeng">
              價格: NT$
              {{ Math.floor(cartItem.price * cartItem.counter * 0.7) }} 元
            </td>
            <td v-else="cartItem.kupeng">
              價格: NT$ {{ cartItem.price * cartItem.counter }} 元
            </td>
          </tr>
        </table>
        <div v-if="adminCartStore.orderDoneSearchTermRef.length < 1">
          <div v-if="showDetailRef[order]" class="cardInfoLayout">
            <div class="cardInfo">姓名: {{ cartItems[0].name }}</div>
            <div class="cardInfo">電話: {{ cartItems[0].telphone }}</div>
            <div class="cardInfo">Email: {{ cartItems[0].email }}</div>
            <div class="cardInfo">地址: {{ cartItems[0].adress }}</div>
            <div class="cardInfo">備註: {{ cartItems[0].message }}</div>
          </div>
        </div>
      </div>

      <div
        v-if="adminCartStore.orderDoneSearchTermRef.length >= 1"
        class="dataButton"
      >
        <div class="dataButtonOrder">訂單編號▼</div>
        <div class="dataButtonName">姓名</div>
        <div class="dataButtonDate">日期</div>
        <div class="dataButtonKupeng">優惠券</div>
        <div class="dataButtonCounter">總件數</div>
        <div class="dataButtonPrice">總共價格</div>
        <div class="dataButtonState">訂單狀態</div>
        <div class="dataButtonD">✓</div>
        <div class="dataButtonU">✕</div>
      </div>

      <div
        v-if="adminCartStore.orderDoneSearchTermRef.length >= 1"
        v-for="(searchs, index) in adminCartStore.orderDoneSearchTermFunction"
        :key="index"
        class="cardLayout"
      >
        <div class="cardTitle">
          <div class="cardTitleOrder">{{ searchs[0].order }}</div>
          <div class="cardTitleName">{{ searchs[0].name }}</div>
          <div class="cardTitleDate">
            {{ searchs[0].year }}年{{ searchs[0].month }}月{{
              searchs[0].date
            }}日{{ searchs[0].hours }}點{{ searchs[0].minutes }}分
          </div>

          <div v-if="searchs[0].kupeng">使用優惠券</div>
          <div v-else="searchs[0].kupeng">沒用優惠券</div>
          <div class="cardTitleCounter">
            買了
            {{ searchs.reduce((acc, cur) => acc + cur.counter, 0) }} 件物品
          </div>
          <div v-if="searchs[0].kupeng" class="cardTitlePrice">
            總金額: NT$
            {{
              searchs.reduce(
                (acc, cur) => acc + cur.price * cur.counter * 0.7,
                0
              )
            }}
          </div>
          <div v-else="searchs[0].kupeng" class="cardTitlePrice">
            總金額: NT$
            {{ searchs.reduce((acc, cur) => acc + cur.price * cur.counter, 0) }}
          </div>
          <div v-if="searchs[0].complete" class="green">訂單已經完成</div>
          <div v-else="searchs[0].complete" class="red">訂單尚未完成</div>
          <button @click="completeTrue(searchs[0].order)">完成訂單 ✓</button>
          <button @click="completeFalse(searchs[0].order)">未完成訂單 ✕</button>
        </div>
        <table>
          <tr v-for="(search, adminIndex) in searchs" :key="adminIndex">
            <td>商品: {{ search.title }}</td>
            <td>
              <img :src="search.img" alt="" width="40" height="40" />
            </td>
            <td>件數: {{ search.counter }} 個</td>
            <td v-if="search.kupeng">
              價格: NT$
              {{ Math.floor(search.price * search.counter * 0.7) }} 元
            </td>
            <td v-else="search.kupeng">
              價格: NT$ {{ search.price * search.counter }} 元
            </td>
          </tr>
        </table>
        <div class="cardInfoLayout">
          <div class="cardInfo">姓名: {{ searchs[0].name }}</div>
          <div class="cardInfo">電話: {{ searchs[0].telphone }}</div>
          <div class="cardInfo">Email: {{ searchs[0].email }}</div>
          <div class="cardInfo">地址: {{ searchs[0].adress }}</div>
          <div class="cardInfo">備註: {{ searchs[0].message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
.pageOneLayOut {
  width: 100vw;
  max-width: 100%;
  background-color: #565656;
  padding: 13px;
}
.dataButton {
  display: flex;
  color: black;
}

.dataButtonOrder {
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 10vw;
  display: flex;
  justify-content: center;
}

.dataButtonName {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 11vw;
}

.dataButtonDate {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 16vw;
}

.dataButtonKupeng {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 8vw;
}

.dataButtonCounter {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 10vw;
}

.dataButtonPrice {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 12vw;
}

.dataButtonState {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 10vw;
}

.dataButtonD {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
  width: 7vw;
}

.dataButtonU {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  width: 8vw;
}

.dataLayout {
  color: black;
  margin-top: 2px;
}

.cardLayout {
  background-color: #c4c4c4;
  margin-top: 2px;
}

.cardTitle {
  display: flex;
  justify-content: space-between;
}

.cardTitleOrder {
  width: 110px;
  max-width: 110px;
  overflow-x: auto;
}

.cardTitleName {
  width: 100px;
  max-width: 100px;
  display: flex;
  justify-content: center;
}

.cardTitleDate {
  width: 167px;
  max-width: 167px;
}

.cardTitleCounter {
  width: 101px;
  max-width: 101px;
}

.cardTitlePrice {
  width: 128px;
  max-width: 128px;
}

td {
  background-color: #585858;
  border-radius: 5px;
  padding: 5px;
}

.cardInfoLayout {
  display: flex;
  flex-wrap: wrap;
}

.cardInfo {
  background-color: #585858;
  margin: 2px;
  padding: 15px;
  border-radius: 5px;
}

.inputOne {
  background-color: #000;
  padding: 5px;
  color: #c4c4c4;
}

.inputOneButton {
  background-color: #c4c4c4;
  margin-left: 5px;
  padding: 9px;
  border-radius: 5px;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}
</style>
