<script setup>
import { useAdminCartStore } from "../stores/admincart";

const adminCartStore = useAdminCartStore();

// 用來切換訂單狀態時 清空搜尋
function clearSearchValue() {
  adminCartStore.orderSearchTermRef = "";
  adminCartStore.orderUndoSearchTermRef = "";
  adminCartStore.orderDoneSearchTermRef = "";
}
</script>

<template>
  <section>
    <div class="orderContainer">
      <div class="orderTop">
        <div @click="clearSearchValue()" class="links">
          <RouterLink to="/member/">全部訂單</RouterLink>
        </div>
        <div @click="clearSearchValue()" class="links">
          <RouterLink to="/member/undo">配送中訂單</RouterLink>
        </div>
        <div @click="clearSearchValue()" class="links">
          <RouterLink to="/member/finish">已完成訂單</RouterLink>
        </div>
      </div>
      <br />
      <div class="orderLayout"><RouterView /></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  a.router-link-exact-active {
    /* 到頁面 active 顏色 */
    color: #00b700;
    padding-bottom: 4px;
    border-bottom: 1px solid #00b700;
  }

  a:hover {
    color: #01ca01;
  }
  .orderContainer {
    padding: 20px;
    // background-color: #171717;
    .orderTop {
      display: flex;
      // background-color: #171717;
      border-bottom: 1px solid black;

      .links {
        padding: 0 20px;
        font-size: 26px;
        // font-size: 20px;
        // background-color: #171717;

        a {
          padding: 0 0 6px 0;
          // padding: 0 0 5px 0;
        }
      }
    }
    .orderLayout {
      width: 100%;
      background-color: #000;
    }
  }
}

@media only screen and (max-width: 700px) {
  section {
    .orderContainer {
      .orderTop {
        .links {
          font-size: 20px;

          a {
            padding: 0 0 5px 0;
          }
        }
      }
    }
  }
}
</style>
