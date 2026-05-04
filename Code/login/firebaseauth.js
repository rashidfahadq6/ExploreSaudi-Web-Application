// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwTS6rexGOxSYMnxpnI0M7Jtdd12RC7zY",
  authDomain: "exploresaudi-10d4d.firebaseapp.com",
  projectId: "exploresaudi-10d4d",
  storageBucket: "exploresaudi-10d4d.appspot.com",
  messagingSenderId: "769727383031",
  appId: "1:769727383031:web:bbfbf07339317b60615af2",
  measurementId: "G-ZRQHCT5Z4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();




document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  // Show login form when 'Log In' button is clicked
  document.getElementById('loginBtn').addEventListener('click', () => {
    console.log("Login button clicked");
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
  });

  // Show sign-up form when 'Sign Up' button is clicked
  document.getElementById('signUpBtn').addEventListener('click', () => {
    console.log("Sign up button clicked");
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
  });

  // Handle login form submission
  document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login successful");

      // Redirect to homepage after successful login
      window.location.href = '/homepage.html';

    } catch (error) {
      console.error("Login error:", error.message);
      alert(`Login Error: ${error.message}`);
    }
  });

  // Monitor user authentication state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in");
      // Handle logged-in state
    } else {
      console.log("No user is logged in");
    }
  });
});
