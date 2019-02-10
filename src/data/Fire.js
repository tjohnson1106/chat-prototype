import firebase from "firebase";

class Fire {
  constructor() {
    this.init();

    this.observeAuth();
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

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // create reference
  get ref() {
    return firebase.database().ref("messages");
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

  // call message ref -> last 20 messages
  on = (callback) =>
    this.ref
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // accepts array of messages -> loop through
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
  };

  // save the message object with a unique ID
  append = (message) => this.ref.push(message);

  // unsubscribe/close connection
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
