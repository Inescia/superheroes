<template>
  <v-app>
    <div class="loader" v-show="!load">
      <img class="loader__img" :src="require('./assets/bouclier.png')" />
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      load: false,
    };
  },
  created() {
    if (!this.load) {
      this.$store
        .dispatch('fetchHeroes')
        .then(() => (this.load = this.$store.getters.load));
    }
  },
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Allerta+Stencil);

@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(3turn);
  }
}

.loader {
  position: fixed;
  background: #ff554fee;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;

  &__img {
    margin: auto;
    width: 30%;
    min-width: 100px;
    animation: rotation ease-in-out 2.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
}

h1 {
  font-family: 'Allerta Stencil';
  font-size: 4em;
  letter-spacing: 0.15em;
  padding-right: 20px;
}

h3 {
  align-self: flex-end;
  font-family: 'Allerta Stencil';
  font-size: 2em;
  letter-spacing: 0.05em;
  margin-top: -20px;
  margin-right: 20px;
  padding-right: 20px;
  text-align: right;
}

h6 {
  color: white;
  font-family: 'Allerta Stencil';
  font-size: 1.8em;
  letter-spacing: 1px;
  margin-top: -50px;
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
  animation: fadeInAnimation ease 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  background-attachment: fixed;
  background-image: url('./assets/background.jpeg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
