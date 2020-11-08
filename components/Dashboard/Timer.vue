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
                @click="promptStartCountdown"
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
              >
                <v-icon
                  color="error"
                >
                  {{vac.state === 'beforeStart' ? 'mdi-close' : 'mdi-stop'}}
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
      :value="stopDialog"
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
            @click="stopDialog = false"
          >
            Take Me Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      :value="startDialog"
      persistent
      overlay-opacity="0.95"
    >
      <v-card>
        <v-card-title>Are You Ready?</v-card-title>
        <v-card-text>
          You can pause or stop the workout anytime you want, but you will not be able to mark the workout as complete unless the timer counts down to 00:00.
          <br/><br/>
          <strong>You may minimize the app, but please do not close it. The timer will reset if you close the app.</strong>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-btn
            color="success"
            @click="resetCountdown"
          >
            Start Workout
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            @click="startDialog = false"
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
      stopDialog: false,
      startDialog: false,
      reset: true
    }
  },
  methods: {
    promptStartCountdown(){
      this.startDialog = true
    },
    resetCountdown(){
      this.$refs.vac.startCountdown(true)
      this.reset = false
      this.startDialog = false
    },
    promptStop() {
      this.$refs.vac.pauseCountdown()
      this.stopDialog = true
    },
    confirmStop() {
      this.stopDialog = false
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
