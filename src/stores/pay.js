import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePayStore = defineStore("pays", () => {
  const pays = ref([
    {
      id: 1,
      order: "",
      img: "./src/assets/imgs/w001.jpg",
      title: "測試用資料",
      category: "hat",
      star: "★★★★",
      stars: 4,
      price: 0,
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
      pay: true,
      complete: false,
    },
  ]);

  // 更新 pays 陣列中每個元素的 pay 屬性為 true
  function updateMultiplePayValues() {
    for (let i = 0; i < pays.value.length; i++) {
      pays.value[i].pay = true;
    }
  }

  return {
    pays,
    updateMultiplePayValues,
  };
});
