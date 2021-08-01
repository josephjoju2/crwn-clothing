 import firebase from 'firebase/app';

 import 'firebase/firestore';

 import 'firebase/auth';

 const config={
    apiKey: "AIzaSyCpx9KI8RDwntrMpVJX1ia0tX2EVGA_rwU",
    authDomain: "crwn-db-1ef6d.firebaseapp.com",
    projectId: "crwn-db-1ef6d",
    storageBucket: "crwn-db-1ef6d.appspot.com",
    messagingSenderId: "816514191486",
    appId: "1:816514191486:web:0a476dbd36174699f6882f",
    measurementId: "G-5NCRR828JM"
  };

  export const createUserProfileDocument= async(userAuth, additionalData)=>{
    if(!userAuth) return;
    
    const userRef=firestore.doc(`users/${userAuth.uid}`);

    const snapShot=await userRef.get()

    if(!snapShot.exists){
      const{displayName,email}=userAuth;
      const createdAt= new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      }catch(error){
        console.log('error creating user',error.message);
      }


    }
    return userRef
    
  }
  
  firebase.initializeApp(config)

  export const auth=firebase.auth();
  export const firestore= firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;