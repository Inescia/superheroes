<template>
  <router-link
    :to="'/Informations/' + heroe.id"
    style="text-decoration: none; color: inherit"
    ><div class="card">
      <img class="card__img" :src="heroe.image" />
      <div class="card__infos">
        <v-row>
          <v-col cols="10"
            ><h4 class="card__infos__name">
              {{ setSize(heroe.name, 21) }}
            </h4></v-col
          >
          <v-icon v-show="heroe.favorie" color="red"> mdi-heart </v-icon></v-row
        >
        <h5 class="card__infos__id">{{ heroe.id }}</h5>
        <p class="card__infos__description">
          {{ setSize(heroe.description, 75) }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import Heroe from "../classes/Heroe.js";

export default {
  name: "Card",
  methods: {
    setSize(text, size) {
      if (text.length > size + 1) return text.substring(0, size - 2) + "...";
      else return text;
    },
  },
  props: {
    heroe: {
      type: Heroe,
      default: new Heroe(
        "id",
        "123456789123456789123456789123456789",
        "1234567891234567 891234567 89123 45678912",
        "a",
        "a",
        "a",
        "a",
        "a",
        "../assets/test.jpeg"
      ),
    },
  },
};
</script>

<style lang="scss">
$size: 220px;

.card {
  width: $size;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  box-shadow: 0px 0px 10px 5px #d4d4d4;
  border-radius: 10px;
  margin: 25px;

  &__img {
    border-radius: 10px 10px 0px 0px;
    height: $size;
    width: $size;
    object-fit: cover;
  }

  &__infos {
    margin: 5px 10px 0px 10px;

    &__name {
      font-size: 15px;
      word-wrap: break-word;
      height: 25px;
      overflow: hidden;
    }

    &__id {
      font-weight: 200;
    }

    &__description {
      font-size: 12px;
      opacity: 0.8;
      height: 35px;
      width: $size - 20;
      overflow: hidden;
      word-wrap: break-word;
    }
  }
}
</style>
