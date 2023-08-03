import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAdminCartStore = defineStore("admincarts", () => {
  const admincarts = ref([
    {
      id: 1,
      order: "0426162619011",
      img: "./src/assets/imgs/w001.jpg",
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
      kupeng: true,
      email: "wayne@gmail.com",
      name: "wayne",
      telphone: "test",
      adress: "test",
      message: "test11",
      d: "2023-04-26T08:26:19.358Z",
      year: 2023,
      month: 4,
      date: 26,
      hours: 16,
      minutes: 26,
      seconds: 19,
      pay: true,
      complete: true,
    },
    {
      id: 3,
      order: "0426162619011",
      img: "./src/assets/imgs/w003.jpg",
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
      kupeng: true,
      email: "wayne@gmail.com",
      name: "wayne",
      telphone: "test",
      adress: "test",
      message: "test11",
      d: "2023-04-26T08:26:19.358Z",
      year: 2023,
      month: 4,
      date: 26,
      hours: 16,
      minutes: 26,
      seconds: 19,
      pay: true,
      complete: true,
    },
    {
      id: 1,
      order: "0426163932012",
      img: "./src/assets/imgs/w001.jpg",
      title: "燈芯絨水手帽",
      category: "hat",
      star: "★★★★",
      stars: 4,
      price: 1200,
      description:
        "粗條燈芯絨；主題繡花，為今年聖誕設計的幾何小圖；男女皆可戴。",
      color: "orange",
      label: "Other",
      counter: 10,
      size: "M",
      kupeng: false,
      email: "mike@gmail.com",
      name: "mike",
      telphone: "test",
      adress: "test",
      message: "test12",
      d: "2023-04-26T08:39:32.001Z",
      year: 2023,
      month: 4,
      date: 26,
      hours: 16,
      minutes: 39,
      seconds: 32,
      pay: true,
      complete: false,
    },
    {
      id: 1,
      order: "0426174333013",
      img: "./src/assets/imgs/w001.jpg",
      title: "燈芯絨水手帽",
      category: "hat",
      star: "★★★★",
      stars: 4,
      price: 1200,
      description: "粗條燈芯絨；主題繡花，為今年聖誕設計的幾何小；男女皆可戴。",
      color: "orange",
      label: "Other",
      counter: 6,
      size: "M",
      kupeng: true,
      email: "admin@gmail.com",
      name: "admin",
      telphone: "test",
      adress: "test",
      message: "test13",
      d: "2023-04-26T09:43:33.558Z",
      year: 2023,
      month: 4,
      date: 26,
      hours: 17,
      minutes: 43,
      seconds: 33,
      pay: true,
      complete: false,
    },
    {
      id: 2,
      order: "0426174333013",
      img: "./src/assets/imgs/w002.jpg",
      title: "Puma Suede Classic",
      category: "shoes",
      star: "★★★★★",
      stars: 5,
      price: 3000,
      description: "Puma經典款；低筒；麂皮材質復古",
      color: "black",
      label: "Puma",
      counter: 6,
      size: "M",
      kupeng: true,
      email: "admin@gmail.com",
      name: "admin",
      telphone: "test",
      adress: "test",
      message: "test13",
      d: "2023-04-26T09:43:33.558Z",
      year: 2023,
      month: 4,
      date: 26,
      hours: 17,
      minutes: 43,
      seconds: 33,
      pay: true,
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
});
