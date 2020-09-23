<template>
  <v-card >
    <v-row align="start" justify="center">
      <v-col>
        <v-card-title>Water</v-card-title>
      </v-col>
      <v-col v-if="waterDone" class="d-flex align-center justify-end">
        <v-card-title class="accent--text" >
          <v-icon left>
            mdi-calendar-check
          </v-icon>
          DONE
        </v-card-title>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center">
      <v-col class="d-flex align-center justify-center">
        <v-btn fab @click="decrementWater" :loading="loading">
          <v-icon large>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-icon x-large>mdi-glass-pint-outline</v-icon>
        100 ML
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-btn fab @click="incrementWater" :loading="loading">
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <v-card-subtitle>
          {{ user.waterAmount }} / 4000 ML
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "WaterCounter",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async incrementWater() {
      this.loading = true
      await this.$store.commit('user/incrementUserWater')
      let db = this.$fireStoreObj();
      await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
        waterAmount: this.user.waterAmount
      })
      this.loading = false
    },
    async decrementWater() {
      this.loading = true
      if (this.user.waterAmount === 0) {
        this.loading = false
        return
      }
      await this.$store.commit('user/decrementUserWater')
      let db = this.$fireStoreObj();
      await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
        waterAmount: this.user.waterAmount
      })
      this.loading = false
    }
  },
  computed: {
    waterDone() {
      return this.user.waterAmount >= 4000;
    }
  }
}
</script>

<style scoped>

</style>
