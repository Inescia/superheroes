<template>
  <div v-if="display" class="alert pt-3">
    <v-alert v-if="success" type="success">{{ text }}</v-alert>
    <v-alert v-else type="error">{{ text }}</v-alert>
  </div>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    display: {
      type: Boolean,
      default: true,
    },
    success: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
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
  animation: show ease-in-out 5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  position: absolute;
  right: -30%;
  z-index: 2;
  width: 30%;
}
</style>
