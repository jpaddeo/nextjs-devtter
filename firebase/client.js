import firebase from 'firebase';

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebase.firestore();

const mapUserFromFirebaseAuth = (user) => {
  const { email, photoURL, displayName, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email: email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return app.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  return app.auth().signInWithPopup(gitHubProvider);
};

export const addDevit = ({ avatar, content, userId, userName, image }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
    image,
  });
};

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data();
  return { ...data, id: doc.id, createdAt: +data.createdAt.toDate() };
};

export const listenLatestDevits = (callback) => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToDevitObject);
      callback(newDevits);
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
