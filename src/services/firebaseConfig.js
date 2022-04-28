import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFteclVMt2YHGUU1OshvPt4DVkgF2Gx4o",
  authDomain: "reactjsproject-9f891.firebaseapp.com",
  databaseURL: "https://reactjsproject-9f891-default-rtdb.firebaseio.com",
  projectId: "reactjsproject-9f891",
  storageBucket: "reactjsproject-9f891.appspot.com",
  messagingSenderId: "19174787293",
  appId: "1:19174787293:web:13323e5ab1dfd57ed07334"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;