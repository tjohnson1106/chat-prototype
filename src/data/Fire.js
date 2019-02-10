import firebase from "firebase";

class Fire {
  constructor() {
    this.init();

    this.observeAuth();
  }

  observeAuth = () => firebase.auth().onAuthStateChanged(this._onAuthStateChanged);

  _onAuthStateChanged = (user) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get ref() {
    return firebase.database().ref("messages");
  }

  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  parse = (snapshot) => {};

  off() {
    this.ref.off();
  }
}

init = () =>
  firebase.initializeApp({
    apiKey: "AIzaSyAUsvmXKxW_bKEBJSB2tVc8S9VL6nEkmaI",
    authDomain: "chat-prototype-57da2.firebaseapp.com",
    databaseURL: "https://chat-prototype-57da2.firebaseio.com",
    projectId: "chat-prototype-57da2",
    storageBucket: "chat-prototype-57da2.appspot.com",
    messagingSenderId: "443419599727"
  });

Fire.shared = new Fire();
export default Fire;
