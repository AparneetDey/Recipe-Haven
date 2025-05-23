// Profile Icon Settings
function setProfileIcon(username, profileImageUrl) {
    const profileIcon = document.getElementById("profileIcon");
    const remove = document.getElementById('deletePicBtn');

    if (!profileIcon) return;

    if (profileImageUrl) {
        // If profile image exists, use it
        profileIcon.style.backgroundImage = `url(${profileImageUrl})`;
        profileIcon.innerText = ""; // Remove initial
        remove.style.display = "block";
    } else {
        // If no profile image, use the default initials with random color
        let initial = username.charAt(0).toUpperCase();
        profileIcon.innerText = initial;
        profileIcon.style.backgroundImage = ""; // Remove any background image
        profileIcon.style.backgroundColor = getRandomColor(); // Set random background color
        remove.style.display = "none";
    }
}

// Random Color for Initials
function getRandomColor() {
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Handle Image Upload
document.getElementById("profileUpload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("profilePhoto", file);

        // Send image to the server
        fetch('/upload-profile', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.imageUrl) {
                    // Set the profile icon to the uploaded image URL
                    setProfileIcon(profile.username, data.imageUrl);

                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    }
});

if (profile) {
    setProfileIcon(profile.username, profile.profilePhoto);
}

const profileBio = document.getElementById('profileBio');

profileBio.addEventListener("input", textAreaResize);

window.addEventListener('DOMContentLoaded', textAreaResize);

function textAreaResize(){
    profileBio.style.height = "auto";
    profileBio.style.height = profileBio.scrollHeight + "px";
}

profileBio.addEventListener("keydown", event => {
    if (event.key == "Enter" && !event.shiftKey) {
        event.preventDefault();
        saveBio();
        event.target.blur();
        window.location.reload();
    }
});

function saveBio() {
    const bio = profileBio.value;
  
    fetch('/save-bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bio })
    })
    .then(response => response.json())
    .catch(err => {
      console.error('Error saving bio:', err);
    });
  }
  