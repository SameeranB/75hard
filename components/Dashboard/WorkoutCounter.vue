<template>
  <v-carousel
    :continuous="false"
    dark
    hide-delimiters
    hide-delimiter-background
    :show-arrows="false"
    touchless
    :value="carouselPage"
    height="300"
  >
    <v-carousel-item>
      <v-card>
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
              {{ workoutOneTitle }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="6" class="d-flex flex-column align-center justify-center">
            <v-btn fab @click="secondWorkout" :loading="loading">
              <v-icon v-if="user.workoutTwo" color="accent" x-large>mdi-check</v-icon>
              <v-icon v-else x-large>mdi-weather-sunset</v-icon>
            </v-btn>
            <v-card-subtitle>
              {{ workoutTwoTitle }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </v-carousel-item>
    <v-carousel-item>
      <v-card>
        <v-card-title>
          Workout Timer
        </v-card-title>
        <v-card-subtitle>
          {{ activeWorkout === 1 ? workoutOneTitle : workoutTwoTitle }}
        </v-card-subtitle>
        <Timer
          :active-workout="activeWorkout"
          :timer-time="2700000"
          @cancelWorkout="carouselPage = 0"
          @completeWorkout="handleCompleteWorkout"
        />
      </v-card>
    </v-carousel-item>

  </v-carousel>
</template>

<script>
import Timer from "~/components/Dashboard/Timer";

export default {
  name: "WorkoutCounter",
  components: {Timer},
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      workoutOneTitle: "First",
      workoutTwoTitle: "Second",
      loading: false,
      carouselPage: 0,
      activeWorkout: null
    }
  },
  methods: {
    async firstWorkout() {
      if (!this.user.workoutOne) {
        this.loading = true
        this.activeWorkout = 1
        this.carouselPage = 1
        this.loading = false
      }
    },
    async secondWorkout() {
      if (!this.user.workoutTwo) {
        this.loading = true
        this.activeWorkout = 2
        this.carouselPage = 1
        this.loading = false
      }
    },
    async handleCompleteWorkout(workoutNumber) {
      this.carouselPage = 0
      this.loading = true
      if (workoutNumber === 1) {
        await this.$store.commit('user/switchUserWorkoutOne')
        let db = this.$fireStoreObj();
        await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
          workoutOne: this.user.workoutOne
        })
      } else if (workoutNumber === 2) {
        await this.$store.commit('user/switchUserWorkoutTwo')
        let db = this.$fireStoreObj();
        await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
          workoutTwo: this.user.workoutTwo
        })
      }
      this.loading = false
    }
  },
  computed: {
    workoutDone() {
      return this.user.workoutOne && this.user.workoutTwo
    }
  }
}
</script>

<style scoped>

</style>
