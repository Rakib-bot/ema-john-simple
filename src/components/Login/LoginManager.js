import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




export const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    
    // If a user is already signed in
    // if (auth.currentUser) {
    //     // Return a resolved Promise with the user information
    //     return Promise.resolve({
    //         isSignedIn: true,
    //         name: auth.currentUser.displayName,
    //         email: auth.currentUser.email,
    //         photo: auth.currentUser.photoURL
    //     });
    // }

    // If no user is signed in, initiate Google sign-in
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            };
            return signedInUser;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential);
            return { error: errorMessage }; // Return an error object
        });
}


export const handleSignOut = () => {
    return signOut(auth).then(() => {
        const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        }
        return signedOutUser;

    })
        .catch(err => {
            return err.message;

        })
}

export const signUpWithEmailAndPassword =(user)=>{
 

  return  createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // Signed up 
          
          console.log(res.user);
          const user = res.user;
          const userInformation={
            isSignedIn:true,
            isSignedUp:true,
            name:user.name,
            email:user.email,
            photo:user.photoURL,
            status:'Sign up Succesfully',


          }
          
          updateName(user.name);
            return userInformation;
          // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;

            return {error:errorMessage};
            
          // ..
        });
}
export const logInWithEmailAndPassword = (user)=>{
   return signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // Signed in 
          const userInformation= {
            isSignedIn:true,
            isSignedUp:true,
            name:res.user.displayName,
            email:res.user.email,
            photo:res.user.photoURL,
            status:'Logged in Succesfully'
          }

          
          console.log(res.user.email)
          return userInformation;
          // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential);
            return {error:errorMessage};
            // ...
         
            
        });
}
export const updateName = (name) =>{

    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      // ...
      console.log('user name updated')
    }).catch((error) => {
      // An error occurred
      // ...
      console.log(error)
    });
  }
export const handleFbSignIn = () => {
    const fbProvider = new FacebookAuthProvider();

    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            const user = result.user;
            console.log(user);

            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // Return the signed-in user information
            return {
                isSignedIn: true,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                status:'Sign in succesfully'
            };
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential);

            // Return an error object
            return { error: errorMessage };
        });
};

