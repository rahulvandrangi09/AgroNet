import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Firebase config
import { firebaseConfig } from "./firebaseConfig/firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize when DOM is ready
function initializeSignup() {
  const signupForm = document.getElementById("signup-form");

  if (!signupForm) {
    console.error("Signup form not found");
    return;
  }

  // Handle signup form submission
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "Agronet.html";
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  });
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSignup);
} else {
  initializeSignup();
}
