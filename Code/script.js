const firebaseConfig = {
    apiKey: "AIzaSyAwTS6rexGOxSYMnxpnI0M7Jtdd12RC7zY",
    authDomain: "exploresaudi-10d4d.firebaseapp.com",
    projectId: "exploresaudi-10d4d",
    storageBucket: "exploresaudi-10d4d.appspot.com",
    messagingSenderId: "769727383031",
    appId: "1:769727383031:web:bbfbf07339317b60615af2",
    measurementId: "G-ZRQHCT5Z4Y"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Switch between login and signup forms
document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
});

document.getElementById('signUpBtn').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
});

// Password validation function for Sign Up form
function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long, include a capital letter, a number, and a symbol.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    return true;
}

    // Redirect after successful login (still working on it)
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert('Logged in successfully!');
        window.location.href = "homepage.html";  
    })
    .catch((error) => {
        alert('Error: ' + error.message);
    });


    auth.onAuthStateChanged(function(user) {
        if (user) {
            const profilePic = document.getElementById('profilePic');
            profilePic.style.display = 'block'; 
            document.getElementById('signInBtn').style.display = 'none'; 
    
            if (user.photoURL) {
                profilePic.src = user.photoURL;
            } else {
                profilePic.src = "default-profile.png";
            }
        } else {
            // No user is signed in
            document.getElementById('profilePic').style.display = 'none';
            document.getElementById('signInBtn').style.display = 'block';
        }
    });
    

// Handle sign up form submission
document.getElementById('signUp').addEventListener('submit', function(e) {
    e.preventDefault();

    if (validatePassword()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert('Account created successfully!');
                // Redirect to login page or homepage after sign up
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    }
});

// Handle login form submission
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Logged in successfully!');
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});
