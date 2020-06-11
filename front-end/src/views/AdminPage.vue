<template>
  <v-container>
    <TopBar />
    <!-- Logic for all the restaurants -->
    <v-layout wrap>
      <v-row class="center">
        <v-card>
          <v-card-actions>
            <v-btn text @click="getInfo('getMostVoted')">Mas votados</v-btn>
            <v-btn text @click="getInfo('getMostVotedByDepartment')">Mas votados por Departamento</v-btn>
            <v-btn text @click="getInfo('getNumberEmployee')">Numero de empleados</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <v-row>
        <h4 v-if="number">Numero de empleados: {{ number }}</h4>
      </v-row>
      <v-card
        class="black--text"
        v-for="worker in data"
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
              <div>Departamento: {{ worker.department }}</div>
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
    data: [],
    number: undefined,
    stringLike: "Felicidades has votado por: "
  }),

  mounted() {
    this.getInfo("getMostVoted");
  },

  methods: {
    getInfo(value) {
      this.data = [];
      fetch(process.env.VUE_APP_URL_API_REST + value, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          if (value === "getNumberEmployee") {
            if (response.status === 200) {
              this.number = response.value;
            }
          } else if (response.status === 200) {
            Object.keys(response.data).forEach((key) => 
              this.data.push({
                ...response.data[key],
                id: key,
                iconShow: true
              })
            );
          };
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err))
    }
  }
};
</script>
