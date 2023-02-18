export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {

    async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
        console.log("auth changed")
        if (!authUser) {
            console.log("logging out")
            await commit('user/setUserLoggedIn', false)
            return
        }
        // you can request additional fields if they are optional (e.g. photoURL)
        const { uid, email, displayName, photoURL } = authUser
        await commit('user/setUserLoggedIn', true)
    },

    async registerUser() {
        let db = this.$fireStoreObj()

        await db.collection('Users').doc(this.$fireAuth.currentUser.uid).set({
            day: 1,
            challengeDays: 75,
            waterGoal: 4000,
            waterAmount: 0,
            workoutOne: false,
            workoutTwo: false,
            bookName: '',
            totalPages: 0,
            currentPage: 0,
            pagesToday: 0,
            pictureTaken: false,
            logs: null
        })

    },
    async loadUser({ commit }) {
        let db = this.$fireStoreObj()
        let user = await db.collection('Users').doc(this.$fireAuth.currentUser.uid).get()
        await commit('user/setUserInfo', user.data())
    }



}
