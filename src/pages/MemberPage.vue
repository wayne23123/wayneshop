<script setup>
import { ref } from "vue";

const orderActiveRef = ref(false);

function orderActiveTrue() {
  orderActiveRef.value = true;
}

function orderActiveFalse() {
  orderActiveRef.value = false;
}
</script>

<template>
  <div class="container">
    <div class="memberAside">
      <div class="userManage">
        <div>
          <h4>我的帳戶</h4>
          <br />
          <div @click="orderActiveFalse" class="links">
            <RouterLink to="/member/">個人中心</RouterLink>
          </div>
          <br />
        </div>
        <div>
          <h4>交易管理</h4>
          <br />
          <div @click="orderActiveTrue()">
            <RouterLink to="/member/order"
              ><div class="links">
                <span :class="{ active: orderActiveRef }">我的訂單</span>
              </div>
            </RouterLink>
          </div>
          <br />
        </div>
      </div>
    </div>
    <div class="article">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
a.router-link-exact-active {
  /* 到頁面 active 顏色 */
  color: #00b700;
  border-bottom: 1px #00b700 solid;
}

.active {
  color: #00b700;
  border-bottom: 1px #00b700 solid;
}

a:hover {
  color: #01ca01;
}
.container {
  display: flex;
  padding: 10px;
  background-color: #daa520;
  min-height: 30vw;
}

.memberAside {
  width: 180px;
  margin-right: 15px;
  border-radius: 2px;
  background-color: #c4c4c4;
  border-bottom: 1px solid #f6f6f6;
}

.userManage {
  width: 180px;
  background-color: #c4c4c4;
}

h4 {
  color: #464646;
  background-color: #adadad;
  font-size: 18px;
  font-weight: 400;
  padding: 20px 52px 5px;
  border-top: 1px solid #f6f6f6;
  border-left: 1px solid #f6f6f6;
}

.links {
  padding: 0 52px 10px;
}

.article {
  width: 100%;
  background-color: #c4c4c4;
}

@media screen and (max-width: 1100px) {
  .container {
    flex-wrap: wrap;
  }

  .memberAside {
    width: 100%;
    margin-right: 0;
    display: flex;
    justify-content: center;
  }
  .userManage {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
