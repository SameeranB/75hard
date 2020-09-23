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
              <v-card-subtitle>Day #56</v-card-subtitle>
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
          <WaterCounter/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <WorkoutCounter/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <ReadCounter/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <DailyPicture/>
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
export default {
  name: "dashboard",
  components: {DailyPicture, ReadCounter, WorkoutCounter, WaterCounter},
  async asyncData({store}) {
    let user = await store.dispatch('user/getUserInfo')
    return {
      user: user
    }
  },

}
</script>

<style scoped>

</style>
