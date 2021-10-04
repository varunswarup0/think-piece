import firebase from 'firebase/compat//app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const config = {
  apiKey: 'AIzaSyAdsSIHhePG0152ZTA9aNPTcTe0XqHZILI',
  authDomain: 'think-piece-b7cba.firebaseapp.com',
  databaseURL: 'https://think-piece-b7cba.firebaseio.com',
  projectId: 'think-piece-b7cba',
  storageBucket: 'think-piece-b7cba.appspot.com',
  messagingSenderId: '1052738488279',
  appId: '1:1052738488279:web:5f2e06971575de9e50ed92',
  measurementId: 'G-LEQJQWPH66'
}

firebase.initializeApp(config)

export const fireStore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signOut = () => auth.signOut()

window.firebase = firebase

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return
  // Get a reference to the place in database where a user profile might be.
  const userRef = fireStore.doc(`users/${user.uid}`)

  // Go and fetch the document from that location.
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('Error Creating User', error.message)
    }
  }

  return getUserDocument(user.uid)
}

export const getUserDocument = async (uid) => {
  if (!uid) return null
  try {
    return fireStore.collection('users').doc(uid)
  } catch (error) {
    console.error('Error Fetching User', error.message)
  }
}

export default firebase
