<script setup>
import { ref } from "vue";
import { useAdminCartStore } from "../stores/admincart";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const adminCartStore = useAdminCartStore();

// 呼叫 orderFunction，從 Pinia store 中取得訂單
adminCartStore.orderUndoFunction;
adminCartStore.reverseOrderUndoRefs();

// 定義一個名為 completeTrue 的函式，傳入 orderId 參數
function completeTrue(orderId) {
  // 使用 forEach 迴圈，針對每筆訂單檢查是否符合 orderId
  adminCartStore.admincarts.forEach((order) => {
    if (order.order === orderId) {
      // 如果符合，則將 complete 設為 true
      order.complete = true;
    }
  });

  proxy.$message({ text: "訂單完成", type: "success" });
}

// 依照 orderId 刪除訂單
function deleteOrderUndo(orderId) {
  // 方法1
  // // 創建一個新 admincarts 不包含orderId
  // adminCartStore.admincarts = adminCartStore.admincarts.filter(
  //   (order) => order.order !== orderId
  // );

  // 方法2
  const ordersToDelete = []; // 用於儲存要刪除的訂單的索引

  // 找到所有要刪除的訂單的索引
  for (let i = 0; i < adminCartStore.admincarts.length; i++) {
    if (adminCartStore.admincarts[i].order === orderId) {
      ordersToDelete.push(i);
    }
  }

  // 從陣列中刪除對應索引的訂單(倒敘刪除以防所引錯位)
  for (let i = ordersToDelete.length - 1; i >= 0; i--) {
    adminCartStore.admincarts.splice(ordersToDelete[i], 1);
  }

  // 刪完後 重新載入訂單
  adminCartStore.orderUndoFunction;
  // 刪完後 將搜尋條清空
  adminCartStore.orderUndoSearchTermRef = "";
}

// 這個 showDetailRef 用來顯示訂單 detail
const showDetailRef = ref({});

// 定義一個名為 showDetailFunction 的函式，傳入 order 參數
function showDetailFunction(order) {
  // 將 showDetailRef 中 order 對應的值設為相反的 boolean 值
  showDetailRef.value[order] = !showDetailRef.value[order];
}

// 這個函式用來關閉訂單 detail
function closeFunction() {
  showDetailRef.value = {};
}

const confirm = (orderId) => {
  // 確認後執行
  // 方法2
  const ordersToDelete = []; // 用於儲存要刪除的訂單的索引

  // 找到所有要刪除的訂單的索引
  for (let i = 0; i < adminCartStore.admincarts.length; i++) {
    if (adminCartStore.admincarts[i].order === orderId) {
      ordersToDelete.push(i);
    }
  }

  // 從陣列中刪除對應索引的訂單(倒敘刪除以防所引錯位)
  for (let i = ordersToDelete.length - 1; i >= 0; i--) {
    adminCartStore.admincarts.splice(ordersToDelete[i], 1);
  }

  // 刪完後 重新載入訂單
  adminCartStore.orderUndoFunction;
  // 刪完後 將搜尋條清空
  adminCartStore.orderUndoSearchTermRef = "";

  closeFunction();

  proxy.$message({ text: "訂單取消成功", type: "success" });
};

const cancel = () => {
  closeFunction();
};
</script>

