<script>
import Header from '../components/Header.vue';

export default {
  components: { Header },
  name: 'Dashboard',
  data: () => ({
    image: require('@/assets/test.jpeg'),
  }),
};
</script>

<template>
  <div class="page">
    <Header />
    <h1 class="title1">FAVORIES.</h1>
    <div id="carousel">
      <div class="hideLeft">
        <img :src="image" />
      </div>

      <div class="prevLeftSecond">
        <img :src="image" />
      </div>

      <div class="prev">
        <img :src="image" />
      </div>

      <div class="selected">
        <img :src="image" />
      </div>

      <div class="next">
        <img :src="image" />
      </div>

      <div class="nextRightSecond">
        <img :src="image" />
      </div>

      <div class="hideRight">
        <img :src="image" />
      </div>
    </div>

    <div class="buttons">
      <button id="prev">Prev</button>
      <button id="next">Next</button>
    </div>
  </div>
</template>

<style lang="sass">
#carousel
  position: relative
  height: 400px
  top: 40%
  transform: translateY(-50%)
  overflow: hidden

  div
    position: absolute
    transition: transform 1s, left 1s, opacity 1s, z-index 0s
    opacity: 1

    img
      width: 400px
      transition: width 1s

    &.hideLeft
      left: 0%
      opacity: 0
      transform: translateY(50%) translateX(-50%)

      img
        width: 200px

    &.hideRight
      left: 100%
      opacity: 0
      transform: translateY(50%) translateX(-50%)
      img
        width: 200px

    &.prev
      z-index: 5
      left: 30%
      transform: translateY(50px) translateX(-50%)

      img
        width: 300px

    &.prevLeftSecond
      z-index: 4
      left: 15%
      transform: translateY(50%) translateX(-50%)
      opacity: .7

      img
        width: 200px

    &.selected
      z-index: 10
      left: 50%
      transform: translateY(0px) translateX(-50%)

    &.next
      z-index: 5
      left: 70%
      transform: translateY(50px) translateX(-50%)

      img
        width: 300px

    &.nextRightSecond
      z-index: 4
      left: 85%
      transform: translateY(50%) translateX(-50%)
      opacity: .7

      img
        width: 200px

.buttons
  position: fixed
  left: 50%
  transform: translateX(-50%)
  bottom: 10px
</style>
