<script setup></script>

<template>
  <section>
    <div class="footerLayout">
      <div class="centerWord"><div>聯絡我們 :</div></div>

      <div class="centerWord">
        <a href="https://github.com/wayne23123/" class="pad5"
          ><img src="../assets/svgs/github.svg" width="50" alt=""
        /></a>
        <router-link to="/" class="pad5">
          <img src="../assets/svgs/facebook.svg" width="50" />
        </router-link>

        <router-link to="/" class="pad5">
          <img src="../assets/svgs/instergram.svg" width="50" />
        </router-link>
        <router-link to="/" class="pad5">
          <img src="../assets/svgs/twitter.svg" width="50" />
        </router-link>
      </div>

      <div class="centerWord"><div>© Wayne Lu 2023</div></div>
      <div class="centerWord"><div>本網頁僅供學習使用 無任何商業用途</div></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  z-index: 100;
  width: 100vw;
  padding: 50px 0;
  max-width: 100%;
  background-color: $grayColor;
  display: flex;
  justify-content: center;
  .footerLayout {
    width: 40vw;

    div {
      color: black;
    }

    .centerWord {
      display: flex;
      justify-content: center;
      font-size: 30px;

      .pad5 {
        padding: 5px;
      }

      img:hover {
        filter: invert(30%) sepia(100%) saturate(2000%) hue-rotate(100deg);
      }
    }
  }
}
</style>
