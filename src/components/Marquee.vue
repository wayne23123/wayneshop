<script setup></script>

<template>
  <div class="marquee">
    <div class="track">
      <p>狂賀網路商城新開張! 結帳時快輸入優惠碼open全品項享7折優惠!!!</p>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  width: 100vw;
  height: 60px;
  max-width: 100%;
  overflow: hidden;
  background-color: #daa520;
}

.track {
  position: absolute;
  animation: marquee 18s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(250%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
