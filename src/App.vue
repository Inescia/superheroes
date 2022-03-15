<template>
  <v-app>
    <div class="page">
      <v-row align="center" class="loader d-flex" justify="center" no-gutters>
        <v-col v-show="!load" cols="auto"
          ><img
            class="loader__img px-3"
            height="70"
            :src="require('./assets/bouclier.png')"
        /></v-col>
        <v-col v-show="!load" cols="auto"
          ><h3 style="text-align: left; opacity: 0.8">
            {{ $t('loader') }}
          </h3></v-col
        >
      </v-row>
      <Header />
      <Alert
        :display="notification.display"
        :success="notification.success"
        :text="notification.text"
      />
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Alert from './components/Alert.vue';
import { mapGetters } from 'vuex';

export default {
  components: { Alert, Header },
  name: 'App',

  computed: {
    ...mapGetters(['notification', 'load']),
  },

  created() {
    if (!this.load) {
      this.$store.dispatch('fetchHeroes');
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
  position: absolute;
  left: 35%;
  right: 35%;
  height: 120px;
  z-index: 2;

  &__img {
    animation: rotation ease-in-out 2.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
}

h1 {
  font-family: 'Allerta Stencil';
  font-size: 4em;
  letter-spacing: 0.15em;
  text-align: center;
  padding: 0px 20px;
}

h3 {
  align-self: flex-end;
  font-family: 'Allerta Stencil';
  font-size: 2em;
  letter-spacing: 0.05em;
  text-align: right;
}

h6 {
  color: white;
  font-family: 'Allerta Stencil';
  font-size: 1.8em;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 40%;
}

.page {
  animation: fadeInAnimation ease 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  background-attachment: fixed;
  background-image: url('./assets/background.jpeg');
  background-size: cover;
  height: 100%;
  width: 100%;
}
</style>
