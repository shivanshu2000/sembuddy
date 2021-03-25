import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();

  return {
    ...data,
    id: snapshot.id,
  };
}

export function listenToEventFromFirestore(filter) {
  return db.collection('pdfs').where('category', '==', filter);
}

export function listenToEventsFromFirestore() {
  return db.collection('pdfs');
}

export function updatePdfInFirestore(pdf) {
  return db.collection('pdfs').doc(pdf.id).update(pdf);
}

export function setUserProfileData(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      role: 'user',
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export async function uploadPdf(downloadUrl, pdf, filename) {
  const user = firebase.auth().currentUser;

  try {
    await db.collection('pdfs').add({
      name: filename,
      givenBy: pdf.Name,
      category: pdf.category,
      uploadedBy: user.displayName,
      pdf: downloadUrl,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}
