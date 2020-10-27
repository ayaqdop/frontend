import firebase from 'firebase'

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID
}
firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database()
