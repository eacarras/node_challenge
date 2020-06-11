<template>
  <v-card color="grey lighten-4" flat height="50px" tile>
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Sistema de Votos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title style="cursor:pointer;" @click="goToVotes">Votar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title
        v-if="this.$route.params.isAdmin === 'true'"
        style="cursor:pointer;"
        @click="goToAdminPage"
      >
        Obtener reporte de votos
      </v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  methods: {
    goToAdminPage() {
      this.$router.push({ path: "/adminPage" });
    },

    goToVotes() {
      this.$router.push({ path: "/home/true" });
    }
  }
}
</script>