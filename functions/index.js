const functions = require('firebase-functions');

const admin = require('firebase-admin')
admin.initializeApp();

exports.evaluateUsersProgress = functions.pubsub.schedule('00 02 * * *').timeZone('Asia/Kolkata').onRun((context) => {
  return admin.firestore().collection(`Users`).listDocuments().then(async userList => {
    return userList
  }).then(async userList => {
    for (let userRef of userList) {
      let user = await userRef.get()
      let today = new Date()
      today = today.toISOString()
      if (user.get('pagesToday') >= 10 && user.get('pictureTaken') && user.get('waterAmount') >= user.get('waterGoal') && user.get('workoutOne') && user.get('workoutTwo')) {
        let log = user.get('logs')
        if (log === null){
          log = {}
        }
        log[today] = {
          bookName: user.get('bookName'),
          currentPage: user.get('currentPage'),
          day: user.get('day'),
          successful: true
        }
        await admin.firestore().doc(`Users/${user.id}`).update({
          pagesToday: 0,
          pictureTaken: false,
          waterAmount: 0,
          workoutOne: false,
          workoutTwo: false,
          day: user.get('day') + 1,
          logs: log

        })
      } else {
        let log = user.get('logs')
        if (log === null){
          log = {}
        }
        log[today] = {
          bookName: user.get('bookName'),
          currentPage: user.get('currentPage'),
          day: user.get('day'),
          successful: false
        }
        await admin.firestore().doc(`Users/${user.id}`).update({
          pagesToday: 0,
          pictureTaken: false,
          waterAmount: 0,
          workoutOne: false,
          workoutTwo: false,
          day: 0,
          logs: log
        })
      }
    }
    return 0
  })
})
