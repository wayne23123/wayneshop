<script setup>
import { ref, reactive, computed } from "vue";
import { useAdminCartStore } from "../stores/admincart";
import AdminPageOne from "../components/AdminPageOne.vue";
import AdminPageTwo from "../components/AdminPageTwo.vue";
import AdminPageThree from "../components/AdminPageThree.vue";
import AdminPageFour from "../components/AdminPageFour.vue";
import AdminPageFive from "../components/AdminPageFive.vue";

const adminCartStore = useAdminCartStore();

adminCartStore.orderFunction;

const showPageOne = ref(true);
const showPageTwo = ref(false);
const showPageThree = ref(false);
const showPageFour = ref(false);
const showPageFive = ref(false);

function showPageOneFunction() {
  adminCartStore.orderFunction;
  showPageOne.value = true;
  showPageTwo.value = false;
  showPageThree.value = false;
  showPageFour.value = false;
  showPageFive.value = false;
  adminCartStore.orderSearchTermRef = "";
}

function showPageTwoFunction() {
  adminCartStore.orderUndoFunction;
  showPageOne.value = false;
  showPageTwo.value = true;
  showPageThree.value = false;
  showPageFour.value = false;
  showPageFive.value = false;
  adminCartStore.orderUndoSearchTermRef = "";
}

function showPageThreeFunction() {
  adminCartStore.orderDoneFunction;
  showPageOne.value = false;
  showPageTwo.value = false;
  showPageThree.value = true;
  showPageFour.value = false;
  showPageFive.value = false;
  adminCartStore.orderDoneSearchTermRef = "";
}

function showPageFourFunction() {
  showPageOne.value = false;
  showPageTwo.value = false;
  showPageThree.value = false;
  showPageFour.value = true;
  showPageFive.value = false;
}

function showPageFiveFunction() {
  showPageOne.value = false;
  showPageTwo.value = false;
  showPageThree.value = false;
  showPageFour.value = false;
  showPageFive.value = true;
}
</script>

<template>
  <header class="navbar">
    <router-link to="/">
      <div class="svg"><img src="../assets/wss.svg" alt="" /></div>
    </router-link>

    <router-link to="/">登出 Logout</router-link>
  </header>

  <section>
    <div class="leftNav">
      <div class="leftNavLayout">
        <div @click="showPageOneFunction" class="showPageOne">
          <button>全部訂單</button>
        </div>
        <div @click="showPageTwoFunction" class="showPageOne">
          <button>未完成的訂單</button>
        </div>
        <div @click="showPageThreeFunction" class="showPageOne">
          <button>已完成的訂單</button>
        </div>
        <div @click="showPageFourFunction" class="showPageOne">
          <button>上架商品</button>
        </div>
        <div @click="showPageFiveFunction" class="showPageOne">
          <button>編輯商品</button>
        </div>
      </div>
    </div>

    <div class="rightSection">
      <div class="sectionHolder"></div>
      <div class="rightLayuot">
        <div v-show="showPageOne">
          <AdminPageOne />
        </div>
      </div>
      <div class="rightLayuot">
        <div v-show="showPageTwo">
          <AdminPageTwo />
        </div>
      </div>
      <div class="rightLayuot">
        <div v-show="showPageThree">
          <AdminPageThree />
        </div>
      </div>
      <div class="rightLayuot">
        <div v-show="showPageFour">
          <AdminPageFour />
        </div>
      </div>
      <div class="rightLayuot">
        <div v-show="showPageFive">
          <AdminPageFive />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
button {
  padding: 5px;
  width: 9vw;
}

.sectionHolder {
  height: 75px;
  width: 100vw;
  max-width: 100%;
  background-color: rgb(52, 49, 42);
}

.navbar {
  height: 75px;
  width: 100vw;
  max-width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c4c4c4;
  z-index: 200;
  padding-right: 10px;
}

a.router-link-exact-active {
  color: rgb(0, 183, 0);
}

a:hover {
  color: rgb(0, 144, 0);
  transition: all 0.4s ease;
}

.svg:hover {
  transition: all 0.4s ease;
  filter: invert(30%) sepia(100%) saturate(500%) hue-rotate(100deg);
}
/* V left----------------------------------------------------------------------------- */

.leftNav {
  position: fixed;
  height: 100vh;
  width: 9vw;
  max-width: 100%;
  background-color: #ddd;
  top: 0;
  z-index: 100;
}

.leftNavLayout {
  top: 75px;
  width: 100%;
}

.showPageOne {
  background-color: #ddd;
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.rightLayuot {
  background-color: #000;
}
/* A left----------------------------------------------------------------------------- */
/* V right--------------------------------------------------------------------------- */

.rightSection {
  position: absolute;
  width: 90vw;
  max-width: 100%;
  right: 0;
  background-color: #565656;
  min-height: 100.1vh;
}

/* A right---------------------------------------------------------------------------- */
</style>
