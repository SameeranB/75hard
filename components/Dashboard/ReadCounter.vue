<template>
  <v-card>
    <v-row align="start" justify="center">
      <v-col>
        <v-card-title>Reading</v-card-title>
      </v-col>
      <v-col v-if="readingDone" class="d-flex align-center justify-end">
        <v-card-title class="accent--text" >
          <v-icon left>
            mdi-calendar-check
          </v-icon>
          DONE
        </v-card-title>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-card-subtitle class="text-center">{{ user.bookName }}</v-card-subtitle>
    <v-row class="d-flex align-center justify-center">
      <v-col class="d-flex align-center justify-center">
        <v-btn fab @click="decrementRead" :loading="loading">
          <v-icon large>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col class="d-flex align-center justify-center text-center">
        <v-icon x-large left>mdi-book-open-page-variant</v-icon>
        1 Page
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-btn fab @click="incrementRead" :loading="loading">
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <v-card-subtitle>
          {{ user.pagesToday }} Pages Today
        </v-card-subtitle>
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-card-subtitle>
          {{ user.currentPage }} / {{ user.totalPages }} Pages
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ReadCounter",
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
    async incrementRead() {
      this.loading = true
      await this.$store.commit('user/incrementUserRead')
      let db = this.$fireStoreObj();
      await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
        currentPage: this.user.currentPage,
        pagesToday: this.user.pagesToday
      })
      this.loading = false
    },
    async decrementRead() {
      this.loading = true
      if (this.user.pagesToday === 0) {
        this.loading = false
        return
      }
      await this.$store.commit('user/decrementUserRead')
      let db = this.$fireStoreObj();
      await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
        currentPage: this.user.currentPage,
        pagesToday: this.user.pagesToday      })
      this.loading = false
    }
  },
  computed: {
    readingDone(){
      return this.user.pagesToday >= 10
    }
  }
}
</script>

<style scoped>

</style>
