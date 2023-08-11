import { createRouter, createWebHistory } from "vue-router";
import Layout from "../pages/Layout.vue";
import HomePage from "../pages/HomePage.vue";
import ShopPage from "../pages/ShopPage.vue";
import DemoPage from "../pages/DemoPage.vue";
import AboutPage from "../pages/AboutPage.vue";
import CartPage from "../pages/CartPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import PayPage from "../pages/PayPage.vue";
import FormPage from "../pages/FormPage.vue";
import MemberPage from "../pages/MemberPage.vue";
import UserInfo from "../components/UserInfo.vue";
import UserOrder from "../components/UserOrder.vue";
import OrderAll from "../components/OrderAll.vue";
import OrderUndo from "../components/OrderUndo.vue";
import OrderFinish from "../components/OrderFinish.vue";
import NotfoundPage from "../pages/NotfoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: HomePage,
        },
        {
          path: "shop",
          component: ShopPage,
        },
        {
          path: "demo",
          component: DemoPage,
        },
        {
          path: "about",
          component: AboutPage,
        },
        {
          path: "cart",
          component: CartPage,
        },
        {
          path: "form",
          component: FormPage,
        },
        {
          path: "pay",
          component: PayPage,
        },

        {
          path: "member",
          component: MemberPage,
          children: [
            {
              path: "",
              component: UserInfo,
            },
            {
              path: "order",
              component: UserOrder,
              children: [
                {
                  path: "",
                  component: OrderAll,
                },
                {
                  path: "undo",
                  component: OrderUndo,
                },
                {
                  path: "finish",
                  component: OrderFinish,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: LoginPage,
    },
    // 配置404找不到頁面
    { path: "/:pathMatch(.*)*", component: NotfoundPage },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

const whitelist = [
  "/",
  "/about",
  "/login",
  "/shop",
  "/demo",
  "/cart",
  "/form",
  "/pay",
];

// to 去哪 from從哪來 next跳轉到哪,不寫next不做跳轉
router.beforeEach((to, from, next) => {
  if (whitelist.includes(to.path) || localStorage.getItem("token")) {
    next();
  } else {
    next("/");
  }
});

export default router;
