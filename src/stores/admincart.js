import { ref, computed } from "vue";
import { defineStore } from "pinia";
import w001 from "@/assets/imgs/w001.jpg";
import w002 from "@/assets/imgs/w002.jpg";
import w003 from "@/assets/imgs/w003.jpg";
import w004 from "@/assets/imgs/w004.jpg";
import w005 from "@/assets/imgs/w005.jpg";
import w006 from "@/assets/imgs/w006.jpg";
import w007 from "@/assets/imgs/w007.jpg";
import w008 from "@/assets/imgs/w008.jpg";
import w009 from "@/assets/imgs/w009.jpg";
import w010 from "@/assets/imgs/w010.jpg";
import w011 from "@/assets/imgs/w011.jpg";
import w012 from "@/assets/imgs/w012.jpg";
import w013 from "@/assets/imgs/w013.jpg";
import w014 from "@/assets/imgs/w014.jpg";
import w015 from "@/assets/imgs/w015.jpg";
import w016 from "@/assets/imgs/w016.jpg";
import w017 from "@/assets/imgs/w017.jpg";
import w018 from "@/assets/imgs/w018.jpg";
import w019 from "@/assets/imgs/w019.jpg";
import w020 from "@/assets/imgs/w020.jpg";

export const useAdminCartStore = defineStore(
  "admincarts",
  () => {
    const admincarts = ref([
      {
        id: 1,
        order: "0810105034001",
        img: w001,
        title: "燈芯絨水手帽",
        category: "hat",
        star: "★★★★",
        stars: 4,
        price: 1200,
        description:
          "粗條燈芯絨；主題繡花，為今年聖誕設計的幾何小圖；男女皆可戴。",
        color: "orange",
        label: "Other",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "wayne@gmail.com",
        name: "wayne",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T02:50:34.992Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 10,
        minutes: 50,
        seconds: 34,
        pay: false,
        complete: false,
      },
      {
        id: 1,
        order: "0810105034001",
        img: w001,
        title: "燈芯絨水手帽",
        category: "hat",
        star: "★★★★",
        stars: 4,
        price: 1200,
        description:
          "粗條燈芯絨；主題繡花，為今年聖誕設計的幾何小圖；男女皆可戴。",
        color: "orange",
        label: "Other",
        counter: 1,
        size: "XL",
        kupeng: false,
        email: "wayne@gmail.com",
        name: "wayne",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T02:50:34.992Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 10,
        minutes: 50,
        seconds: 34,
        pay: false,
        complete: false,
      },
      {
        id: 3,
        order: "0810105034001",
        img: w003,
        title: "Champion AS拼色運動外套(綠色)",
        category: "clothes",
        star: "★★★",
        stars: 3,
        price: 2100,
        description: "Puma經典款；低筒；麂皮材質復古",
        color: "green",
        label: "Champion",
        counter: 1,
        size: "XL",
        kupeng: false,
        email: "wayne@gmail.com",
        name: "wayne",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T02:50:34.992Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 10,
        minutes: 50,
        seconds: 34,
        pay: false,
        complete: false,
      },

      {
        id: 1,
        order: "0810111848002",
        img: w001,
        title: "燈芯絨水手帽",
        category: "hat",
        star: "★★★★",
        stars: 4,
        price: 1200,
        description:
          "粗條燈芯絨；主題繡花，為今年聖誕設計的幾何小圖；男女皆可戴。",
        color: "orange",
        label: "Other",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 2,
        order: "0810111848002",
        img: w002,
        title: "Puma Suede Classic",
        category: "shoes",
        star: "★★★★★",
        stars: 5,
        price: 3000,
        description: "Puma經典款；低筒；麂皮材質復古",
        color: "black",
        label: "Puma",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 3,
        order: "0810111848002",
        img: w003,
        title: "Champion AS拼色運動外套(綠色)",
        category: "clothes",
        star: "★★★",
        stars: 3,
        price: 2100,
        description: "Puma經典款；低筒；麂皮材質復古",
        color: "green",
        label: "Champion",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 4,
        order: "0810111848002",
        img: w004,
        title: "Vans old skool",
        category: "shoes",
        star: "★★★★★",
        stars: 5,
        price: 3200,
        description: "Vans經典不敗款",
        color: "black",
        label: "vans",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 5,
        order: "0810111848002",
        img: w005,
        title: "STOCK CUFF BEANIE",
        category: "hat",
        star: "★★★★",
        stars: 4,
        price: 1000,
        description: "羅紋結構、輕量材質、電鏽LOGO，100%壓克力纖維",
        color: "black",
        label: "other",
        counter: 2,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 6,
        order: "0810111848002",
        img: w006,
        title: "BIG LOGO LOW PRO CAP",
        category: "hat",
        star: "★★★★",
        stars: 4,
        price: 1300,
        description: "可調肘節調節器、EVA軟遮陽板，70％尼龍/ 30％棉",
        color: "blue",
        label: "other",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 7,
        order: "0810111848002",
        img: w007,
        title: "Champion AS復古拼色外套",
        category: "clothes",
        star: "★★★",
        stars: 3,
        price: 2500,
        description: "100%滌綸，兩側口袋有拉鍊",
        color: "blue",
        label: "Champion",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 8,
        order: "0810111848002",
        img: w008,
        title: "Champion AS運動長褲(黑色)",
        category: "pants",
        star: "★★★",
        stars: 3,
        price: 1900,
        description: "100%尼龍",
        color: "black",
        label: "Champion",
        counter: 1,
        size: "M",
        kupeng: false,
        email: "neo@gmail.com",
        name: "neo",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:18:48.089Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 18,
        seconds: 48,
        pay: false,
        complete: false,
      },
      {
        id: 5,
        order: "0810111731003",
        img: w005,
        title: "STOCK CUFF BEANIE",
        category: "hat",
        star: "★★★★",
        stars: 4,
        price: 1000,
        description: "羅紋結構、輕量材質、電鏽LOGO，100%壓克力纖維",
        color: "black",
        label: "other",
        counter: 13,
        size: "M",
        kupeng: false,
        email: "jack@gmail.com",
        name: "jack",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:17:31.710Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 17,
        seconds: 31,
        pay: false,
        complete: false,
      },
      {
        id: 5,
        order: "0810111731003",
        img: w005,
        title: "STOCK CUFF BEANIE",
        category: "hat",
        star: "★★★★",
        stars: 4,
        price: 1000,
        description: "羅紋結構、輕量材質、電鏽LOGO，100%壓克力纖維",
        color: "black",
        label: "other",
        counter: 8,
        size: "XL",
        kupeng: false,
        email: "jack@gmail.com",
        name: "jack",
        telphone: "09123",
        adress: "test",
        message: "",
        d: "2023-08-10T03:17:31.710Z",
        year: 2023,
        month: 8,
        date: 10,
        hours: 11,
        minutes: 17,
        seconds: 31,
        pay: false,
        complete: false,
      },
    ]);

    // V order-------------------------------------------------------------------------------------------

    // 創建一個空陣列，用於存儲將來計算出的訂單
    const orderRefs = ref([]);

    // 創建一個計算屬性，用於將購物車數據轉換為訂單數據
    const orderFunction = computed(() => {
      // 使用reduce方法計算訂單，acc是最終累積結果，cur是當前遍歷到的購物車數據
      const result = admincarts.value.reduce((acc, cur) => {
        const order = cur.order;
        // 如果acc中不存在當前訂單號碼，則創建一個空陣列，並且添加當前購物車數據到陣列中
        if (!acc[order]) {
          acc[order] = [];
        }
        acc[order].push(cur);
        // 返回最終累積結果
        return acc;
      }, {});

      // 將計算結果中的所有訂單添加到orderRefs中
      orderRefs.value = Object.values(result);

      // 返回計算結果
      return result;
    });

    // 反轉訂單順序
    function reverseOrderRefs() {
      orderRefs.value.reverse();
    }

    // 搜尋關鍵字的 ref 變數
    const orderSearchTermRef = ref("");

    // 透過 computed 屬性，建立一個搜尋後的商品列表
    const orderSearchTermFunction = computed(() => {
      // 如果搜尋關鍵字為空，則回傳全部訂單列表
      if (orderSearchTermRef.value === "") {
        return orderRefs.value;
      } else {
        // 其他情況，回傳包含搜尋關鍵字的訂單列表
        return orderRefs.value.filter((order) => {
          return order.some((admincart) => {
            return admincart.order.includes(orderSearchTermRef.value);
          });
        });
      }
    });

    // A order-------------------------------------------------------------------------------------------
    // V orderUndo-------------------------------------------------------------------------------------------

    // 創建一個空陣列，用於存儲將來計算出的訂單
    const orderUndoRefs = ref([]);

    // 創建一個計算屬性，用於將購物車數據轉換為訂單數據
    const orderUndoFunction = computed(() => {
      //先用 filter 先對 admincarts 過濾出 complete 為 false
      const undo = admincarts.value.filter((item) => item.complete == false);

      // 使用reduce方法計算訂單，acc是最終累積結果，cur是當前遍歷到的購物車數據
      const result = undo.reduce((acc, cur) => {
        const order = cur.order;

        // 如果acc中不存在當前訂單號碼，則創建一個空陣列，並且添加當前購物車數據到陣列中
        if (!acc[order]) {
          acc[order] = [];
        }

        acc[order].push(cur);
        return acc;
      }, {});

      // 將計算結果中的所有訂單添加到orderUndoRefs中
      orderUndoRefs.value = Object.values(result);

      return result;
    });

    // 反轉訂單順序
    function reverseOrderUndoRefs() {
      orderUndoRefs.value.reverse();
    }

    // 搜尋關鍵字的 ref 變數
    const orderUndoSearchTermRef = ref("");

    // 透過 computed 屬性，建立一個搜尋後的商品列表
    const orderUndoSearchTermFunction = computed(() => {
      // 如果搜尋關鍵字為空，則回傳全部訂單列表
      if (orderUndoSearchTermRef.value === "") {
        return orderUndoRefs.value;
      } else {
        // 其他情況，回傳包含搜尋關鍵字的訂單列表
        return orderUndoRefs.value.filter((order) => {
          return order.some((admincart) => {
            return admincart.order.includes(orderUndoSearchTermRef.value);
          });
        });
      }
    });

    // A orderUndo--------------------------------------------------------------------------------------------

    // V orderDone-------------------------------------------------------------------------------------------

    // 創建一個空陣列，用於存儲將來計算出的訂單
    const orderDoneRefs = ref([]);

    const orderDoneFunction = computed(() => {
      //先用 filter 先對 admincarts 過濾出 complete 為 true
      const done = admincarts.value.filter((item) => item.complete == true);
      // 使用reduce方法計算訂單，acc是最終累積結果，cur是當前遍歷到的購物車數據
      const result = done.reduce((acc, cur) => {
        const order = cur.order;
        // 如果acc中不存在當前訂單號碼，則創建一個空陣列，並且添加當前購物車數據到陣列中
        if (!acc[order]) {
          acc[order] = [];
        }
        acc[order].push(cur);
        return acc;
      }, {});

      // 將計算結果中的所有訂單添加到orderDoneRefs中
      orderDoneRefs.value = Object.values(result);

      return result;
    });

    // 反轉訂單順序
    function reverseOrderDoneRefs() {
      orderDoneRefs.value.reverse();
    }

    // 搜尋關鍵字的 ref 變數
    const orderDoneSearchTermRef = ref("");

    // 透過 computed 屬性，建立一個搜尋後的商品列表
    const orderDoneSearchTermFunction = computed(() => {
      // 如果搜尋關鍵字為空，則回傳全部訂單列表
      if (orderDoneSearchTermRef.value === "") {
        return orderDoneRefs.value;
      } else {
        // 其他情況，回傳包含搜尋關鍵字的訂單列表
        return orderDoneRefs.value.filter((order) => {
          return order.some((admincart) => {
            return admincart.order.includes(orderDoneSearchTermRef.value);
          });
        });
      }
    });

    // A orderDone--------------------------------------------------------------------------------------------

    return {
      admincarts,

      orderRefs,
      orderFunction,
      reverseOrderRefs,
      orderSearchTermRef,
      orderSearchTermFunction,

      orderUndoRefs,
      orderUndoFunction,
      reverseOrderUndoRefs,
      orderUndoSearchTermRef,
      orderUndoSearchTermFunction,

      orderDoneRefs,
      orderDoneFunction,
      reverseOrderDoneRefs,
      orderDoneSearchTermRef,
      orderDoneSearchTermFunction,
    };
  },
  {
    persist: true,
  }
);
