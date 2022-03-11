<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="auto">
      <v-card>
        <v-card-title>
          Voulez-vous vraiment supprimer ce superhéro ?
        </v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false"> Disagree </v-btn>
          <v-btn color="#ff554fee" text @click="dialog = false"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
