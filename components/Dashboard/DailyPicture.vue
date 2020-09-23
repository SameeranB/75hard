<template>
  <v-card>
    <v-row align="start" justify="center">
      <v-col>
        <v-card-title>Daily Picture</v-card-title>
      </v-col>
      <v-col v-if="pictureDone" class="d-flex align-center justify-end">
        <v-card-title class="accent--text" >
          <v-icon left>
            mdi-calendar-check
          </v-icon>
          DONE
        </v-card-title>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-btn fab @click="switchUserPicture" :loading="loading">
          <v-icon v-if="user.pictureTaken" color="accent" x-large>mdi-check</v-icon>
          <v-icon v-else x-large>mdi-camera</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-card-subtitle>
          Click a Picture
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "DailyPicture",
  props:{
    user: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      loading: false
    }
  },
  methods: {
    async switchUserPicture(){
      this.loading=true
      this.$store.commit('user/switchUserPicture')
      let db = this.$fireStoreObj();
      await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
        pictureTaken: this.user.pictureTaken
      })
      this.loading=false
    }
  },
  computed: {
    pictureDone(){
      return this.user.pictureTaken
    }
  }
}
</script>

<style scoped>

</style>
