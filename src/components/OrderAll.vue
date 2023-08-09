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
</script>

<template>
  <div class="pageOneLayout">
    <div class="inputOne">
      <span @click="adminCartStore.reverseOrderRefs" class="pointer">
        訂單編號 ▼
      </span>
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
        <br />
        <div>
          編號: {{ cartItems[0].order }} 下單時間: {{ cartItems[0].year }}-{{
            cartItems[0].month
          }}-{{ cartItems[0].date }} {{ cartItems[0].hours }}:{{
            cartItems[0].minutes
          }}:{{ cartItems[0].seconds }}
        </div>

        <div
          class="tableContainer"
          :class="{ tableContainerDone: cartItems[0].complete }"
        >
          <table>
            <tr
              v-if="adminCartStore.orderSearchTermRef.length < 1"
              v-for="cartItem in cartItems"
              :key="cartItem.id"
            >
              <td>
                <img :src="'.' + cartItem.img" alt="" width="40" height="50" />
              </td>
              <td>
                <div>{{ cartItem.title }}</div>
                <div>
                  {{ cartItem.description }}
                </div>
              </td>
              <td v-if="cartItem.kupeng">
                <div class="disCen">優惠價</div>
                <div>NT${{ Math.floor(cartItem.price * 0.7) }}</div>
              </td>
              <td v-else="cartItem.kupeng">
                <div class="disCen">原價</div>
                <div>NT${{ cartItem.price }}</div>
              </td>
              <td class="pad10">x{{ cartItem.counter }}</td>
            </tr>
          </table>

          <div>
            <div class="tableRight">
              <div class="tableRightCard">
                <div>
                  <div v-if="cartItems[0].kupeng">
                    <!-- 優惠價 -->
                    <div class="tableRightCardPrice">
                      總共NT${{
                        Math.floor(
                          cartItems.reduce(
                            (acc, cur) => acc + cur.price * cur.counter * 0.7,
                            0
                          )
                        )
                      }}
                    </div>
                  </div>
                  <div v-else>
                    <!-- 原價 -->
                    <div class="tableRightCardPrice">
                      總共NT${{
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

                <br />

                <div v-if="cartItems[0].complete">
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 true 時顯示 -->
                  <div>
                    <div class="tableRightCardOrder">訂單已完成</div>
                  </div>
                  <br />
                  <div>
                    <div
                      class="tableRightCardOrder tableRightCardEvaluate pointer"
                    >
                      評價商品
                    </div>
                  </div>
                </div>
                <div v-else>
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 false 時顯示 -->
                  <div class="tableRightCardOrder"><span>訂單配送中</span></div>
                </div>

                <br />

                <div v-if="cartItems[0].complete">
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 true 時顯示 -->
                </div>
                <div v-else>
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 false 時顯示 -->

                  <div class="tableRightCardBtnLayout">
                    <div
                      @click="completeTrue(cartItems[0].order)"
                      class="tableRightCardBtnLayoutBtnR pointer"
                    >
                      <div>完成訂單✓</div>
                      <div></div>
                    </div>
                    <div
                      @click="completeFalse(cartItems[0].order)"
                      class="tableRightCardBtnLayoutBtnL pointer"
                    >
                      <div>取消訂單✕</div>
                      <div></div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <!-- bottom -->
        </div>
      </div>
    </div>

    <!-- 這邊 v-else 顯示搜尋欄搜尋時 -->
    <div class="dataLayout">
      <div
        v-if="adminCartStore.orderSearchTermRef.length >= 1"
        v-for="(searchs, index) in adminCartStore.orderSearchTermFunction"
        :key="index"
        class="cardLayout"
      >
        <br />
        <div>
          編號: {{ searchs[0].order }} 下單時間: {{ searchs[0].year }}-{{
            searchs[0].month
          }}-{{ searchs[0].date }} {{ searchs[0].hours }}:{{
            searchs[0].minutes
          }}:{{ searchs[0].seconds }}
        </div>

        <div
          class="tableContainer"
          :class="{ tableContainerDone: searchs[0].complete }"
        >
          <table>
            <tr v-for="(search, adminIndex) in searchs" :key="adminIndex">
              <td>
                <img :src="'.' + search.img" alt="" width="40" height="50" />
              </td>
              <td>
                <div>{{ search.title }}</div>
                <div>
                  {{ search.description }}
                </div>
              </td>
              <td v-if="search.kupeng">
                <div class="disCen">優惠價</div>
                <div>NT${{ Math.floor(search.price * 0.7) }}</div>
              </td>
              <td v-else="search.kupeng">
                <div class="disCen">原價</div>
                <div>NT${{ search.price }}</div>
              </td>
              <td class="pad10">x{{ search.counter }}</td>
            </tr>
          </table>

          <div>
            <div class="tableRight">
              <div class="tableRightCard">
                <div>
                  <div v-if="searchs[0].kupeng">
                    <!-- 優惠價 -->
                    <div class="tableRightCardPrice">
                      總共NT${{
                        Math.floor(
                          searchs.reduce(
                            (acc, cur) => acc + cur.price * cur.counter * 0.7,
                            0
                          )
                        )
                      }}
                    </div>
                  </div>
                  <div v-else>
                    <!-- 原價 -->
                    <div class="tableRightCardPrice">
                      總共NT${{
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

                <br />

                <div v-if="searchs[0].complete">
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 true 時顯示 -->
                  <div>
                    <div class="tableRightCardOrder">訂單已完成</div>
                  </div>
                  <br />
                  <div>
                    <div
                      class="tableRightCardOrder tableRightCardEvaluate pointer"
                    >
                      評價商品
                    </div>
                  </div>
                </div>
                <div v-else>
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 false 時顯示 -->
                  <div class="tableRightCardOrder"><span>訂單配送中</span></div>
                </div>

                <br />

                <div v-if="searchs[0].complete">
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 true 時顯示 -->
                </div>
                <div v-else>
                  <!-- {{ cartItems[0].complete }} -->
                  <!-- 為 false 時顯示 -->
                  <div class="tableRightCardBtnLayout">
                    <div
                      @click="completeTrue(searchs[0].order)"
                      class="tableRightCardBtnLayoutBtnR pointer"
                    >
                      <div>完成訂單✓</div>
                      <div></div>
                    </div>
                    <div
                      @click="completeFalse(searchs[0].order)"
                      class="tableRightCardBtnLayoutBtnL pointer"
                    >
                      <div>取消訂單✕</div>
                      <div></div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- bottom -->
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
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
  flex-wrap: wrap;
  border-left: 4px #820000 solid;
}

.tableContainerDone {
  border-left: 4px #028200 solid;
}

table {
  margin-top: -2px;
  /* background-color: #565656; */
}

td {
  /* background-color: #ffffff; */
  padding: 5px;
  border-top: 1px #939393 solid;
}

.inputOne {
  background-color: #000;
  padding: 5px;
  color: #c4c4c4;
}

.tableRight {
  /* background-color: #daa520; */
  width: 200px;
}

.tableRightCard {
  padding: 5px;
  border-top: 1px #939393 solid;
  border-left: 1px #939393 solid;
}

.tableRightCardPrice {
  padding: 10px;
  border-radius: 15px;
  background-color: #f5e5bb;
}

.tableRightCardOrder {
  display: inline-block;
  padding: 10px;
  border-radius: 15px;
  background-color: #f2dda6;
}

.tableRightCardEvaluate:hover {
  background-color: #edd391;
  color: #00b700;
  transition: all 0.3s ease;
}

.tableRightCardBtnLayout {
  display: flex;
  justify-content: space-between;
}

.tableRightCardBtnLayoutBtnR {
  padding: 10px;
  border-radius: 15px;
  background-color: #accee3;
}

.tableRightCardBtnLayoutBtnR:hover {
  background-color: #98c6e3;
  color: #00b700;
  transition: all 0.3s ease;
}

.tableRightCardBtnLayoutBtnL {
  padding: 10px;
  border-radius: 15px;
  background-color: #d8bebe;
}

.tableRightCardBtnLayoutBtnL:hover {
  background-color: #dbb2b2;
  color: #00b700;
  transition: all 0.3s ease;
}

.pad10 {
  padding: 0 10px;
}
</style>
