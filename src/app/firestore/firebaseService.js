import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function socialLogin() {
  let provider;

  provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
    console.log('here');
  } catch (error) {
    console.log(error);
  }
}

export function uploadToFirebaseStorage(file, filename) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/pdfs/${filename}`).put(file);
}
