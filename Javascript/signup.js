import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
} from "./firebase.js";

const signUpHandler = async () => {
  try {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const fullNameInput = document.querySelector("#fullName");
    const genderInput = document.querySelector("#gender");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const gender = genderInput.value.trim();

    if (!email || !password || !fullName || !gender) {
      alert("Please fill in all fields.");
      return;
    }

    const response = await createUserWithEmailAndPassword(auth, email, password);
    const uid = response.user.uid;

    const userObj = {
      fullName,
      gender,
      email,
    };

    await setDoc(doc(db, "users", uid), userObj);

    alert("User successfully signed up");
    window.location.href = "../pages/login.html";
  } catch (error) {
    console.error("Sign-up error:", error.message);
    alert("Error signing up: " + error.message);
  }
};

window.signUpHandler = signUpHandler;