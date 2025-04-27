import { getAuth, signInWithEmailAndPassword } from "../config.js";

const auth = getAuth();

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("User Login Successfully");
      window.location.href = "../html/profile.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      alert("Error: " + errorMessage);
    });
});
