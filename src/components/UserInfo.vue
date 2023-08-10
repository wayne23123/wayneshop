<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

// 用於顯示上傳圖片的預覽
const imageUrl = ref("");
const onFileChange = (event) => {
  const file = event.target.files[0];
  // 取得選取的檔案
  const reader = new FileReader();
  // 建立一個FileReader物件
  // 當讀取圖片完成後執行以下程式碼
  reader.onload = () => {
    // 將選取的圖片轉換成Base64編碼格式，並存入imageUrl的value中
    imageUrl.value = reader.result; // 將選取的圖片轉換成Base64編碼格式
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="homeOverview">
    <div class="userMeta">
      <div class="avatar">
        <div class="avatarImgLayout">
          <img class="avatarImg" :src="userStore.userInfo.img" alt="" />
        </div>
      </div>
      <h4>{{ userStore.userInfo.name }}</h4>
    </div>
    <div class="item">
      <a href="javascript:;">
        <p><span>✏</span>會員中心</p>
      </a>
    </div>
  </div>
  <div class="container">
    <div class="memberPanel">
      <div class="header">
        <p>會員姓名: {{ userStore.userInfo.name }}</p>
        標題:<input
          v-model="userStore.nameEditRef"
          class="inputText"
          type="text"
          maxlength="32"
        />
        <button @click="userStore.nameEditFunction()">
          <div v-if="userStore.nameEditDone" class="green">完成☑</div>
          <div v-else="userStore.nameEditDone">更改☐</div>
        </button>
        <br />
        <p>會員電話: {{ userStore.userInfo.telphone }}</p>
        <br />
        <p>會員信箱: {{ userStore.userInfo.email }}</p>
        <br />
        <p>會員住址: {{ userStore.userInfo.adress }}</p>
        <br />
        <div>
          上傳新會員圖片:
          <div>
            <input class="inputImg" type="file" @change="onFileChange" />
          </div>
        </div>
        <div class="avatarImgLayout">
          <img :src="imageUrl" class="avatarImg" alt="" />
        </div>
      </div>
      <div class="goods-list"></div>
    </div>
  </div>
</template>

<style scoped>
.homeOverview {
  display: flex;
  height: 132px;
  background-color: #d5d6d6;
}

.userMeta {
  flex: 1;
  display: flex;
  align-items: center;
}

.avatar {
  margin-left: 60px;
}

.avatarImgLayout {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  overflow: hidden;
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

.container {
  display: flex;
  justify-content: center;
}

.memberPanel {
  width: 80vw;
  background-color: #565656;
}

.inputImg {
  width: 70px;
  background-color: #c4c4c4;
  border: none;
}
</style>
