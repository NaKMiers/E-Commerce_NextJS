// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCL2uusHrsQCZIj1n3kJ1c0Zhkhiko7Il0',
  authDomain: 'arc-shop-52bc5.firebaseapp.com',
  projectId: 'arc-shop-52bc5',
  storageBucket: 'arc-shop-52bc5.appspot.com',
  messagingSenderId: '1006760229410',
  appId: '1:1006760229410:web:3581b7fc8278a78458e87b',
  measurementId: 'G-XHM9VXDZTX',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
