<script setup></script>

<template>
  <div class="homeOverview">
    <div class="userMeta">
      <div class="avatar">
        <img class="avatarImg" src="../assets/pictures/avatarDefault.png" />
      </div>
      <h4>test001</h4>
    </div>
    <div class="item">
      <a href="javascript:;">
        <p><span>✏ </span>會員中心</p>
      </a>
      <a href="javascript:;">
        <p><span>☼ </span>安全設定</p>
      </a>
      <a href="javascript:;">
        <p><span>♢ </span>地址管理</p>
      </a>
    </div>
  </div>
  <div class="like-container">
    <div class="home-panel">
      <div class="header">
        <h4>123</h4>
      </div>
      <div class="goods-list"></div>
    </div>
  </div>
</template>

<style scoped>
.homeOverview {
  display: flex;
  height: 132px;
  background: url() no-repeat center / cover;
}

.userMeta {
  flex: 1;
  display: flex;
  align-items: center;
}

.avatar {
  width: 85px;
  height: 85px;
  margin-left: 60px;
}

.avatarImg {
  width: 100%;
  height: 100%;
}

h4 {
  padding-left: 26px;
  font-size: 18px;
  font-weight: normal;
  color: white;
}

.item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
