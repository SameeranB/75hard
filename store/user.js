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
  getUserInfo(state) {
    return state.userInfo
  }

}

export const mutations = {
  setUserLoggedIn(state, val) {
    state.userLoggedIn = val;
  },
  setLogInProcessing(state, val) {
    state.logInProcessing = val;
  },
  setUserInfo(state, val) {
    state.userInfo = val;
  },
  incrementUserWater(state) {
    state.userInfo.waterAmount += 100
  },
  decrementUserWater(state) {
    state.userInfo.waterAmount -= 100
  },
  switchUserWorkoutOne(state) {
    state.userInfo.workoutOne = !state.userInfo.workoutOne
  },
  switchUserWorkoutTwo(state) {
    state.userInfo.workoutTwo = !state.userInfo.workoutTwo
  },
  incrementUserRead(state){
    state.userInfo.currentPage= parseInt(state.userInfo.currentPage)+1
    state.userInfo.pagesToday= parseInt(state.userInfo.pagesToday)+1
  },
  decrementUserRead(state){
    state.userInfo.currentPage= parseInt(state.userInfo.currentPage)-1
    state.userInfo.pagesToday= parseInt(state.userInfo.pagesToday)-1
  },
  switchUserPicture(state) {
    state.userInfo.pictureTaken =! state.userInfo.pictureTaken
  },
  setUserBookInfo(state, val) {
    state.userInfo.bookName = val.bookName
    state.userInfo.totalPages = val.totalPages

  }

}
