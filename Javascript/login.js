window.addEventListener("load", () => {
  if (localStorage.getItem("user")) {
    window.location.replace("../index.html");
  }
});

import { auth, signInWithEmailAndPassword } from "./firebase.js";

const loginHandler = async () => {
  try {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const response = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("respoonse", response.user.uid);
    localStorage.setItem("user", response.user.uid);
    window.location.replace("../index.html");
  } catch (error) {
    console.log("error", error.message);
  }
};

window.loginHandler = loginHandler;