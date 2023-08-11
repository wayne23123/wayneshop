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
    // 1.從 pinia 獲取 token 數據
    const userStore = useUserStore();
    // 2.照後端的要求拼接token
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      // 先 import router from "@/router"; 再調用router方法
      router.push("/login");
    }

    return Promise.reject(e);
  }
);

export default httpInstance;
