<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const userStore = useUserStore();

const nameEditRef = ref("");

const telephoneEditRef = ref("");

const adressEditRef = ref("");

const emailEditRef = ref("");

// 顯示修改姓名的input
const showNameEditRef = ref(false);

// 點擊修改來展示
function showNameEdit() {
  showNameEditRef.value = !showNameEditRef.value;
}

// 改完名字後點擊 完成 來關閉input框
function closeNameEdit() {
  if (nameEditRef.value == "") {
    proxy.$message({ text: "姓名不能為空", type: "error" });
    return;
  } else if (nameEditRef.value == " ") {
    proxy.$message({ text: "姓名不能為空", type: "error" });
    return;
  }
  userStore.userInfo.name = nameEditRef.value;

  proxy.$message({ text: "更改姓名成功", type: "success" });

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
  if (telephoneEditRef.value == "") {
    proxy.$message({ text: "電話號碼不能為空", type: "error" });

    return;
  } else if (telephoneEditRef.value == " ") {
    proxy.$message({ text: "電話號碼不能為空", type: "error" });

    return;
  } else if (telephoneEditRef.value < 111111111) {
    proxy.$message({ text: "電話號碼格式錯誤", type: "error" });
    return;
  } else if (telephoneEditRef.value > 999999999) {
    proxy.$message({ text: "電話號碼格式錯誤", type: "error" });
    return;
  }
  userStore.userInfo.teleplone = telephoneEditRef.value;

  proxy.$message({ text: "更改電話號碼成功", type: "success" });

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
  if (emailEditRef.value == "") {
    proxy.$message({ text: "email不能為空", type: "error" });

    return;
  } else if (emailEditRef.value == " ") {
    proxy.$message({ text: "email不能為空", type: "error" });

    return;
  } else if (!checkEmailFormat(emailEditRef.value)) {
    proxy.$message({ text: "meail格式錯誤", type: "error" });

    return;
  }
  userStore.userInfo.email = emailEditRef.value;

  proxy.$message({ text: "更改email成功", type: "success" });

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
  if (adressEditRef.value == "") {
    proxy.$message({ text: "地址不能為空", type: "error" });

    return;
  } else if (adressEditRef.value == " ") {
    proxy.$message({ text: "地址不能為空", type: "error" });

    return;
  }
  userStore.userInfo.adress = adressEditRef.value;

  proxy.$message({ text: "更改地址成功", type: "success" });

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
  proxy.$message({ text: "上傳圖片成功", type: "success" });
  imageUrl.value = "";
}

// 取消上傳圖片函式
function clearimgRef() {
  imageUrl.value = "";
  proxy.$message({ text: "取消成功", type: "success" });
}
</script>

<template>
  <section>
    <div class="homeOverview">
      <div class="userMeta">
        <div class="avatar">
          <div class="avatarImgLayout">
            <img class="avatarImg" :src="userStore.userInfo.img" alt="" />
          </div>
        </div>
        <div class="bgcHome corBla">{{ userStore.userInfo.name }}</div>
      </div>
      <div class="item">
        <RouterLink to="/member/user">
          <div class="bgcHome"><span>✏ </span>會員中心</div>
        </RouterLink>
      </div>
    </div>
    <div class="container">
      <div class="memberPanel">
        <div>
          <div class="dis">
            <div>
              <span class="bgcTitle"> 姓名: </span>
              {{ userStore.userInfo.name }}
            </div>
            <div @click="showNameEdit" class="showEdit">_ ✎ 編輯</div>
          </div>
          <div>
            <div
              class="inputLayout"
              :class="{ inputLayoutShow: showNameEditRef }"
            >
              <input
                v-model="nameEditRef"
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
          </div>

          <div class="dis">
            <div>
              <span class="bgcTitle"> 電話: </span>
              {{ userStore.userInfo.telephone }}
            </div>
            <div @click="showTelephoneEdit" class="showEdit">_ ✎ 編輯</div>
          </div>
          <div>
            <div
              class="inputLayout"
              :class="{ inputLayoutShow: showTelephoneEditRef }"
            >
              <input
                v-model="telephoneEditRef"
                placeholder="請輸入新號碼..."
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
          </div>
          <div class="dis">
            <div>
              <span class="bgcTitle"> email: </span>
              {{ userStore.userInfo.email }}
            </div>
            <div @click="showEmailEdit" class="showEdit">_ ✎ 編輯</div>
          </div>
          <div>
            <div
              class="inputLayout"
              :class="{ inputLayoutShow: showEmailEditRef }"
            >
              <input
                v-model="emailEditRef"
                placeholder="請輸入新email..."
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
          </div>
          <div class="dis">
            <div>
              <span class="bgcTitle"> 地址: </span>
              {{ userStore.userInfo.adress }}
            </div>
            <div @click="showAdressEdit" class="showEdit">_ ✎ 編輯</div>
          </div>
          <div>
            <div
              class="inputLayout"
              :class="{ inputLayoutShow: showAdressEditRef }"
            >
              <input
                v-model="adressEditRef"
                placeholder="請輸入新地址..."
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
          </div>
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
            <div>
              <div v-if="imageUrl === ''" class="newImgLayout marAuto">
                <img :src="userStore.userInfo.img" class="avatarImg" alt="" />
              </div>
              <div v-else class="newImgLayout marAuto">
                <img :src="imageUrl" class="avatarImg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/styles/var.scss";
