<template>
  <v-card >
    <v-row>
      <v-col>
        <v-card-title>
          Workouts
        </v-card-title>
      </v-col>
      <v-col v-if="workoutDone" class="d-flex align-center justify-end">
        <v-card-title class="accent--text">
          <v-icon left>
            mdi-calendar-check
          </v-icon>
          DONE
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="d-flex flex-column align-center justify-center">
        <v-btn fab @click="firstWorkout" :loading="loading">
          <v-icon v-if="user.workoutOne" color="accent" x-large>mdi-check</v-icon>
          <v-icon v-else x-large>mdi-weather-sunny</v-icon>
        </v-btn>
        <v-card-subtitle>
          {{ workoutOne }}
        </v-card-subtitle>
      </v-col>
      <v-col cols="6" class="d-flex flex-column align-center justify-center">
        <v-btn fab @click="secondWorkout" :loading="loading">
          <v-icon v-if="user.workoutTwo" color="accent" x-large>mdi-check</v-icon>
          <v-icon v-else x-large>mdi-weather-sunset</v-icon>
        </v-btn>
        <v-card-subtitle>
          {{ workoutTwo }}
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "WorkoutCounter",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      workoutOne: "First",
      workoutTwo: "Second",
      loading: false
    }
  },
  methods: {
    async firstWorkout() {
      this.loading = true
      await this.$store.commit('user/switchUserWorkoutOne')
      let db = this.$fireStoreObj();
      await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
        workoutOne: this.user.workoutOne
      })
      this.loading = false
    },
    async secondWorkout() {
      this.loading = true
      await this.$store.commit('user/switchUserWorkoutTwo')
      let db = this.$fireStoreObj();
      await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
        workoutTwo: this.user.workoutTwo
      })
      this.loading = false
    }
  },
  computed: {
    workoutDone(){
      return this.user.workoutOne && this.user.workoutTwo
    }
  }
}
</script>

<style scoped>

</style>
