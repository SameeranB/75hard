<template>
<v-card>
<v-card-title>Reading</v-card-title>
  <v-spacer></v-spacer>
  <v-card-subtitle class="text-center">{{bookName}}</v-card-subtitle>
  <v-row class="d-flex align-center justify-center">
    <v-col class="d-flex align-center justify-center">
      <v-btn fab >
        <v-icon large>mdi-minus</v-icon>
      </v-btn>
    </v-col>
    <v-col class="d-flex align-center justify-center text-center">
      <v-icon x-large left>mdi-book-open-page-variant</v-icon>
      10 Pages
    </v-col>
    <v-col class="d-flex align-center justify-center">
      <v-btn fab >
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="d-flex align-center justify-center">
      <v-card-subtitle>
        {{currentPage}} / {{totalPages}} Pages
      </v-card-subtitle>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
export default {
name: "ReadCounter",
  data(){
  return{
    bookName: "The Subtle Art Of Not Giving A Fuck",
    currentPage: 10,
    totalPages: 150,
  }
  }
}
</script>

<style scoped>

</style>
