<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <!-- Registration part -->
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">
                      Registrese en nuestra Web!
                    </h1>
                    <h4 class="text-center mlt-4">
                      Ingrese su e-mail para registrarse
                    </h4>
                    <v-form>
                      <v-text-field
                        v-model="name"
                        label="Nombre"
                        prepend-icon="person"
                        type="text"
                        color="teal accent-3"
                      />
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                        prepend-icon="email"
                        type="text"
                        color="teal accent-3"
                      />
                      <v-text-field
                        v-model="pass"
                        label="Contrasena"
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3"
                      />
                      <v-text-field
                        v-model="department"
                        label="Departamento"
                        prepend-icon="job"
                        type="text"
                        color="teal accent-3"
                      />
                      <v-checkbox
                        v-model="checkbox"
                        label="Admin"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3">
                    <v-btn rounded color="teal accent-3" dark @click="insertPerson">
                      Registrar
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="4" class="teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h2 class="text-center display-3">Bienvenidos!</h2>
                    <h5 class="text-center">
                      Ingrese sus datos para continuar...
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined="" dark @click="step++">
                      Iniciar Sesion
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- Login part -->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Bienvenido de vuelta!</h1>
                    <h5 class="text-center">Inicia Sesion para continuar</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined="" dark @click="step--">
                      Registrate
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">
                      Iniciar Sesion
                    </h1>
                    <h4 class="text-center mt-4">
                      Ingrese su e-mail para ingresar
                    </h4>
                    <v-form>
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                        prepend-icon="email"
                        type="text"
                        color="teal accent-3"
                      />
                      <v-text-field
                        v-model="pass"
                        label="Contrasena"
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3"
                      />
                    </v-form>
                    <h3 class="text-center mt-3">Olvido su contrasena ?</h3>
                  </v-card-text>

                  <div class="text-center mt-3">
                    <v-btn
                      rounded
                      color="teal accent-3"
                      dark
                      @click="validateCredentials"
                    >
                      Empezar
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    step: 1,
    data: [],
    email: undefined,
    pass: undefined,
    department: undefined,
    checkbox: false,
    name: undefined
  }),

  props: {
    source: String
  },

  mounted() {
    fetch(process.env.VUE_APP_URL_API_REST + "getAllEmployees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          Object.keys(response.data).forEach(key => 
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
  },

  methods: {
    validateCredentials() {
      if (this.email && this.pass) {
        const filterObj = this.data.filter((e) => e.email === this.email && e.pass === this.pass);
        
        if (filterObj.length && filterObj[0].rol === "Admin") this.goToHomeAdmin();
        else if (filterObj.length) this.goToHome();
      }
    },

    insertPerson() {
      if (this.email && this.pass && this.department) {
        // eslint-disable-next-line no-console
        const newInfo = {
          data :{
            department: this.department,
            email: this.email,
            name: this.name,
            pass: this.pass,
            rol: this.checkbox ? "Admin": "Not Admin",
            voteDepartment: [],
            votes: 0,
          }
        }

        fetch(process.env.VUE_APP_URL_API_REST + "insertUser", {
          method: "POST",
          body: JSON.stringify(newInfo),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response => {
            if (this.checkbox && response.status) this.goToHomeAdmin();
            else this.goToHome()
          })
          // eslint-disable-next-line no-console
          .catch(err => console.log(err))
      }
    },

    goToHome() {
      this.$router.push({ path: "/home/false" });
    },

    goToHomeAdmin() {
      this.$router.push({ path: "/home/true" });
    }
  }
};
</script>
