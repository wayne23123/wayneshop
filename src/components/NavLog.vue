<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();
const confirm = () => {
  // 退出登入邏輯
  localStorage.removeItem("token");
  // 1. 清除用戶訊息 觸發 action
  userStore.clearUserInfo();
  // 2. 跳轉到登入頁
  router.push("/login");
};
</script>

<template>
  <nav>
    <div>
      <ul>
        <!-- 登入時顯示 -->
        <!-- 是否有 token -->
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:;" @click="$router.push('/member')">
              <span class="imgLayout">
                <img
                  :src="userStore.userInfo.img"
                  alt=""
                  width="14"
                  height="14"
                  style="border-radius: 50%"
              /></span>
              <span class="padL10">{{ userStore.userInfo.name }}</span>
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
          <li>
            <RouterLink class="borR" to="/about">幫助</RouterLink>
          </li>
          <li><RouterLink to="/about">關於</RouterLink></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "@/styles/var.scss";
// $yellowColor;

.dis {
  display: flex;
}

nav {
  background-color: #2b2a2a;
  height: 25px;

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;

    li {
      a {
        color: $whiteColor;
        padding: 0 20px 0 20px;

        .imgLayout {
          width: 170px;
          height: 170px;
          border-radius: 50%;
          overflow: hidden;
        }

        .padL10 {
          padding: 0 0 0 10px;
        }
      }

      a:hover {
        color: $hoverGreenColor;
      }

      .borR {
        border-right: 1px solid $whiteColor;
      }
    }
  }
}
</style>
