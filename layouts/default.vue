<template>
  <v-app>
    <v-main>
      <v-container class="my-0 py-0" fluid>
        <nuxt/>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from "~/components/Global/Footer";
import Sidebar from "@/components/Global/Sidebar";
export default {
  components: {Sidebar, Footer},
  data() {
    return {}
  }
}
</script>
