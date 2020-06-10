<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <!-- Login part -->
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
                        label="E-mail"
                        prepend-icon="email"
                        type="text"
                        color="teal accent-3" />
                      <v-text-field
                        id="password"
                        label="Contrasena"
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3" />
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3">
                    <v-btn rounded color="teal accent-3" dark>Registrar</v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="4" class="teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-3">Bienvenidos!</h1>
                    <h5 class="text-center">Ingrese sus datos para continuar...</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined="" dark @click="step++">Iniciar Sesion</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- Sign up part -->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Bienvenido de vuelta!</h1>
                    <h5 class="text-center">Inicia Sesion para continuar</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined="" dark @click="step--">Registrate</v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-3">Iniciar Sesion</h1>
                    <h4 class="text-center mt-4">
                      Ingrese su e-mail para ingresar
                    </h4>
                    <v-form>
                      <v-text-field
                        label="E-mail"
                        prepend-icon="email"
                        type="text"
                        color="teal accent-3" />
                      <v-text-field
                        id="password"
                        label="Contrasena"
                        prepend-icon="lock"
                        type="password"
                        color="teal accent-3" />
                    </v-form>
                    <h3 class="text-center mt-3">Olvido su contrasena ?</h3>
                  </v-card-text>

                  <div class="text-center mt-3">
                    <v-btn rounded color="teal accent-3" dark>Empezar</v-btn>
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
    step: 1
  }),

  props: {
    source: String
  }
};
</script>
