<template>
  <v-card>
    <v-card-title>Water</v-card-title>
    <v-row class="d-flex align-center justify-center">
      <v-col class="d-flex align-center justify-center">
        <v-btn fab >
          <v-icon large>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-icon x-large>mdi-glass-pint-outline</v-icon>
        100 ML
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-btn fab >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <v-card-subtitle>
        {{todayWater}} / 4000 ML
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "WaterCounter",
  data() {
    return {
      todayWater: 0
    }
  }
}
</script>

<style scoped>

</style>
