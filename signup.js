import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Firebase config
import { firebaseConfig } from "./firebaseConfig/firebase.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
document.addEventListener("DOMContentLoaded", function () {
  const formTitle = document.getElementById("title");
  const form = document.getElementById("login-form");
  const toggleText = document.getElementById("toggle-text");
  const submitBtn = document.getElementById("submit-btn");

  toggleText.addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() === "a") {
      e.preventDefault();
      let confirmGroup = document.getElementById("confirm-password-group");

      if (formTitle.textContent.includes("Login")) {
        formTitle.textContent = "Signup for Agronet";
        submitBtn.textContent = "Signup";
        toggleText.innerHTML = 'Already have an account? <a href="#">Login</a>';
        if (!confirmGroup) {
          confirmGroup = document.createElement("div");
          confirmGroup.id = "confirm-password-group";
          confirmGroup.innerHTML = `
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" required />
          `;
          form.insertBefore(confirmGroup, submitBtn);
        }
      } else {
        formTitle.textContent = "Login to Agronet";
        submitBtn.textContent = "Login";
        toggleText.innerHTML = `Don't have an account? <a href="#">Sign up</a>`;
        if (confirmGroup) confirmGroup.remove();
      }
    }
  });

  // Handle form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mode = submitBtn.textContent.toLowerCase(); // 'login' or 'signup'

    try {
      if (mode === "signup") {
        const confirmPassword =
          document.getElementById("confirm-password").value;
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      // Redirect on success
      window.location.href = "Agronet.html";
    } catch (error) {
      alert("Authentication failed: " + error.message);
    }
  });
});
