<template>
  <v-row>
    <v-col>
      <HeadCard/>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Book Settings</v-card-title>
            <v-divider></v-divider>
            <v-row>
              <v-col>
                <v-card-subtitle class="text-center">Change Book</v-card-subtitle>
                <v-card-actions class="d-flex flex-column align-center justify-center">
                  <v-text-field
                    label="Title of The Book"
                    v-model="newBookName"
                    :value="user.bookName"
                    outlined
                  >
                  </v-text-field>
                  <v-text-field
                    label="Number of Pages"
                    v-model="newTotalPages"
                    :value="user.totalPages"
                    type="number"
                    outlined
                  >
                  </v-text-field>

                  <v-btn
                    color="accent"
                    @click="updateBook"
                    :loading="loadingChangeBook"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col>
                <v-card-subtitle class="text-center">Change Current Page</v-card-subtitle>
                <v-card-actions class="d-flex flex-column align-center justify-center">
                  <v-card-text class="text-center">{{ newBookName }}</v-card-text>
                  <v-text-field
                    label="Current Page"
                    v-model="newCurrentPage"
                    :value="user.currentPage"
                    type="number"
                    outlined
                  >
                  </v-text-field>

                  <v-btn
                    color="accent"
                    @click="updateCurrentPage"
                    :loading="loadingChangePage"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Water Settings</v-card-title>
            <v-card-subtitle class="text-center">If for medical reasons you cannot have 4 litres of water, you may
              change it here.
            </v-card-subtitle>
            <v-card-actions class="d-flex flex-column align-center justify-center">
              <v-text-field
                label="Daily Water Goal"
                v-model="newWaterGoal"
                :value="user.waterGoal"
                type="number"
                outlined
                suffix="ml"
              >
              </v-text-field>
              <v-btn
                color="accent"
                @click="updateWaterGoal"
                :loading="loadingChangeWater"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        multi-line
      >
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            :color="snackbarColor"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";
import HeadCard from "@/components/Global/HeadCard";

export default {
  name: "settings",
  components: {HeadCard},
  middleware: [
    async ({store, redirect}) => {
      if (store.getters['user/getUserLoggedIn']) {
        await store.dispatch('loadUser')
      } else {
        redirect('/')
      }
    }
  ],
  async asyncData({store}) {
    let user = store.getters['user/getUserInfo']
    return {
      newBookName: user.bookName,
      newTotalPages: user.totalPages,
      newCurrentPage: user.currentPage,
      newWaterGoal: user.waterGoal
    }
  },
  data() {
    return {
      loadingChangeBook: false,
      loadingChangePage: false,
      loadingChangeWater: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success'
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUserInfo'
    })
  },
  methods: {
    async updateBook() {
      this.loadingChangeBook = true
      if (this.newBookName !== '' && this.newTotalPages !== '') {
        let db = this.$fireStoreObj();
        await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
          bookName: this.newBookName,
          totalPages: this.newTotalPages,
        })
      }
      await this.$store.commit('user/updateBookInfo', {
        bookName: this.newBookName,
        totalPages: this.newTotalPages
      })
      this.loadingChangeBook = false
      this.snackbarText = " Book Successfully Updated"
      this.snackbarColor = 'success'
      this.snackbar = true
    },
    async updateCurrentPage() {
      this.loadingChangePage = true
      if (this.newCurrentPage !== null) {
        let db = this.$fireStoreObj();
        await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
          currentPage: this.newCurrentPage,

        })
      }
      this.loadingChangePage = false
    },
    async updateWaterGoal() {
      this.loadingChangeWater = true
      if (this.newWaterGoal !== null) {
        let db = this.$fireStoreObj();
        await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
          waterGoal: this.newWaterGoal,

        })
      }
      this.loadingChangeWater = false
    }
  }
}
</script>

<style scoped>

</style>
