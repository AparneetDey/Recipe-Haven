const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Set up storage for multer to save files to public/images
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_profiles',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => `${req.session.user.username}-profile`
    }
});

const parser = multer({ storage: storage });

module.exports = parser;