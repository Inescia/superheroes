<template>
  <div class="alert pt-5">
    <v-alert v-if="success" dismissible type="success">{{ text }}</v-alert>
    <v-alert v-else dismissible type="error">{{ text }}</v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: true,
    };
  },

  props: {
    success: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: 'Modifications enregistrées.',
    },
  },
};
</script>

<style lang="scss">
@keyframes show {
  0% {
    transform: translate(0%, 0);
  }
  20% {
    transform: translate(-100%, 0);
  }
  80% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(0%, 0);
  }
}

.alert {
  animation: show ease-in-out 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  position: absolute;
  width: 25%;
  right: -25%;
  z-index: 2;
}
</style>
