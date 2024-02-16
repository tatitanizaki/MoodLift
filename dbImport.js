const admin = require('firebase-admin');
const serviceAccount = require('./moodlift-6ab6e-firebase-adminsdk-zawdu-6c4dd0f6d8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const data = require('./assets/workoutsdb.json'); 

async function uploadData() {
  const collectionRef = db.collection('workouts');
  data.forEach(async (doc) => {
    await collectionRef.add(doc);
    console.log('Document added: ', doc.title);
  });
}

uploadData().catch(console.error);
