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
