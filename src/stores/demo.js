import { ref, computed } from "vue";
import { defineStore } from "pinia";

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
