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

export const useCartStore = defineStore(
  "carts",
  () => {
    const carts = ref([]);

    // 用來跟 carts 比較是否已經存在購物車
    const emptyRefs = ref([]);

    // 將 emptyRefs 中的商品資料與 carts 中的商品資料進行比較，
    // 如果有相同的商品，則將數量加總起來，
    // 如果沒有相同的商品，則將商品資料加入到 carts 中
    function comparisonByIdFunction() {
      // 用forEach對 emptyRefs 陣列中的每筆資料進行比較
      emptyRefs.value.forEach((emptyRef) => {
        const existingProduct = this.carts.find(
          (product) =>
            product.id === emptyRef.id && product.size === emptyRef.size
          // 判斷只有當 product.id 和 product.size 都相等 emptyRef 時才返回 true
        );
        if (existingProduct) {
          // 如果商品已經存在在 carts 陣列中，則將數量 counter 加上 emptyRefs 的數量
          existingProduct.counter += emptyRef.counter;
        } else {
          // 如果不存在，則將這筆資料加入到 carts 陣列中
          this.carts.push({
            id: emptyRef.id,
            order: emptyRef.order,
            img: emptyRef.img,
            title: emptyRef.title,
            category: emptyRef.category,
            star: emptyRef.star,
            stars: emptyRef.stars,
            price: emptyRef.price,
            description: emptyRef.description,
            color: emptyRef.color,
            label: emptyRef.label,
            counter: emptyRef.counter,
            size: emptyRef.size, // 新增 size 屬性
            kupeng: emptyRef.kupeng,
            email: emptyRef.email,
            name: emptyRef.name,
            telphone: emptyRef.telphone,
            adress: emptyRef.adress,
            message: emptyRef.message,
            d: emptyRef.d,
            year: emptyRef.year,
            month: emptyRef.month,
            date: emptyRef.date,
            hours: emptyRef.hours,
            minutes: emptyRef.minutes,
            seconds: emptyRef.seconds,
            pay: emptyRef.pay,
            complete: emptyRef.complete,
          });
        }
      });

      emptyRefs.value = [];
      // 將 emptyRefs 清空，因為商品已經加入到 carts 中了
    }

    // 用來清空購物車
    function clearCartFunction() {
      ElMessage({ type: "success", message: "清空購物車成功" });
      carts.value = [];
    }

    // 用來判斷購物車裡面有無商品,有則回傳 true
    function cartsHasProductionFunction() {
      return carts.value && carts.value.length > 0;
    }

    // 計算購物車裡的商品總價格
    function calculateTotalPrice() {
      let sum = 0;
      carts.value.forEach((product) => {
        sum += product.price * product.counter;
      });
      totalPrice.value = sum;
    }

    // 根據商品 id 與尺寸來移除購物車裡的商品
    function removeCartItemById(id, size) {
      ElMessage({ type: "success", message: "移除成功" });
      const index = carts.value.findIndex(
        (product) => product.id === id && product.size === size
      );
      if (index !== -1) {
        carts.value.splice(index, 1);
      }
    }

    // 根據商品 id 與尺寸來增加購物車裡的商品數量
    function increaseCartItemById(id, size) {
      ElMessage({ type: "success", message: "增加成功" });
      const product = carts.value.find(
        (product) => product.id === id && product.size === size
      );
      if (product) {
        product.counter++;
      }
    }

    // 根據商品 id 與尺寸來減少購物車裡的商品數量
    function decreaseCartItemById(id, size) {
      ElMessage({ type: "success", message: "減少成功" });
      const product = carts.value.find(
        (product) => product.id === id && product.size === size
      );
      if (product) {
        if (product.counter > 1) {
          product.counter--;
        } else {
          removeCartItemById(id, size);
        }
      }
    }

    // 更新 carts 陣列中每個元素的 kupeng 屬性為 true
    function updateMultipleKupengValues() {
      for (let i = 0; i < carts.value.length; i++) {
        carts.value[i].kupeng = true;
      }
    }

    return {
      carts,
      emptyRefs,
      comparisonByIdFunction,
      clearCartFunction,
      calculateTotalPrice,
      removeCartItemById,
      increaseCartItemById,
      decreaseCartItemById,
      cartsHasProductionFunction,
      updateMultipleKupengValues,
    };
  },
  {
    persist: true,
  }
);
