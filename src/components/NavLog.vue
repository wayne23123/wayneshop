<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
const userStore = useUserStore();

const router = useRouter();
const confirm = () => {
  // 退出登陸邏輯
  // 1. 清除用戶訊息 觸發 action
  userStore.clearUserInfo();
  // 2. 跳轉到登入頁
  router.push("/login");
};
</script>

<template>
  <nav>
    <div class="navContainer">
      <ul>
        <!-- 登入時顯示 -->
        <!-- 是否有 token -->
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:;" @click="$router.push('/member')"
              ><i class="iconfont icon-user"></i>
              <!-- {{ userStore.userInfo.account }} -->
              test001
            </a>
          </li>
          <li>
            <el-popconfirm
              @confirm="confirm"
              title="確定退出嗎?"
              confirm-button-text="確定"
              cancel-button-text="取消"
            >
              <template #reference>
                <a href="javascript:;">退出登陸</a>
              </template>
            </el-popconfirm>
          </li>
          <li>
            <a href="javascript:;" @click="$router.push('/member/order')"
              >我的訂單</a
            >
          </li>
          <li>
            <a href="javascript:;" @click="$router.push('/member/')"
              >會員中心</a
            >
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')" class="borR"
              >登錄</a
            >
          </li>
          <li><a href="javascript:;" class="borR">幫助</a></li>
          <li><a href="javascript:;">關於</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: #2b2a2a;
  color: white;
  height: 25px;
}

a {
  color: white;
  padding: 0 20px 0 20px;
}

.borR {
  border-right: 1px solid white;
}

a:hover {
  color: greenyellow;
}

ul {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}
</style>
