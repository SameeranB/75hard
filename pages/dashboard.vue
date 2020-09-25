<template>
  <v-row>
    <v-col cols="12">
      <HeadCard/>
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
import HeadCard from "@/components/Global/HeadCard";

export default {
  name: "dashboard",
  components: {HeadCard, DailyPicture, ReadCounter, WorkoutCounter, WaterCounter},
  middleware: [
    async ({store, redirect}) => {
      if (store.getters['user/getUserLoggedIn']){
        await store.dispatch('loadUser')
      } else {
        redirect('/')
      }
    }
  ],

  computed:{
    ...mapGetters({
      user: 'user/getUserInfo'
    })
  },


}
</script>

<style scoped>

</style>
