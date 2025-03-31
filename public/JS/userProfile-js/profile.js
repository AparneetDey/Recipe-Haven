// Upload Banner Image
const uploadBanner = document.getElementById('uploadBanner');
const uploadLine = document.querySelector('.uploadBanner');
const banner = document.getElementById('banner')
uploadBanner.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem("bannerImage", e.target.result);
            banner.style.background = `url(${e.target.result}) center/cover no-repeat`;
        };
        reader.readAsDataURL(file);
        uploadLine.style.display = 'none';
    }
});

function setBannerImage(){
    const bannerImage = localStorage.getItem("bannerImage");

    if(bannerImage){
        banner.style.background = `url(${bannerImage}) center/cover no-repeat`;
        uploadLine.style.display = 'none';
    }
    else{
        uploadLine.style.display = 'block';
    }
}

setBannerImage();

// Profile Icon Settings
function setProfileIcon(username, profileImageUrl) {
    const profileIcon = document.getElementById("profileIcon");
    if (!profileIcon) return;

    console.log(profileImageUrl)

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
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
});

if(profile){
    setProfileIcon(profile.username, profile.profilePhoto);
}