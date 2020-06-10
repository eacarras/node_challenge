<template>
  <v-card color="grey lighten-4" flat height="50px" tile>
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Sistema de Votos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title style="cursor:pointer;">Votar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="true" style="cursor:pointer;">
        Obtener reporte de votos
      </v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ adminRol: "getRol" })
  },

  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.adminRol);
  }
};
</script>
