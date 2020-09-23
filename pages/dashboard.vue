<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col>
          <v-card class="d-flex">
            <v-avatar width="50">
              <v-img :src="$fireAuth.currentUser.photoURL"></v-img>
            </v-avatar>
            <div>
              <v-card-title>{{ $fireAuth.currentUser.displayName }}</v-card-title>
              <v-card-subtitle>Day #{{user.day}}</v-card-subtitle>
            </div>
            <v-card-actions class="mx-0">
              <v-btn fab icon color="white">
                <v-icon>mdi-cog-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <WaterCounter :user="user"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <WorkoutCounter :user="user"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <ReadCounter :user="user"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <DailyPicture :user="user"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import WaterCounter from "~/components/Dashboard/WaterCounter";
import WorkoutCounter from "~/components/Dashboard/WorkoutCounter";
import ReadCounter from "~/components/Dashboard/ReadCounter";
import DailyPicture from "~/components/Dashboard/DailyPicture";
import {mapGetters} from "vuex";

export default {
  name: "dashboard",
  components: {DailyPicture, ReadCounter, WorkoutCounter, WaterCounter},
  middleware: [
    async ({store}) => {
      await store.dispatch('loadUser')
    }
  ],

  computed:{
    ...mapGetters({
      user: 'user/getUserInfo'
    })
  }

}
</script>

<style scoped>

</style>
