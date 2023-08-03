<script setup></script>

<template>
  <section class="sectionFooter">
    <div class="footerLayout">
      <br />
      <br />
      <div class="centerWord"><div>聯絡我們 :</div></div>

      <div class="centerWord">
        <a href="https://github.com/wayne23123/" class="padding"
          ><img src="../assets/svgs/github.svg" alt=""
        /></a>
        <router-link to="/" class="padding">
          <img src="../assets/svgs/facebook.svg" />
        </router-link>

        <router-link to="/" class="padding">
          <img src="../assets/svgs/instergram.svg" />
        </router-link>
        <router-link to="/" class="padding">
          <img src="../assets/svgs/twitter.svg" />
        </router-link>
      </div>

      <div class="centerWord"><div>© Wayne Lu 2023</div></div>
      <div class="centerWord"><div>本網頁僅供學習使用 無任何商業用途</div></div>
    </div>
  </section>
</template>

<style scoped>
.sectionFooter {
  position: absolute;
  z-index: 100;
  height: 220px;
  width: 100vw;
  max-width: 100%;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
}

.footerLayout {
  width: 40vw;
}

div {
  color: black;
}

.padding {
  padding: 5px;
}

.centerWord {
  display: flex;
  justify-content: center;
}

img:hover {
  filter: invert(30%) sepia(100%) saturate(2000%) hue-rotate(100deg);
}
</style>
