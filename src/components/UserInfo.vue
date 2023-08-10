<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const showNameEditRef = ref(false);

function showNameEdit() {
  showNameEditRef.value = !showNameEditRef.value;
}

function closeNameEdit() {
  if (userStore.nameEditRef == "") {
    return;
  } else if (userStore.nameEditRef == " ") {
    return;
  }
  showNameEditRef.value = false;
}

const showTelephoneEditRef = ref(false);

function showTelephoneEdit() {
  showTelephoneEditRef.value = !showTelephoneEditRef.value;
}

function closeTelephoneEdit() {
  if (userStore.telephoneEditRef == "") {
    return;
  } else if (userStore.telephoneEditRef == " ") {
    return;
  }
  showTelephoneEditRef.value = false;
}

const showEmailEditRef = ref(false);

function showEmailEdit() {
  showEmailEditRef.value = !showEmailEditRef.value;
}

function closeEmailEdit() {
  if (userStore.emailEditRef == "") {
    return;
  } else if (userStore.emailEditRef == " ") {
    return;
  }
  showEmailEditRef.value = false;
}

const showAdressEditRef = ref(false);

function showAdressEdit() {
  showAdressEditRef.value = !showAdressEditRef.value;
}

function closeAdressEdit() {
  if (userStore.adressEditRef == "") {
    return;
  } else if (userStore.adressEditRef == " ") {
    return;
  }
  showAdressEditRef.value = false;
}

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

function uploadImg() {
  userStore.userInfo.img = imageUrl.value;
}

function clearimgRef() {
  imageUrl.value = "";
}
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
        <p><span>✏ </span>會員中心</p>
      </a>
    </div>
  </div>
  <div class="container">
    <div class="memberPanel">
      <div class="header">
        <div class="showTitle dis">
          <div>
            <span class="bgcTitle"> 姓名: </span> {{ userStore.userInfo.name }}
          </div>
          <div @click="showNameEdit" class="showEdit">_ ✎ 編輯</div>
        </div>
        <div>
          <transition name="fade" tag="div" v-show="showNameEditRef">
            <div class="inputLayout">
              <input
                v-model="userStore.nameEditRef"
                placeholder="請輸入新姓名..."
                class="inputText"
                type="text"
                maxlength="32"
              />
              <button
                @click="
                  closeNameEdit();
                  userStore.nameEditFunction();
                "
                class="completeBtn"
              >
                <div>完成☑</div>
              </button>
            </div>
          </transition>
        </div>
        <br />
        <br />
        <div class="showTitle dis">
          <div>
            <span class="bgcTitle"> 電話: </span>
            {{ userStore.userInfo.telephone }}
          </div>
          <div @click="showTelephoneEdit" class="showEdit">_ ✎ 編輯</div>
        </div>
        <div>
          <transition name="fade" tag="div" v-show="showTelephoneEditRef">
            <div class="inputLayout">
              <input
                v-model="userStore.telephoneEditRef"
                placeholder="請輸入新姓名..."
                class="inputText"
                type="text"
                min="1111111111"
                max="9999999999"
                maxlength="11"
              />
              <button
                @click="
                  closeTelephoneEdit();
                  userStore.telephoneEditFunction();
                "
                class="completeBtn"
              >
                <div>完成☑</div>
              </button>
            </div>
          </transition>
        </div>
        <br />
        <br />
        <div class="showTitle dis">
          <div>
            <span class="bgcTitle"> email: </span>
            {{ userStore.userInfo.email }}
          </div>
          <div @click="showEmailEdit" class="showEdit">_ ✎ 編輯</div>
        </div>
        <div>
          <transition name="fade" tag="div" v-show="showEmailEditRef">
            <div class="inputLayout">
              <input
                v-model="userStore.emailEditRef"
                placeholder="請輸入新姓名..."
                class="inputText"
                type="text"
                maxlength="32"
              />
              <button
                @click="
                  closeEmailEdit();
                  userStore.emailEditFunction();
                "
                class="completeBtn"
              >
                <div>完成☑</div>
              </button>
            </div>
          </transition>
        </div>
        <br />
        <br />
        <div class="showTitle dis">
          <div>
            <span class="bgcTitle"> 地址: </span>
            {{ userStore.userInfo.adress }}
          </div>
          <div @click="showAdressEdit" class="showEdit">_ ✎ 編輯</div>
        </div>
        <div>
          <transition name="fade" tag="div" v-show="showAdressEditRef">
            <div class="inputLayout">
              <input
                v-model="userStore.adressEditRef"
                placeholder="請輸入新姓名..."
                class="inputText"
                type="text"
                maxlength="32"
              />
              <button
                @click="
                  closeAdressEdit();
                  userStore.adressEditFunction();
                "
                class="completeBtn"
              >
                <div>完成☑</div>
              </button>
            </div>
          </transition>
        </div>
        <br />
        <br />
        <div class="dis wra">
          <div>
            <div>
              <span class="bgcTitle">
                <label for="uploadImg" class="pointer"> 上傳新大頭貼:</label>
                <input
                  id="uploadImg"
                  class="inputImg"
                  type="file"
                  @change="onFileChange"
                />
              </span>
            </div>
            <div v-if="imageUrl === ''"></div>
            <div v-else>
              <br />
              <br />
              <div class="dis">
                <div class="btnLayout">
                  <div
                    @click="uploadImg"
                    class="pointer tableRightCardBtnLayoutBtnR"
                  >
                    確定上傳
                  </div>
                </div>
                <div class="btnLayout">
                  <div
                    @click="clearimgRef"
                    class="pointer tableRightCardBtnLayoutBtnL"
                  >
                    取消上傳
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="newImgLayout marAuto">
            <img :src="imageUrl" class="avatarImg" alt="" />
          </div>
        </div>
      </div>
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
  color: #000;
}

.item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.container {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.memberPanel {
  color: #000;
  font-size: 20px;
  border-radius: 15px;
  width: 50vw;
  padding: 30px 40px;
  /* background-color: #aba39c; */
  background-image: url(../assets/svgs/stacked-waves-haikei.svg);
}

.inputImg {
  width: 65px;
  background-color: #c4c4c4;
  border: none;
}

.showEdit {
  cursor: pointer;
  opacity: 0;
  flex-grow: 1;
  /* background-color: #000; */
}

.showEdit:hover {
  opacity: 1;
  color: #717171;
}

.inputLayout {
  position: absolute;
}

.bgcTitle {
  padding: 10px;
  border-radius: 15px;
  background-color: #939393;
}

.newImgLayout {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  overflow: hidden;
  /* border: 1px #000 solid; */
}

.marAuto {
  margin: auto;
}

.inputText {
  height: 40px;
  width: 300px;
  border-radius: 15px;
}

.completeBtn {
  padding: 0 10px;
  height: 40px;
  border-radius: 15px;
  background-color: #84b770;
}

.completeBtn:hover {
  background-color: #66c466;
  color: #345d64;
}

.pointer {
  cursor: pointer;
}

.btnLayout {
  padding: 5px;
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

@media screen and (max-width: 1100px) {
  .memberPanel {
    width: 60vw;
  }
}

@media screen and (max-width: 800px) {
  .memberPanel {
    width: 70vw;
  }
}

@media screen and (max-width: 700px) {
  .memberPanel {
    width: 90vw;
    padding: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
