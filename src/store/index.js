import { createStore } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import router from '../router'
export default createStore({
  state: {
    scrolled: false,
  
    loggedOut: localStorage.getItem("Is-logged") === "true",
    mobileScreen: false,
    mobileScreenOpened: false,
    showOptions: false,
    showOptions: false,
    UserInitials: "",
    errorForDonate: "",
    errordCheck: false,
    User:{
      userName: "",
      userEmail: "",
      userPassWord: "",
      userID: "",
      matricNom:""
    },
    pendingPrice: "",
    loading: false,
    
    error: false,
    errMssg: "",
    confirmUserEmail: "",
    profile: true,
    settings: false,
    completeDonations: false,
    makeDonations: false,
    contactus: false,
  },
  getters: {},
  mutations: {
    Login(state) {
      let {userEmail, userPassWord, userID} = state.User
      if (userEmail === "" || userPassWord === "") {
        return;
      } else {
        state.loading = true;

        signInWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          userPassWord
        )
          .then((userCredential) => {
            userID =userCredential.user.uid
            localStorage.setItem("userid", userCredential.user.uid);
            state.loading = false;
            localStorage.setItem("Is-logged", false);
            router.push('/user')
          })
          .catch((error) => {
            state.loading = false;

            state.error = true;
            state.errMssg = error.message;
            setTimeout(() => {
              state.error = false;
              state.errMssg = "";
            }, 20000);
          });
      }
    },
    logout(state) {
      let {userEmail, userName, userPassWord}=state.User
if(confirm('Do you want to logout')){
      signOut(firebaseAuth)
        .then(() => {
          localStorage.removeItem("userid");
          userEmail, userName, userPassWord = ''
          localStorage.setItem("Is-logged", true);
          router.push('/')
        })
        .catch((err) => {
          console.log(err);
        });
    }},
    async Submit(state) {
      let {userEmail, userPassWord, userID, matricNom, userName} = state.User

      if (
        userEmail === "" ||
      userName === "" ||
        userPassWord === "" ||
        matricNom === ''
      ) {
        state.error = true;
        state.errMssg = "Please, fill all details.";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else if (userPassWord.length < 7) {
        state.error = true;
        state.errMssg = "Password must be minimum of eight characters";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else if (
        !userEmail.includes("@") ||
        !userEmail.includes(".")
      ) {
        state.error = true;
        state.errMssg = "Enter a valid Email";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else if (
        matricNom.length !== 12 ||
        matricNom.slice(0,2).toLowerCase() !== ("uj") ||
       typeof matricNom.slice(6,8) !== 'string'
      ) {
        state.error = true;
        state.errMssg = "Enter a valid Matric Nom";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      }else if (
      matricNom.includes('/')
      ) {
        state.error = true;
        state.errMssg = "Remove all slashes";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else {
        state.loading = true;
        createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          userPassWord
        )
          .then((userCredential) => {
            userID = userCredential.user.reloadUserInfo.localId;
            localStorage.setItem(
              "userid",
              userCredential.user.reloadUserInfo.localId
            );
            localStorage.setItem("Is-logged", false);
// router.push('/user')
          })
          .catch((err) => {
            state.loading = false;
            state.error = true;
            state.errMssg = err.message;
            setTimeout(() => {
              state.error = false;
              state.errMssg = "";
            }, 10000);
          })
          .then(() => {
            setDoc(doc(db, "User", userID), {
              Email: userEmail,
              password: userPassWord,
              Username: userName,
              matricNom: matricNom.toUpperCase()
             
            });
            state.loading = false;
          }).then(()=>{
           router.push('/user') 
          })
      }
    },
   
    async getUserData(state) {
      const user = firebaseAuth.currentUser;
      let newID = localStorage.getItem("userid");
      const docRef = doc(db, "User", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let initial =
          docSnap.data().Username.toUpperCase().slice(0, 1) +
          docSnap
            .data()
            .Username.toUpperCase()
            .slice(
              docSnap.data().Username.length - 1,
              docSnap.data().Username.length
            );
      userEmail = docSnap.data().Email;
        userName = docSnap.data().Username;
       userPassWord = docSnap.data().password;
       matricNom = docSnap.data().matricNom
        UserInitials = initial;
      } else {
        console.log("No such document!");
      }
    },
   
    changeUserDetails(state) {
      const user = firebaseAuth.currentUser;
      const docRef = doc(db, "Users", user.uid);
      const data = {
        Email: state.userEmail,
        password: state.userPassWord,
        Username: state.userName,
        transaction: [{ time: "", price: state.pendingPrice, paid: false }],
      };
      setDoc(docRef, data)
        .then((docRef) => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
  actions: {},
  modules: {},
});
function generatedPassword(length) {
  for (let i = 0; i < length; i++) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
    return randomNumber;
  }
}
//remove tomorrow
