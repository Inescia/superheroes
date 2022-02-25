<template>
  <v-app>
    <div v-if="false" style="background: red; width: 100%; height: 100%"></div>
    <router-view v-else />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      load: false,
    };
  },
  created() {
    if (!this.load) {
      this.$store.dispatch("fetchHeroes");
      this.load = true;
    }
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Allerta+Stencil);
h1 {
  font-family: "Allerta Stencil";
  font-size: 4em;
  letter-spacing: 0.15em;
  padding-right: 20px;
}
h3 {
  align-self: flex-end;
  font-family: "Allerta Stencil";
  font-size: 2em;
  letter-spacing: 0.05em;
  margin-top: -20px;
  margin-right: 20px;
  padding-right: 20px;
  text-align: right;
}

.v-btn {
  margin: 10px;
}

.title1 {
  align-self: center;
  margin-bottom: 10px;
  margin-top: -15px;
}
.title2 {
  align-self: flex-end;
}
.page {
  background-attachment: fixed;
  background-image: url("./assets/background.jpeg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
