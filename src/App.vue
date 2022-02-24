<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Allerta+Stencil);
h1 {
  font-family: "Allerta Stencil";
  font-size: 4em;
  padding-right: 20px;
  letter-spacing: 0.15em;
}
.title1 {
  align-self: center;
  margin-top: -15px;
  margin-bottom: 10px;
}
.title2 {
  align-self: flex-end;
}

h3 {
  font-family: "Allerta Stencil";
  font-size: 2em;
  align-self: flex-end;
  text-align: right;
  padding-right: 20px;
  letter-spacing: 0.05em;
  margin-top: -20px;
  margin-right: 20px;
}
.v-btn {
  margin: 10px;
}
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-image: url("./assets/background.jpeg");
  background-size: cover;
}
</style>
