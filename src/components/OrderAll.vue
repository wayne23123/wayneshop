<script setup>
import { ref, computed } from "vue";
import { useAdminCartStore } from "../stores/admincart";

const adminCartStore = useAdminCartStore();

// 呼叫 orderFunction，從 Vuex store 中取得訂單
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
      <span @click="adminCartStore.reverseOrderRefs"> 訂單編號▼ </span>
      <label for="inputOneID">搜尋訂單編號: </label>
      <input
        id="inputOneID"
        type="text"
        placeholder="請輸入訂單號碼..."
        v-model="adminCartStore.orderSearchTermRef"
      />
    </div>
    <div class="dataLayout">
      <!-- 這邊 v-if 顯示搜尋欄為空時 -->
      <div
        v-if="adminCartStore.orderSearchTermRef.length < 1"
        v-for="(cartItems, order) in adminCartStore.orderSearchTermFunction"
        :key="order"
        class="cardLayout"
      >
        <div>
          {{ cartItems[0].order }} 下單時間: {{ cartItems[0].year }}-{{
            cartItems[0].month
          }}-{{ cartItems[0].date }} {{ cartItems[0].hours }}:{{
            cartItems[0].minutes
          }}:{{ cartItems[0].seconds }}
        </div>

        <div class="tableContainer">
          <table>
            <tr
              v-if="adminCartStore.orderSearchTermRef.length < 1"
              v-for="cartItem in cartItems"
              :key="cartItem.id"
            >
              <td>
                <img :src="'.' + cartItem.img" alt="" width="40" height="40" />
              </td>
              <td>
                <div>商品: {{ cartItem.title }}</div>
                <div>{{ cartItem.description }}</div>
              </td>
              <td v-if="cartItem.kupeng">
                <div>優惠價</div>
                <div>
                  NT$
                  {{ Math.floor(cartItem.price * 0.7) }}
                </div>
              </td>
              <td v-else="cartItem.kupeng">
                <div>原價</div>
                <div>NT$ {{ cartItem.price }}</div>
              </td>
              <td>x{{ cartItem.counter }}</td>
            </tr>
          </table>

          <div>
            <div class="tableContainer">
              <div>
                <div v-if="cartItems[0].complete">
                  <div class="">已完成</div>
                </div>
                <div v-else>
                  <div class="">未完成</div>
                </div>
              </div>

              <div>
                <div v-if="cartItems[0].kupeng" class="cardTitlePrice pointer">
                  <!-- 優惠價 -->
                  NT$
                  {{
                    Math.floor(
                      cartItems.reduce(
                        (acc, cur) => acc + cur.price * cur.counter * 0.7,
                        0
                      )
                    )
                  }}
                </div>
                <div v-else class="cardTitlePrice pointer">
                  <!-- 原價 -->
                  NT$
                  {{
                    Math.floor(
                      cartItems.reduce(
                        (acc, cur) => acc + cur.price * cur.counter,
                        0
                      )
                    )
                  }}
                </div>
              </div>
            </div>
            <div class="tableContainer">
              <button @click="completeTrue(cartItems[0].order)">
                完成訂單 ✓
              </button>
              <button @click="completeFalse(cartItems[0].order)">
                未完成訂單 ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 這邊 v-else 顯示搜尋欄搜尋時 -->
      <div
        v-if="adminCartStore.orderSearchTermRef.length >= 1"
        v-for="(searchs, index) in adminCartStore.orderSearchTermFunction"
        :key="index"
        class="cardLayout"
      >
        <div>
          {{ searchs[0].order }} 下單時間: {{ searchs[0].year }}-{{
            searchs[0].month
          }}-{{ searchs[0].date }} {{ searchs[0].hours }}:{{
            searchs[0].minutes
          }}:{{ searchs[0].seconds }}
        </div>

        <div class="tableContainer">
          <table>
            <tr v-for="(search, adminIndex) in searchs" :key="adminIndex">
              <td>
                <img :src="'.' + search.img" alt="" width="40" height="40" />
              </td>
              <td>
                <div>商品: {{ search.title }}</div>
                <div>{{ search.description }}</div>
              </td>
              <td v-if="search.kupeng">
                <div>優惠價</div>
                <div>
                  NT$
                  {{ Math.floor(search.price * 0.7) }}
                </div>
              </td>
              <td v-else="search.kupeng">
                <div>原價</div>
                <div>NT$ {{ search.price }}</div>
              </td>
              <td>x{{ search.counter }}</td>
            </tr>
          </table>

          <div>
            <div class="tableContainer">
              <div>
                <div v-if="searchs[0].complete">
                  <div class="">已完成</div>
                </div>
                <div v-else>
                  <div class="">未完成</div>
                </div>
              </div>

              <div>
                <div v-if="searchs[0].kupeng" class="cardTitlePrice pointer">
                  <!-- 優惠價 -->
                  NT$
                  {{
                    Math.floor(
                      searchs.reduce(
                        (acc, cur) => acc + cur.price * cur.counter * 0.7,
                        0
                      )
                    )
                  }}
                </div>
                <div v-else class="cardTitlePrice pointer">
                  <!-- 原價 -->
                  NT$
                  {{
                    Math.floor(
                      searchs.reduce(
                        (acc, cur) => acc + cur.price * cur.counter,
                        0
                      )
                    )
                  }}
                </div>
              </div>
            </div>
            <div class="tableContainer">
              <button @click="completeTrue(searchs[0].order)">
                完成訂單 ✓
              </button>
              <button @click="completeFalse(searchs[0].order)">
                未完成訂單 ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}

.dataButton {
  display: flex;
  color: black;
}

.dataButtonOrder {
  background-color: #c4c4c4;
  margin-right: 2px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.dataButtonName {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
}

.dataButtonDate {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
}

.dataButtonKupeng {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
}

.dataButtonCounter {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
}

.dataButtonPrice {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
}

.dataButtonState {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
}

.dataButtonD {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
  margin-right: 2px;
}

.dataButtonU {
  display: flex;
  justify-content: center;
  background-color: #c4c4c4;
}

.dataLayout {
  color: black;
  margin-top: 2px;
}

.cardLayout {
  background-color: #c4c4c4;
  margin-top: 2px;
}

.tableContainer {
  display: flex;
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
  max-width: 167px;
}

.cardTitleCounter {
  max-width: 101px;
}

.cardTitlePrice {
  max-width: 128px;
}

td {
  /* background-color: #ffffff; */
  border-radius: 5px;
  padding: 5px;
}

.cardInfoLayout {
  display: flex;
  flex-wrap: wrap;
}

.cardInfo {
  background-color: #fff;
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