<template>
  <div class="pageOneLayout">
    <div class="inputOne">
      <span @click="adminCartStore.reverseOrderUndoRefs" class="pointer">
        訂單編號 ▼
      </span>
      <label for="inputOneID">搜尋訂單編號: </label>
      <input
        id="inputOneID"
        type="text"
        placeholder="請輸入訂單號碼..."
        v-model="adminCartStore.orderUndoSearchTermRef"
      />
    </div>
    <div class="dataLayout">
      <!-- 這邊 v-if 顯示搜尋欄為空時 -->
      <div
        v-if="adminCartStore.orderUndoSearchTermRef.length < 1"
        v-for="(cartItems, order) in adminCartStore.orderUndoSearchTermFunction"
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
            <tr v-for="cartItem in cartItems" :key="cartItem.id">
              <td>
                <img :src="cartItem.img" alt="" width="40" height="50" />
              </td>
              <td>
                <div>
                  {{ cartItem.title }}
                  <span class="sizeCor">| 尺寸: {{ cartItem.size }}</span>
                </div>
                <div class="desCor">
                  {{ cartItem.description }}
                </div>
              </td>
              <td v-if="cartItem.kupeng">
                <div class="disCen pad20">優惠價</div>
                <div class="pad20">
                  NT${{ Math.floor(cartItem.price * 0.7) }}
                </div>
              </td>
              <td v-else="cartItem.kupeng">
                <div class="disCen pad20">原價</div>
                <div class="pad20">NT${{ cartItem.price }}</div>
              </td>
              <td>
                <div class="pad20">x{{ cartItem.counter }}</div>
              </td>
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
                    </div>
                    <div
                      @click="showDetailFunction(order)"
                      class="tableRightCardBtnLayoutBtnL pointer"
                    >
                      <div>取消訂單✕</div>
                    </div>
                    <div
                      v-if="showDetailRef[order]"
                      @click="cancel()"
                      class="dialogLayout"
                    >
                      <div class="dialogContent">
                        <div class="dialogContentTitle">
                          <div>
                            <img
                              src="../assets/svgs/wss.svg"
                              width="50"
                              height="30"
                              alt=""
                            />
                          </div>
                          <div class="pointer">☒</div>
                        </div>
                        <div class="dialogContentText">
                          <p>確定要刪除訂單?</p>
                          <br />
                          <div class="tableRightCardBtnLayout">
                            <div
                              @click="confirm(cartItems[0].order)"
                              class="tableRightCardBtnLayoutBtnR pointer"
                            >
                              <div>確定</div>
                            </div>
                            <div class="tableRightCardBtnLayoutBtnL pointer">
                              <div>取消</div>
                            </div>
                          </div>
                        </div>
                      </div>
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
        v-if="adminCartStore.orderUndoSearchTermRef.length >= 1"
        v-for="(searchs, index) in adminCartStore.orderUndoSearchTermFunction"
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
                <img :src="search.img" alt="" width="40" height="50" />
              </td>
              <td>
                <div>
                  {{ search.title }}
                  <span class="sizeCor">| 尺寸: {{ search.size }}</span>
                </div>
                <div class="desCor">
                  {{ search.description }}
                </div>
              </td>
              <td v-if="search.kupeng">
                <div class="disCen pad20">優惠價</div>
                <div class="pad20">NT${{ Math.floor(search.price * 0.7) }}</div>
              </td>
              <td v-else="search.kupeng">
                <div class="disCen pad20">原價</div>
                <div class="pad20">NT${{ search.price }}</div>
              </td>
              <td>
                <div class="pad20">x{{ search.counter }}</div>
              </td>
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
                      @click="showDetailFunction(order)"
                      class="tableRightCardBtnLayoutBtnL pointer"
                    >
                      <div>取消訂單✕</div>
                    </div>
                    <div
                      v-if="showDetailRef[order]"
                      @click="cancel()"
                      class="dialogLayout"
                    >
                      <div class="dialogContent">
                        <div class="dialogContentTitle">
                          <div>
                            <img
                              src="../assets/svgs/wss.svg"
                              width="50"
                              height="30"
                              alt=""
                            />
                          </div>
                          <div class="pointer">☒</div>
                        </div>
                        <div class="dialogContentText">
                          <p>確定要刪除訂單?</p>
                          <br />
                          <div class="tableRightCardBtnLayout">
                            <div
                              @click="confirm(searchs[0].order)"
                              class="tableRightCardBtnLayoutBtnR pointer"
                            >
                              <div>確定</div>
                            </div>
                            <div class="tableRightCardBtnLayoutBtnL pointer">
                              <div>取消</div>
                            </div>
                          </div>
                        </div>
                      </div>
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
    <div class="dataLayout">
      <div
        v-if="adminCartStore.orderUndoSearchTermFunction == ''"
        class="cardLayout"
      >
        <br />
        <div class="disCen">
          <div>
            <img src="../assets/wrong.svg" alt="" />
            <br />
            <hr />
            <br />
            <div class="disCen">搜尋不到訂單</div>
            <br />
            <div class="disCen">請再次確認訂單號碼</div>
            <br />
            <hr />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
section {
  .pointer {
    cursor: pointer;
  }

  .inputOne {
    background-color: #000;
    padding: 15px;
    color: $grayColor;
    input {
      padding: 10px;
    }

    span {
      font-size: 30px;
    }

    label {
      font-size: 30px;
    }

    input {
      font-size: 20px;
      padding: 10px;
    }
  }

  .dataLayout {
    color: black;
    margin-top: 2px;

    .cardLayout {
      background-color: $grayColor;
      margin-top: 2px;
      font-size: 26px;

      .tableContainer {
        display: flex;
        flex-wrap: wrap;
        border-left: 4px #820000 solid;

        table {
          margin-top: -2px;
          /* background-color: #565656; */

          td {
            /* background-color: #ffffff; */
            padding: 5px;
            border-top: 1px #939393 solid;
            border-left: 1px #bababa solid;

            .sizeCor {
              color: #888;
            }

            .desCor {
              color: #747474;
            }

            .pad20 {
              padding: 0 20px;
            }
          }
        }

        .tableRight {
          /* background-color: #daa520; */
          width: 200px;

          .tableRightCard {
            padding: 5px;
            border-top: 1px #939393 solid;
            border-left: 1px #939393 solid;

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
          }

          .tableRightCardBtnLayout {
            display: flex;
            justify-content: space-between;

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
            .dialogLayout {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 300;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .dialogContent {
              background-color: #c4c4c4;
              padding: 10px;
              border-radius: 5px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
              text-align: center;

              .dialogContentTitle {
                display: flex;
                justify-content: space-between;
              }

              .dialogContentText {
                padding: 20px;
              }
            }
          }
        }
      }

      .tableContainerDone {
        border-left: 4px #028200 solid;
      }
    }
  }
}
</style>
