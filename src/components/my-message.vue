<script>
import { onMounted, ref, reactive } from "vue";

export default {
  name: "MyMessage",
  props: {
    text: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      // warn 警告  error 錯誤  success 成功
      default: "warn",
    },
  },
  setup() {
    // 定義一個物件, 包含三種情況的樣式, 物件key 是類型字串
    const style = {
      warn: {
        icon: "✖ ",
        color: "#E6A23C",
        backgroundColor: "rgb(253, 246, 236)",
        borderColor: "rgb(250, 236, 216)",
      },
      error: {
        icon: "✖ ",
        color: "#F56C6C",
        backgroundColor: "rgb(254, 240, 240)",
        borderColor: "rgb(253, 226, 226)",
      },
      success: {
        icon: "✔ ",
        color: "#67C23A",
        backgroundColor: "rgb(240, 249, 235)",
        borderColor: "rgb(225, 243, 216)",
      },
    };

    const message = reactive({
      // 列數
    });

    // 控制動畫
    const isShow = ref(false);
    // 組件模板渲染成功後觸發
    onMounted(() => {
      isShow.value = true;
    });
    return { style, isShow };
  },
};
</script>

<template>
  <Transition name="listUp" tag="div">
    <div class="myMessage" :style="style[type]" v-show="isShow">
      <!-- 上面綁定樣式 -->
      <!-- 不同提示圖標會變 -->
      <!-- class="iconfont" :class="[style[type].icon]" -->
      <span>{{ style[type].icon }}</span>
      <span class="text">{{ text }}</span>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.myMessage {
  position: fixed;
  z-index: 9999;
  bottom: 100px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);

  span {
    font-size: 30px;
  }
}

.listUp-enter-active,
.listUp-leave-active {
  transition: all 0.8s ease;
}

.listUp-enter-from {
  transform: translate(-50%, 100%);
  opacity: 1;
}
.listUp-leave-to {
  opacity: 0;
}
</style>