// $yellowColor
// $darkYellowColor
// $grayColor
// $darkGrayColor

section {
  a.router-link-exact-active {
    /* 到頁面 active 顏色 */
    color: #00b700;
  }

  .pointer {
    cursor: pointer;
  }

  .homeOverview {
    display: flex;
    height: 132px;
    /* background-color: #d5d6d6; */
    background-image: url(../assets/svgs/low-poly-grid.svg);
    background-repeat: no-repeat;
    background-size: cover;

    .userMeta {
      flex: 1;
      display: flex;
      align-items: center;

      .avatar {
        margin-left: 60px;
        margin-right: 20px;

        .avatarImgLayout {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          overflow: hidden;

          .avatarImg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .corBla {
      color: #000;
    }

    .bgcHome {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      padding: 10px;
      background-color: #dededebf;
      border-radius: 15px;
    }

    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

  .container {
    padding: 20px 0;
    display: flex;
    justify-content: center;

    .memberPanel {
      color: #000;
      font-size: 20px;
      border-radius: 15px;
      width: 50vw;
      padding: 30px 40px;
      /* background-color: #aba39c; */
      background-image: url(../assets/svgs/polygon-scatter1.svg);
      overflow: hidden;

      .bgcTitle {
        padding: 10px;
        border-radius: 15px;
        background-color: #939393;
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
        transition: all 0.5s ease;
      }

      .inputLayout {
        padding: 10px;
        opacity: 0;
        transform: translateX(100%);

        transition: all 0.5s ease;

        .inputText {
          height: 40px;
          border-radius: 15px;
          width: 80%;
        }

        .completeBtn {
          padding: 0 10px;
          height: 40px;
          width: 20%;
          border-radius: 15px;
          background-color: #84b770;
        }

        .completeBtn:hover {
          background-color: #66c466;
          color: #345d64;
        }
      }

      .inputLayoutShow {
        opacity: 1;
        transform: translateX(0);

        transition: all 0.5s ease;
      }

      .inputImg {
        width: 65px;
        background-color: #c4c4c4;
        border: none;
      }

      .btnLayout {
        padding: 5px;

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
      }

      .newImgLayout {
        background-color: #c4c4c4;
        width: 170px;
        height: 170px;
        border-radius: 50%;
        overflow: hidden;
        /* border: 1px #000 solid; */

        .avatarImg {
          width: 100%;
          height: 100%;
        }
      }

      .marAuto {
        margin: auto;
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  section {
    .container {
      .memberPanel {
        width: 60vw;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  section {
    .container {
      .memberPanel {
        width: 70vw;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  section {
    .container {
      .memberPanel {
        width: 90vw;
        padding: 10px;
      }
    }
  }
}
</style>
