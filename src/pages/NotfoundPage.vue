<script setup>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <NavBar />
  <section>
    <div class="pageContainer">
      <div class="disCen">
        <div>
          <img src="../assets/wrong.svg" alt="" />
          <br />
          <hr />
          <br />
          <div class="disCen">404 找不到頁面</div>
          <br />
          <div class="disCen">請回到首頁繼續操作</div>
          <br />
          <hr />
          <br />
          <div class="disCen">
            <router-link to="/"
              ><div class="svgHover"><img src="../assets/svgs/wss.svg" /></div
            ></router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped lang="scss">
@import "@/styles/var.scss";
// $yellowColor;
section {
  .pageContainer {
    width: 100vw;
    max-width: 100%;
    padding: 50px 0;
    background-color: #171717;
    color: #c4c4c4;
  }

  .svgHover:hover {
    transition: all 0.4s ease;
    filter: invert(30%) sepia(100%) saturate(500%) hue-rotate(100deg);
  }
}
</style>
