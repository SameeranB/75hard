<template>
  <div>
    <client-only>
      <vac :autoStart="false" :left-time="timerTime" ref="vac">
        <v-container
          fluid
          slot="default"
          slot-scope="vac"
          class="d-flex flex-column align-center justify-center ma-0 pa-0"
          v-if="vac.state !== 'finished'"
        >
          <v-row>
            <v-col>
              <v-img
                :src="require('~/static/stop-watch.svg')"
                width="100"
              >
              <span class="d-flex align-center justify-center fill-height ma-0 pa-0"
                    style="transform: translate(0, 7px)">
                {{ vac.state === 'beforeStart' ? 'Press Start' : `${vac.timeObj.m}:${vac.timeObj.s}` }}
              </span>
              </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                v-if="reset"
                @click="resetCountdown"
              >
                Start
              </v-btn>
              <v-btn
                @click="vac.state === 'beforeStart' || vac.state === 'paused' ? vac.startCountdown() : vac.pauseCountdown()"
                v-else
              >
                <v-icon>
                  {{
                    vac.state === 'beforeStart' || vac.state === 'paused' ? 'mdi-play' : 'mdi-pause'
                  }}
                </v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                @click="promptStop"
                :disabled="vac.state !== 'process'"
              >
                <v-icon>
                  mdi-stop
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <span
          slot="finish"
        >
          <v-card>
            <v-divider></v-divider>
            <v-card-title>Workout Complete</v-card-title>
            <v-card-text>Looks like you have completed your workout. Should we mark it as completed?</v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                @click="completeWorkout"
              >
                Yes Please!
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                outlined
                @click="confirmStop"
              >
                No, It's Incomplete
              </v-btn>
            </v-card-actions>
          </v-card>
      </span>
      </vac>
    </client-only>
    <v-dialog
      :value="dialog"
      persistent
      overlay-opacity="0.95"
    >
      <v-card>
        <v-card-title>Are You Sure?</v-card-title>
        <v-card-text>
          If you stop this workout, you will loose your progress and the workout will remain marked as incomplete. If
          you wish to take a break, you should pause the workout instead.
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-btn
            color="red"
            @click="confirmStop"
          >
            Stop Workout
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            @click="dialog = false"
          >
            Take Me Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props:{
    activeWorkout:{
      type: Number,
      required: true
    },
    timerTime:{
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      reset: false
    }
  },
  methods: {
    resetCountdown(){
      this.$refs.vac.startCountdown(true)
      this.reset = false
    },
    promptStop() {
      this.$refs.vac.pauseCountdown()
      this.dialog = true
    },
    confirmStop() {
      this.dialog = false
      this.$refs.vac.stopCountdown()
      this.$refs.vac.state = 'beforeStart';
      this.reset = true
      this.$emit('cancelWorkout')
    },
    completeWorkout() {
      this.$refs.vac.stopCountdown()
      this.$refs.vac.state = 'beforeStart';
      this.reset = true
      this.$emit('completeWorkout', this.activeWorkout)
    }
  }
}
</script>

<style scoped>

</style>
