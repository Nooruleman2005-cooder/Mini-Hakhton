import { auth } from "../config.js"; 

window.onload = () => {
  auth.onAuthStateChanged((user) => {
    const profileSection = document.getElementById("profile-section");

    if (profileSection) {
      if (user) {
    
        const userName = user.displayName || "User";
        const userEmail = user.email;
        const userPhoto = user.photoURL || "../img/user-6820232_1280.webp" ;

        profileSection.innerHTML = `
          <div class="card">
            <img src="${userPhoto}" alt="Profile Image" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${userName}</h5>
              <p class="card-text">Email: ${userEmail}</p>
              <button id="sign-out-btn" class="btn btn-danger">Sign Out</button>
            </div>
          </div>
        `;

        // Handle Sign Out
        const signOutButton = document.getElementById("sign-out-btn");
        signOutButton.addEventListener("click", () => {
          auth.signOut().then(() => {
            alert("Signed out successfully");
            window.location.href = "../html/login.html";  
          }).catch((error) => {
            console.log(error);
            alert("Error signing out");
          });
        });
      } else {
        
        profileSection.innerHTML = "<p>You are not logged in.</p>";
      }
    } else {
      console.log("profile-section element not found");
    }
  });
};
