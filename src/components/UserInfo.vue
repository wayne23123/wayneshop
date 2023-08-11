<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

// 顯示修改姓名的input
const showNameEditRef = ref(false);

// 點擊修改來展示
function showNameEdit() {
  showNameEditRef.value = !showNameEditRef.value;
}

// 改完名字後點擊 完成 來關閉input框
function closeNameEdit() {
  if (userStore.nameEditRef == "") {
    return;
  } else if (userStore.nameEditRef == " ") {
    return;
  }
  showNameEditRef.value = false;
}

// 顯示修改電話的input
const showTelephoneEditRef = ref(false);

// 點擊修改來展示
function showTelephoneEdit() {
  showTelephoneEditRef.value = !showTelephoneEditRef.value;
}

// 改完電話後點擊 完成 來關閉input框
function closeTelephoneEdit() {
  if (userStore.telephoneEditRef == "") {
    return;
  } else if (userStore.telephoneEditRef == " ") {
    return;
  }
  showTelephoneEditRef.value = false;
}

// 顯示修改email的input
const showEmailEditRef = ref(false);

// 點擊修改來展示
function showEmailEdit() {
  showEmailEditRef.value = !showEmailEditRef.value;
}

// 此函數檢查 email 格式是否正確
function checkEmailFormat(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// 改完 email 後點擊 完成 來關閉input框
function closeEmailEdit() {
  if (userStore.emailEditRef == "") {
    return;
  } else if (userStore.emailEditRef == " ") {
    return;
  } else if (!checkEmailFormat(userStore.emailEditRef)) {
    ElMessage({
      type: "warning",
      message: "請確認Email格式",
    });
    return;
  }
  showEmailEditRef.value = false;
}

// 顯示修改地址的input
const showAdressEditRef = ref(false);

// 點擊修改來展示
function showAdressEdit() {
  showAdressEditRef.value = !showAdressEditRef.value;
}

// 改完 地址 後點擊 完成 來關閉input框
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

// 上傳圖片函式
function uploadImg() {
  // 將保存的圖片值賦值給userStore的userInfo的img
  userStore.userInfo.img = imageUrl.value;
  ElMessage({ type: "success", message: "上傳圖片成功" });
  imageUrl.value = "";
}

// 取消上傳圖片函式
function clearimgRef() {
  imageUrl.value = "";
  ElMessage({ type: "success", message: "已取消" });
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
      <h4 class="bgcHome">{{ userStore.userInfo.name }}</h4>
    </div>
    <div class="item">
      <RouterLink to="/member/user">
        <p class="bgcHome"><span>✏ </span>會員中心</p>
      </RouterLink>
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
                    上傳✓
                  </div>
                </div>
                <div class="btnLayout">
                  <div
                    @click="clearimgRef"
                    class="pointer tableRightCardBtnLayoutBtnL"
                  >
                    取消✕
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
a.router-link-exact-active {
  /* 到頁面 active 顏色 */
  color: #00b700;
}

.homeOverview {
  display: flex;
  height: 132px;
  /* background-color: #d5d6d6; */
  background-image: url(../assets/svgs/low-poly-grid.svg);
}

.userMeta {
  flex: 1;
  display: flex;
  align-items: center;
}

.avatar {
  margin-left: 60px;
  margin-right: 20px;
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
  background-image: url(../assets/svgs/polygon-scatter1.svg);
}

.bgcHome {
  padding: 10px;
  background-color: #dededebf;
  border-radius: 15px;
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
  background-color: #c4c4c4;
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
