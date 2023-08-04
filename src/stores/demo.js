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

export const useDemoStore = defineStore("demos", () => {
  const demos = ref([]);

  // // sliceLastDemoFunction需要的空ref
  // const sliceLastDemoRef = ref("");

  // // 透過computed屬性計算最後一個範例的資訊
  // const sliceLastDemoFunction = computed(() => {
  //   // 取得最後一個範例的資訊
  //   const lastDemo = demos.value.slice(-1);
  //   // 將最後一個範例的標題儲存到sliceLastDemoRef變數中，如果不存在最後一個範例則sliceLastDemoRef設為空字串
  //   sliceLastDemoRef.value = lastDemo[0] ? lastDemo[0].title : "";
  //   // 回傳最後一個範例的資訊
  //   return lastDemo;
  // });

  // // 回傳 demos 的最後一個物件轉換成 JSON 格式的字串
  // const jsonLastDemosFunction = computed(() => {
  //   return JSON.stringify(demos.value[demos.value.length - 1]);
  // });

  return {
    demos,
    // sliceLastDemoRef,
    // sliceLastDemoFunction,
    // jsonLastDemosFunction,
  };
});
