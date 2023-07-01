import { createStore } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import router from "../router";
export default createStore({
  state: {
    scrolled: false,
    photoFileName: null,
    saved: false,
    loggedOut: localStorage.getItem("Is-logged") === "true",
    mobileScreen: false,
    mobileScreenOpened: false,
    loggedIn: false,
    showOptions: false,
    showOptions: false,
    UserInitials: "",
    errorForDonate: "",
    errordCheck: false,
    userImage: "",
    User: {
      userName: "",
      userEmail: "",
      userPassWord: "",
      userID: "",
      matricNom: "",
      profileImage: null,
      phoneNumber: null,
      key: undefined,
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
    allPayments:false,
    allUsers:false,
  },
  getters: {},
  mutations: {
    Login(state) {
      let { userEmail, userPassWord, userID } = state.User;
      if (userEmail === "" || userPassWord === "") {
        return;
      } else {
        state.loading = true;

        signInWithEmailAndPassword(firebaseAuth, userEmail, userPassWord)
          .then((userCredential) => {
            userID = userCredential.user.uid;
            localStorage.setItem("userid", userCredential.user.uid);
            state.loading = false;
            localStorage.setItem("Is-logged", false);
            router.push("/user");
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
      let { userEmail, userName, userPassWord } = state.User;
      if (confirm("Do you want to logout")) {
        signOut(firebaseAuth)
          .then(() => {
            localStorage.removeItem("userid");
            state.User= {
              userName: "",
              userEmail: "",
              userPassWord: "",
              userID: "",
              matricNom: "",
              profileImage: null,
              phoneNumber: null,
              key: undefined,
            },
            userEmail, userName, (userPassWord = "");
            localStorage.setItem("Is-logged", true);
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async Submit(state) {
      let { userEmail, userPassWord, userID, matricNom, userName } = state.User;

      if (
        userEmail === "" ||
        userName === "" ||
        userPassWord === "" ||
        matricNom === ""
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
      } else if (!userEmail.includes("@") || !userEmail.includes(".")) {
        state.error = true;
        state.errMssg = "Enter a valid Email";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else if (
        matricNom.length !== 12 ||
        matricNom.slice(0, 2).toLowerCase() !== "uj" ||
        typeof matricNom.slice(6, 8) !== "string"
      ) {
        state.error = true;
        state.errMssg = "Enter a valid Matric Nom";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else if (matricNom.includes("/")) {
        state.error = true;
        state.errMssg = "Remove all slashes";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } 
      else if (!matricNom.includes("CS" || "MD") ) {
        state.error = true;
        state.errMssg = "Signup is only for Jumsites";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else {
        state.loading = true;
        createUserWithEmailAndPassword(firebaseAuth, userEmail, userPassWord)
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
            setDoc(doc(db, "Users", userID), {
              Email: userEmail,
              password: userPassWord,
              Username: userName,
              matricNom: matricNom.toUpperCase(),
              phoneNumber: state.User.phoneNumber,
              profileImage: state.User.profileImage,
              key: state.User.profileImage,
            });
            state.loading = false;
          })
          .then(() => {
            router.push("/user");
          });
      }
    },  async AdminSubmit(state) {
      let { userEmail, userPassWord, userID, matricNom, userName,key } = state.User;

      if (
        userEmail === "" ||
        userName === "" ||
        userPassWord === "" ||
        matricNom === "" ||
        key=== undefined
      ) {
        state.error = true;
        state.errMssg = "Please, fill all details.";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } 

      else if (userPassWord.length < 7) {
        state.error = true;
        state.errMssg = "Password must be minimum of eight characters";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      }
       else if (!userEmail.includes("@") || !userEmail.includes(".")) {
        state.error = true;
        state.errMssg = "Enter a valid Email";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } 
      else if (
        matricNom.length !== 12 &&
        matricNom.slice(0, 2).toLowerCase() !== "uj" &&
        typeof matricNom.slice(6, 8) !== "string"
      ) {
        state.error = true;
        state.errMssg = "Enter a valid Matric Nom";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } else if (matricNom.includes("/")) {
        state.error = true;
        state.errMssg = "Remove all slashes";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      }  else if (key.toString() !== '080646444') {
        state.error = true;
        state.errMssg = "wrong admin key";
        setTimeout(() => {
          state.error = false;
          state.errMssg = "";
        }, 5000);
      } 
  

      else {
        state.loading = true;
        createUserWithEmailAndPassword(firebaseAuth, userEmail, userPassWord)
          .then((userCredential) => {
            state.User.userID = userCredential.user.reloadUserInfo.localId;
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
            setDoc(doc(db, "Users", state.User.userID), {
              Email: userEmail,
              password: userPassWord,
              Username: userName,
              matricNom: matricNom.toUpperCase(),
              phoneNumber: state.User.phoneNumber,
              profileImage: state.User.profileImage,
              key: state.User.key,
            });
            state.loading = false;
          })
          .then(() => {
            router.push("/admin");
          });
      }
    },

    async getUserData(state) {
      const user = firebaseAuth.currentUser;
      let newID = localStorage.getItem("userid");
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
       if(docSnap.data().key){
        router.push("/admin");

       }else{

        router.push("/user");

       }
        let initial =
          docSnap.data().Username.toUpperCase().slice(0, 1) +
          docSnap
            .data()
            .Username.toUpperCase()
            .slice(
              docSnap.data().Username.length - 1,
              docSnap.data().Username.length
            );
        state.User.userEmail = docSnap.data().Email;
        state.User.userName = docSnap.data().Username;
        state.User.userPassWord = docSnap.data().password;
        state.User.matricNom = docSnap.data().matricNom;
        state.User.phoneNumber = docSnap.data().phoneNumber
          ? docSnap.data().phoneNumber
          : "";
        state.User.profileImage = docSnap.data().profileImage
          ? docSnap.data().profileImage
          : "";
        state.User.key = docSnap.data().key
          
        state.UserInitials = initial;
        state.loggedIn = true;
      } else {
        console.log("No such document!");
      }
    },

    changeUserDetails(state) {
      const user = firebaseAuth.currentUser;
      const docRef = doc(db, "Users", user.uid);
      const data = {
        Email: state.User.userEmail,
        password: state.User.userPassWord,
        Username: state.User.userName,
        matricNom: state.User.matricNom.toUpperCase(),
        phoneNumber: state.User.phoneNumber,
        profileImage: state.User.profileImage,
        key:state.User.key
      };
      state.saved = true;
      setTimeout(() => {
        state.saved = false;
      }, 5000);
      setDoc(docRef, data).catch((error) => {
        console.log(error);
      });
    },
    filenameChanged(state, payload) {
      state.photoFileName = payload;
    },
    createFileUrl(state, payload) {
      state.userImage = payload;

      const imgRef = ref(storage, `documents/${state.photoFileName}`);

      uploadBytes(imgRef, state.userImage)
        .then((snapshot) => {
          getDownloadURL(imgRef).then((downloadURL) => {
            state.userImage = downloadURL;
            const user = firebaseAuth.currentUser;
            const docRef = doc(db, "Users", user.uid);
            state.User.profileImage = downloadURL;
            setDoc(docRef, {
              Email: state.User.userEmail,
              password: state.User.userPassWord,
              Username: state.User.userName,
              matricNom: state.User.matricNom.toUpperCase(),
              phoneNumber: state.User.phoneNumber,
              profileImage: downloadURL,
              key:state.User.key

            }).catch((error) => {
              console.log(error);
            });
          });
        })

        .catch((err) => {
          console.log(err);
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
