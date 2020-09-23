<template>
  <v-card>
    <v-card-title>Daily Picture</v-card-title>
    <v-row align="center" justify="center">
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-btn fab>
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-card-subtitle>
          Upload Picture
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "DailyPicture"
}
</script>

<style scoped>

</style>
