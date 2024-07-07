import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBYCSCm_JIKP-a76FrHC6_K8-PJ1ZYIL3c',
  authDomain: 'ast-star-wars.firebaseapp.com',
  projectId: 'ast-star-wars',
  storageBucket: 'ast-star-wars.appspot.com',
  messagingSenderId: '28537298806',
  appId: '1:28537298806:web:1ed2e00a706dc9a15e2457',
  measurementId: 'G-T2XS9J2QSF',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
