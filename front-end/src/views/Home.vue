<template>
  <v-container>
    <TopBar />
    <!-- Logic for all the restaurants -->
    <v-layout wrap>
      <v-card
        class="black--text"
        v-for="worker in dummyData"
        v-bind:key="worker.id"
      >
        <v-layout wrap>
          <v-flex xs3>
            <v-img
              src="https://picsum.photos/1920/1080?random"
              height="125px"
              contain
            />
          </v-flex>
          <v-flex xs5>
            <v-card-title>
              <div style="cursor:pointer;" class="headline">
                {{ worker.name }}
              </div>
            </v-card-title>
            <v-card-text>
              <div>Departamento: {{ worker.area }}</div>
              <p>Votos: {{ worker.votes }}</p>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-title primary-title>
              <div>
                <v-row v-if="worker.iconShow" align="center" class="mx-0">
                  <v-btn
                    class="ma-2"
                    text
                    icon
                    color="blue lighten-2"
                    @click="worker.iconShow = !worker.iconShow"
                  >
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                </v-row>
                <v-row v-else align="center" class="mx-0">
                  <h5>{{ stringLike }}{{ worker.name }}</h5>
                </v-row>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import TopBar from "../components/TopBar";

export default {
  name: "Login",

  components: {
    TopBar
  },

  data: () => ({
    dummyData: [
      {
        id: 12345,
        name: "Aaron Carrasco M",
        area: "IT",
        votes: 5,
        iconShow: true
      }
    ],
    stringLike: "Felicidades has votado por: "
  })
};
</script>
