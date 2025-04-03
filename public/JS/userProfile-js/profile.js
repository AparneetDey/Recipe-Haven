// Profile Icon Settings
function setBanner(bannerImageUrl) {
    const uploadBanner = document.getElementById("uploadBanner");
    const banner = document.getElementById('banner');

    console.log(bannerImageUrl);

    if (!uploadBanner) return;

    if (bannerImageUrl) {
        // If profile image exists, use it
        uploadBanner.style.backgroundImage = `url(${bannerImageUrl})`;
        uploadBanner.innerText = ""; // Remove initial
        banner.style.background = "";
    } else {
        uploadBanner.innerText = "Put up a Banner!";
        uploadBanner.style.backgroundImage = ""; // Remove any background image
        banner.style.background = "#ddd";
    }
}

// Handle Banner Upload
document.getElementById("uploadBanner").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("bannerPhoto", file);

        // Send banner to the server
        fetch('/upload-banner', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.imageUrl) {
                console.log(data.imageUrl);
                setBanner(data.imageUrl);

                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
});

// Profile Icon Settings
function setProfileIcon(username, profileImageUrl) {
    const profileIcon = document.getElementById("profileIcon");
    if (!profileIcon) return;

    console.log(profileImageUrl);

    if (profileImageUrl) {
        // If profile image exists, use it
        profileIcon.style.backgroundImage = `url(${profileImageUrl})`;
        profileIcon.innerText = ""; // Remove initial
    } else {
        // If no profile image, use the default initials with random color
        let initial = username.charAt(0).toUpperCase();
        profileIcon.innerText = initial;
        profileIcon.style.backgroundImage = ""; // Remove any background image
        profileIcon.style.backgroundColor = getRandomColor(); // Set random background color
    }
}

// Random Color for Initials
function getRandomColor() {
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Handle Image Upload
document.getElementById("profileUpload").addEventListener("change", function(event) {
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
                setProfileIcon("", data.imageUrl);

                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
});

if(profile){
    setProfileIcon(profile.username, profile.profilePhoto);
    setBanner(profile.bannerPhoto);
}