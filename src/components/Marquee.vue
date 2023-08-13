<script setup></script>

<template>
  <div class="marquee">
    <div class="track">
      <p>狂賀網路商城新開張! 結帳時快輸入優惠碼open全品項享7折優惠!!!</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  position: relative;
  width: 100vw;
  height: 60px;
  max-width: 100%;
  overflow: hidden;
  background-color: $yellowColor;

  .track {
    position: absolute;
    animation: marquee 18s linear infinite;

    p {
      font-size: 16px;
      color: #222;
      margin: 15px 0 20px 0;
    }
  }
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
