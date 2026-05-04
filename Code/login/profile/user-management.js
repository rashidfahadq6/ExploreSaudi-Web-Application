import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";  // For uploading pictures

const auth = getAuth();
const user = auth.currentUser;
const storage = getStorage();

// Handle name update
document.getElementById('updateNameBtn').addEventListener('click', async () => {
  const newName = document.getElementById('newName').value;

  if (user && newName) {
    await updateProfile(user, {
      displayName: newName
    });
    alert('Name updated successfully!');
  } else {
    alert('Please enter a valid name.');
  }
});

// Handle profile picture upload
document.getElementById('uploadPicBtn').addEventListener('click', async () => {
  const file = document.getElementById('profilePicUpload').files[0];

  if (file && user) {
    const storageRef = ref(storage, `profile_pics/${user.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    // Update the user's profile with the new photo URL
    await updateProfile(user, {
      photoURL: downloadURL
    });

    alert('Profile picture updated successfully!');
  } else {
    alert('Please select a file.');
  }
});
