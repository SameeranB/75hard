<template>
  <v-row justify="center" align="start" style="height: 100vh">
    <v-col class="d-flex flex-column justify-space-between" cols="12">
      <v-row>
        <v-col cols="12">
          <v-card class="d-flex flex-column align-center justify-center">
            <v-card-title class="text-h2 primary--text">75Hard</v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle class="text-center">Are You Ready? <br/> Don't Bother Answering.</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-spacer style="height: 30vh"></v-spacer>
      <v-row class="" align="center" justify="center">
        <v-col cols="8" @click="loginUser">
          <v-card class="d-flex align-center justify-center">
            <v-card-title>
              <v-icon left large>mdi-google</v-icon>
            </v-card-title>
            <v-card-title>
              Get In.
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  methods: {
    async loginUser() {
      let provider = new this.$fireAuthObj.GoogleAuthProvider();
      provider.addScope('email')
      provider.addScope('profile')
      try {
        let result = await this.$fireAuth.signInWithPopup(provider)
        let token = result.credential
        let user = result.user
        await this.$fireAuth.currentUser.reload()
        console.log(user)
      } catch (e) {
        let errorCode = e.code;
        let errorMessage = e.message;
        let email = e.email;
        let credential = e.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have signed up with a different provider for that email.');
        } else {
          console.error(e);
        }
      }
    }
  }
}
</script>
