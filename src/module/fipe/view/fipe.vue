<template>
  <v-app>
    <v-app-bar
      dense
      app
      color="red"
      class="white--text font-weight-bold"
    >
      <v-spacer></v-spacer>
      FIPE TREINAMENTO
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col lg="6">
            <v-card>
              <v-card-title class="headline text-center font-weight-bold">
                <v-spacer></v-spacer>
                Selecione o tipo do veículo para consulta!
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <v-item-group
                  v-model="controller.opcaoInicial"
                  class="d-flex"
                >
                  <v-item
                    :key="index"
                    v-for="(item, index) in controller.opcoesIniciais"
                    v-slot="{ active, toggle }"
                  >
                    <v-sheet
                      rounded
                      :color="active ? 'red' : 'blue'"
                      height="100"
                      width="33%"
                      class="font-weight-bold mx-1 d-flex flex-column justify-center align-center white--text"
                      @click="toggle"
                    >
                      <div>{{item.descricao}}</div>
                      <div>
                        <v-icon
                          color="white"
                          x-large
                        >{{item.icone}}</v-icon>
                      </div>
                    </v-sheet>
                  </v-item>
                </v-item-group>
              </v-card-text>
            </v-card>
            <v-card class="mt-4">
              <v-card-text>
                <v-autocomplete
                  filled
                  dense
                  color="red"
                  label="Marca"
                  :items="controller.marcas"
                  item-text="nome"
                  item-value="codigo"
                  @change="controller.buscaModelos($event)"
                >
                </v-autocomplete>
                <v-autocomplete
                  filled
                  dense
                  color="red"
                  label="Modelo"
                  :items="controller.modelos"
                  item-text="nome"
                  item-value="codigo"
                  @change="controller.buscaAnos($event)"
                >
                </v-autocomplete>
                <v-autocomplete
                  filled
                  dense
                  color="red"
                  label="Ano"
                  :items="controller.anos"
                  item-text="nome"
                  item-value="codigo"
                  @change="controller.buscaValores($event)"
                >
                </v-autocomplete>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col lg="6">
            <v-card
              color="red"
              height="40vh"
              v-if="controller.valor"
            >
              <v-card-text class="white--text  fill-height flex-column d-flex justify-center align-center ">
                <div class="font-weight-bold">{{controller.valor.Marca}}</div>
                <div class="subtitle-2 font-weight-bold">
                  {{controller.valor.MesReferencia}}
                </div>
                <div class="headline font-weight-bold">{{controller.valor.Modelo}}</div>
                <div class="display-3 font-weight-bold">{{controller.valor.Valor}}</div>
              </v-card-text>
            </v-card>

            <v-card v-if="controller.grafico.length > 0">
              <v-card-title>
                <v-spacer></v-spacer>
                Evolução por ano
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <div
                  id="chart"
                  style="height: 32vh; width: 100%"
                ></div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { fipeController } from "../di/di";
export default {
  data: (context) => ({
    controller: fipeController(context),
  }),
  watch: {
    "controller.opcaoInicial"() {
      this.controller.watchOpcaoInicial();
    },
  },
};
</script>