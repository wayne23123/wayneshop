<script setup></script>

<template>
  <div class="container">
    <div class="memberAside">
      <div class="userManage">
        <div>
          <h4>我的帳戶</h4>
          <div class="links">
            <RouterLink to="/member/">個人中心</RouterLink>
          </div>
        </div>
        <div>
          <h4>交易管理</h4>
          <div class="links">
            <RouterLink to="/member/order">我的訂單</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="article">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  padding: 10px;
  background-color: #daa520;
}

.memberAside {
  width: 220px;
  margin-right: 15px;
  border-radius: 2px;
  background-color: #c4c4c4;
}

.userManage {
  background-color: #c4c4c4;
}

h4 {
  font-size: 18px;
  font-weight: 400;
  padding: 20px 52px 5px;
  border-top: 1px solid #f6f6f6;
}

.links {
  padding: 0 52px 10px;
}

.article {
  background-color: #c4c4c4;
}

@media screen and (max-width: 830px) {
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
  }
}
</style>
