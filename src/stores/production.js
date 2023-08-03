import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useProductionStore = defineStore("productions", () => {
  const productions = ref([
    {
      id: 1,
      order: "",
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
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 2,
      order: "",
      img: "./src/assets/imgs/w002.jpg",
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
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 3,
      order: "",
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
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 4,
      order: "",
      img: "./src/assets/imgs/w004.jpg",
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
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 5,
      order: "",
      img: "./src/assets/imgs/w005.jpg",
      title: "STOCK CUFF BEANIE",
      category: "hat",
      star: "★★★★",
      stars: 4,
      price: 1000,
      description: "羅紋結構、輕量材質、電鏽LOGO，100%壓克力纖維",
      color: "black",
      label: "other",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 6,
      order: "",
      img: "./src/assets/imgs/w006.jpg",
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
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 7,
      order: "",
      img: "./src/assets/imgs/w007.jpg",
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
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 8,
      order: "",
      img: "./src/assets/imgs/w008.jpg",
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
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 9,
      order: "",
      img: "./src/assets/imgs/w009.jpg",
      title: "經典嘻哈復古拼接外套",
      category: "clothes",
      star: "★★★★★",
      stars: 5,
      price: 2400,
      description: "兩側口袋、100%尼龍、Oversize",
      color: "purple",
      label: "other",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 10,
      order: "",
      img: "./src/assets/imgs/w010.jpg",
      title: "Adidas Superstar",
      category: "shoes",
      star: "★★★★",
      stars: 4,
      price: 3600,
      description: "adidas金典款，採用優質皮革鞋面，柔軟舒適，提供透氣性",
      color: "white",
      label: "adidas",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 11,
      order: "",
      img: "./src/assets/imgs/w011.jpg",
      title: "Nike Air Force 1 '07",
      category: "shoes",
      star: "★★★★★",
      stars: 5,
      price: 3800,
      description:
        "泡棉中底，金屬飾標印有「AF1」字樣，腳尖處採沖孔設計，橡膠鞋底",
      color: "white",
      label: "nike",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 12,
      order: "",
      img: "./src/assets/imgs/w012.jpg",
      title: "8 BALL TEE",
      category: "clothes",
      star: "★★★",
      stars: 3,
      price: 1800,
      description: "正常版型TEE、螺紋領口、印刷LOGO、100%棉質",
      color: "black",
      label: "other",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 13,
      order: "",
      img: "./src/assets/imgs/w013.jpg",
      title: "TRIBAL MASK TEE",
      category: "clothes",
      star: "★★★",
      stars: 3,
      price: 1700,
      description: "正常版型TEE、螺紋領口、印刷LOGO、100%棉質",
      color: "black",
      label: "other",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 14,
      order: "",
      img: "./src/assets/imgs/w014.jpg",
      title: "Champion AS拼色運動長褲",
      category: "clothes",
      star: "★★★★★",
      stars: 5,
      price: 2400,
      description: "100%尼龍",
      color: "black",
      label: "other",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 15,
      order: "",
      img: "./src/assets/imgs/w015.jpg",
      title: "Champion 棒球外套",
      category: "clothes",
      star: "★★★★★",
      stars: 5,
      price: 3000,
      description:
        "Nylon Washer外層；100%尼龍；襯裡:100%聚酯纖維；羅紋: 98%聚酯纖維 2%聚氨酯",
      color: "green",
      label: "other",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
    {
      id: 16,
      order: "",
      img: "./src/assets/imgs/w016.jpg",
      title: "CLASSIC COACH JACKET",
      category: "clothes",
      star: "★★★",
      stars: 3,
      price: 2100,
      description:
        "尖角衣領、彈性伸縮袖口、全鈕扣式開襟、正面斜口袋、腰部可調式拉繩",
      color: "blue",
      label: "other",
      counter: 1,
      size: "M",
      kupeng: false,
      email: "",
      name: "",
      telphone: "",
      adress: "",
      message: "",
      d: "",
      year: "",
      month: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      pay: false,
      complete: false,
    },
  ]);

  // 搜尋關鍵字的 ref 變數
  const searchTerm = ref("");

  // 透過 computed 屬性，建立一個搜尋後的商品列表
  const searchedProductionTitle = computed(() => {
    // 如果搜尋關鍵字為空，則回傳全部商品列表
    if (searchTerm.value === "") {
      return productions.value;
    } else if (searchTerm.value === "hat") {
      // 如果搜尋關鍵字為特定商品類別，則回傳該類別的商品列表
      return productions.value.filter((production) => {
        return production.category == searchTerm.value;
      });
    } else if (searchTerm.value === "shoes") {
      return productions.value.filter((production) => {
        return production.category == searchTerm.value;
      });
    } else if (searchTerm.value === "clothes") {
      return productions.value.filter((production) => {
        return production.category == searchTerm.value;
      });
    } else if (searchTerm.value === "pants") {
      return productions.value.filter((production) => {
        return production.category == searchTerm.value;
      });
    } else {
      // 其他情況，回傳包含搜尋關鍵字的商品列表
      return productions.value.filter((production) => {
        return production.title.includes(searchTerm.value);
      });
    }
  });

  // 依照商品 id 來刪除商品的函式
  const deleteProductFunction = (id) => {
    const index = productions.value.findIndex((p) => p.id === id);
    if (index > -1) {
      productions.value.splice(index, 1);
    }
  };

  // 宣告名為 titleEditRef 的 ref 變數，用來儲存欲修改的商品名稱
  const titleEditRef = ref("");

  const titleEditDone = ref(false);

  // 依照商品 id 修改商品名稱的函式
  const titleEditFunction = (id) => {
    if (titleEditRef.value == "") {
      alert("請輸入新商品標題");
      return;
    }
    const index = productions.value.findIndex((p) => p.id === id);
    if (index > -1) {
      productions.value[index].title = titleEditRef.value;
    }
    titleEditDone.value = true;
  };

  // 宣告名為 categoryEditRef 的 ref 變數，用來儲存欲修改的商品類別
  const categoryEditRef = ref("");

  const categoryEditDone = ref(false);

  // 修改商品類別的函式
  const categoryEditFunction = (id) => {
    const index = productions.value.findIndex((p) => p.id === id);
    if (index > -1) {
      productions.value[index].category = categoryEditRef.value;
    }
    categoryEditDone.value = true;
  };

  // 創建兩個空字符串的 ref 變數，用來保存星星數量和星星符號
  const starsEditRef = ref("");
  const starEditRef = ref("");

  const starsEditDone = ref(false);

  // 編輯星星數量的函數，接受一個ID參數，用來查找要編輯的產品
  const starsEditFunction = (id) => {
    // 使用 findIndex 方法在 productions 中查找具有相同ID的產品
    const index = productions.value.findIndex((p) => p.id === id);
    if (index > -1) {
      // 如果找到了該產品，則更新starsEditRef的值
      productions.value[index].stars = starsEditRef.value;
      // 根據starsEditRef的值來設置starEditRef的值，這是一個星星符號的字符串
      if (starsEditRef.value == 1) {
        starEditRef.value = "★";
      } else if (starsEditRef.value == 2) {
        starEditRef.value = "★★";
      } else if (starsEditRef.value == 3) {
        starEditRef.value = "★★★";
      } else if (starsEditRef.value == 4) {
        starEditRef.value = "★★★★";
      } else {
        starEditRef.value = "★★★★★";
      }
      // 將starEditRef的值更新到產品對象的star屬性中
      productions.value[index].star = starEditRef.value;
    }
    starsEditDone.value = true;
  };

  // 創建一個空字符串的ref變數，用來保存價格
  const priceEditRef = ref("");

  const priceEditDone = ref(false);

  // 編輯價格的函數，接受一個ID參數，用來查找要編輯的產品
  const priceEditFunction = (id) => {
    if (priceEditRef.value == "") {
      alert("請輸入新商品價格");
      return;
    }
    if (priceEditRef.value < 0) {
      alert("商品價格不可以小於0");
      return;
    }
    if (priceEditRef.value == 0) {
      alert("商品價格不可以等於0");
      return;
    }
    // 使用 findIndex 方法在 productions 中查找具有相同ID的產品
    const index = productions.value.findIndex((p) => p.id === id);
    if (index > -1) {
      // 如果找到了該產品，則更新priceEditRef的值
      productions.value[index].price = priceEditRef.value;
    }
    priceEditDone.value = true;
  };

  return {
    productions,
    searchTerm,
    searchedProductionTitle,
    deleteProductFunction,

    titleEditRef,
    titleEditDone,
    titleEditFunction,

    categoryEditRef,
    categoryEditDone,
    categoryEditFunction,

    starsEditRef,
    starEditRef,
    starsEditDone,
    starsEditFunction,

    priceEditRef,
    priceEditDone,
    priceEditFunction,
  };
});
