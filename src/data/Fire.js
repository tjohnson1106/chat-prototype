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

  // create reference
  get ref() {
    return firebase.database().ref("messages");
  }

  // call message ref -> last 20 messages
  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  // parse method
  parse = (snapshot) => {};

  // unsubscribe
  off() {
    this.ref.off();
  }

  // get messages and format
  parse = (snapshot) => {
    // snapshot values
    const { timestamp: numberStamp, text, user } = snapshot.val();

    const { key: _id } = snapshot;

    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };
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
