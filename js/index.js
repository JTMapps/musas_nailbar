// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import{ getAuth, onAuthStateChanged,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import{ getDatabase, set, get, update, remove, ref, child}from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDchmMBxjVpaN4FURLjjQeDRYi5jOmAKS4",
  authDomain: "nailbar-3e137.firebaseapp.com",
  projectId: "nailbar-3e137",
  storageBucket: "nailbar-3e137.appspot.com",
  messagingSenderId: "376868791660",
  appId: "1:376868791660:web:0991c5673e71362e227f49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

const userfirstName = document.querySelector("#userfirstName");
const userlastName = document.querySelector("#userlastName");
const userPhoneNumber = document.querySelector("#userPhoneNumber");
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");


const checkAuthState = async() => {
onAuthStateChanged(auth, user => {
    if(user) {
        window.href("index.html");
    }
    else{
        alert("Hey ... we couldnt log you in");
        
    }
})}
	checkAuthState();

    const userSignOut = async() => {
        await signOut(auth);
    }


const userSignUp = async() => {
    const signUpEmail = userEmail.value;
    const signUpPassword = userPassword.value;
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        InsertData();
        alert("Your account has been created!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    })
}

const userSignIn = async() => {
    const signInEmail = userEmail.value;
    const signInPassword = userPassword.value;
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("You have signed in successfully!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    })
}

function InsertData(){
    set(ref(db, "People/" + firebase.auth().currentUser.uid + "person/", {
        name: userfirstName.value,
        surname: userlastName,
        email: userEmail.value,
        phoneNumber: userPhoneNumber.value,
    })
    .then(()=>{
        alert("Data Added Successfully");
    })
    .catch((error)=>{
        alert(error);
    })
)};

document.addEventListener('DOMContentLoaded', function(){ 
    $("#signOutButton").click(userSignOut);
    $("#signUpButton").click(userSignUp);
    $("#signInButton").click(userSignIn);
});

