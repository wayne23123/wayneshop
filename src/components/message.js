// 需要渲染一個提示效果
import { createVNode, render } from "vue";
import Message from "./my-message.vue";

// 動態創建一個 DOM 容器
const div = document.createElement("div");
div.setAttribute("class", "my-meassage-container");
document.body.appendChild(div);

export default ({ text, type }) => {
  let timer = null;

  // createVNode 用於創建一個虛擬節點
  // 參數一支持組件
  // 參數二表示傳遞給組件的選項
  const vnode = createVNode(Message, { text, type });
  // 把虛擬節點渲染到頁面中的 DOM
  // render函數的參數
  // 參數一表示要渲染的內容(虛擬節點)
  // 參數二表示渲染的目標位置( DOM 元素 )
  render(vnode, div);

  // 希望提示在1秒後消失
  clearTimeout(timer);
  timer = setTimeout(() => {
    // 清空 div 中的內容
    render(null, div);
  }, 2000);
};

// $message({ text: 'test', type: 'error'})
