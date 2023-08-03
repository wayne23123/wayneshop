// axios基礎的封裝
import axios from "axios";
import { useUserStore } from "../stores/user";
import router from "@/router";

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// 攔截器

// axios請求攔截器
httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => Promise.reject(e)
);

// axios響應式攔截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    // 統一錯誤提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });

    // 401 token 失效處理
    // 1. 清除本地用戶數據
    // 2. 跳轉登入頁
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }

    return Promise.reject(e);
  }
);

export default httpInstance;
