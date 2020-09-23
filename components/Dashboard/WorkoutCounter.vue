<template>
<v-card>
  <v-card-title>
    Workouts
  </v-card-title>
  <v-row>
    <v-col cols="6" class="d-flex flex-column align-center justify-center">
      <v-btn fab >
        <v-icon x-large>mdi-weather-sunny</v-icon>
      </v-btn>
      <v-card-subtitle>
      {{workoutOne}}
      </v-card-subtitle>
    </v-col>
    <v-col cols="6" class="d-flex flex-column align-center justify-center">
      <v-btn fab >
        <v-icon x-large>mdi-weather-sunset</v-icon>
      </v-btn>
      <v-card-subtitle>
      {{workoutTwo}}
      </v-card-subtitle>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
export default {
name: "WorkoutCounter",
  data(){
  return{
    workoutOne: "First",
    workoutTwo: "Second"
  }
  }
}
</script>

<style scoped>

</style>
