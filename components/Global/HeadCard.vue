<template>
  <v-row>
    <v-col>
      <v-card class="d-flex">
        <v-avatar width="50">
          <v-img :src="$fireAuth.currentUser.photoURL"></v-img>
        </v-avatar>
        <div>
          <v-card-title><span style="word-break: normal">{{ $fireAuth.currentUser.displayName }}</span>
          </v-card-title>
          <v-card-subtitle>Day #{{ user.day }} / {{ user.challengeDay }}</v-card-subtitle>
        </div>
        <v-spacer></v-spacer>
        <v-card-actions class="mx-0">
          <v-btn fab icon color="white" @click="$route.path === '/dashboard'? $router.push('settings') : $router.push('dashboard')">
            <v-icon v-if="$route.path === '/dashboard'">mdi-cog-outline</v-icon>
            <v-icon v-else>mdi-home</v-icon>
          </v-btn>
          <v-btn fab icon color="white" @click="userLogout">
            <v-icon color="red">mdi-logout</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "HeadCard",
  computed: {
    ...mapGetters({
      user: 'user/getUserInfo'
    })
  },
  methods: {
    async userLogout() {
      await this.$fireAuth.signOut()
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
