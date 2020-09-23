export const state = () => ({
  userLoggedIn: false,
  logInProcessing: false,
  userInfo: {}
})

export const getters = {
  getUserLoggedIn(state) {
    return state.userLoggedIn
  },
  getLogInProcessing(state) {
    return state.logInProcessing
  },

}

export const mutations = {
  setUserLoggedIn(state, val) {
    state.userLoggedIn = val;
  },
  setLogInProcessing(state, val) {
    state.logInProcessing = val;
  },

}
