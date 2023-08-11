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
</template>

<style scoped>
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
}

.orderTop {
  display: flex;
  padding: 0;
  border-bottom: 1px solid black;
}

.links {
  padding: 0 20px;
}

.orderLayout {
  width: 100%;
  background-color: #000;
}
</style>
