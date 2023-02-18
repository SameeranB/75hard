<template>
    <v-row>
        <v-col>
            <v-carousel height="contain" hide-delimiters :show-arrows="false" v-model="carousel">
                <v-carousel-item>
                    <v-card style="height: 90vh" class="d-flex flex-column mb-5">
                        <v-card-title class="align-self-center text-center text-h2">Welcome</v-card-title>
                        <v-divider></v-divider>
                        <v-spacer></v-spacer>
                        <v-card-text class="text-center text-h5">
                            We are going to assume that you already familiar with the rules of this undertaking.
                        </v-card-text>
                        <v-spacer></v-spacer>
                        <v-card-title class="text-h2 align-self-center text-center no-wrap">How many days will you be
                            taking this challenge for?</v-card-title>
                        <v-divider></v-divider>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="challengeDays" label="Length Of Challenge" type="number" outlined
                                    suffix="days">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-carousel-item>
                <v-carousel-item>
                    <v-card class="d-flex flex-column mb-5" style="height: 90vh">
                        <v-card-subtitle class="text-center text-h6">Please write the name of the book you will be
                            reading.
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-row>
                                <v-col>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="bookName" label="Title Of The Book" outlined>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="totalPages" label="Number Of Pages" type="number"
                                                outlined>

                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                        <v-spacer></v-spacer>
                    </v-card>
                </v-carousel-item>
                <v-carousel-item>
                    <v-card style="height: 90vh" class="d-flex flex-column mb-5">
                        <v-card-title class="text-h2 align-self-center text-center no-wrap">Set Water
                            Goal</v-card-title>
                        <v-divider></v-divider>
                        <v-spacer></v-spacer>
                        <v-card-text class="text-h6 text-center">The recommended and default water goal is 4 litres. You
                            may change
                            it here if you have medical reasons.
                        </v-card-text>
                        <v-card-text class="text-h6 font-style-bold text-center">We do not recommend doing this unless
                            absolutely
                            necessary.
                        </v-card-text>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="waterGoal" label="Custom Water Goal" type="number" outlined
                                    suffix="ml">

                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-carousel-item>
                <v-carousel-item>
                    <v-card style="height: 90vh" class="d-flex flex-column mb-5">
                        <v-card-title class="text-h2 align-self-center text-center">Do Well</v-card-title>
                        <v-divider></v-divider>
                        <v-spacer></v-spacer>
                        <v-card-text class="text-h6 text-center">Your challenge will begin now.</v-card-text>
                        <v-spacer></v-spacer>
                    </v-card>
                </v-carousel-item>
            </v-carousel>
            <v-btn block color="green" @click="setValue">
                Confirm
            </v-btn>
        </v-col>
        <v-snackbar v-model="snackbar" multi-line>
            Please enter a value to continue
            <template v-slot:action="{ attrs }">
                <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</template>

<script>
export default {
    name: "onboarding",
    data() {
        return {
            bookName: '',
            totalPages: null,
            carousel: 0,
            challengeDays: null,
            snackbar: false,
            waterGoal: 4000
        }
    },
    methods: {
        async setValue() {
            if (this.carousel === 0) {
                if (this.challengeDays !== null && this.challengeDays !== "") {
                    let db = this.$fireStoreObj();
                    await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
                        challengeDays: this.challengeDays
                    })
                    this.carousel += 1
                } else {
                    this.snackbar = true
                }
            } else if (this.carousel === 1) {
                if (this.bookName !== '' && this.totalPages !== null) {
                    let db = this.$fireStoreObj();
                    await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
                        bookName: this.bookName,
                        totalPages: this.totalPages,
                    })
                    this.carousel += 1
                } else {
                    this.snackbar = true

                }

            } else if (this.carousel === 2) {
                if (this.waterGoal !== 4000 && this.waterGoal !== null) {
                    let db = this.$fireStoreObj();
                    await db.collection('Users').doc(this.$fireAuth.currentUser.uid).update({
                        waterGoal: this.waterGoal,
                    })
                    this.carousel += 1
                } else {
                    this.snackbar = true
                }

            }
            else {
                await this.$router.push('dashboard')
            }
        }
    }
}
</script>

<style scoped>

</style>
