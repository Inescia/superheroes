<template>
  <div v-if="!!heroes.length" class="ui characters-list cards">
    <div v-for="character in heroes" :key="character.name">
      <Card :heroe="character" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "../components/Card.vue";

export default {
  components: { Card },
  computed: mapGetters(["heroes"]),
};
</script>

<style>
.characters-list.cards {
  margin-top: 2em;
  justify-content: center;
  display: flex;
}
</style>
