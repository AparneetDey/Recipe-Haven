const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

const { isUint16Array } = require('util/types');
const { emit } = require('process');
const { log } = require('console');

let users = [{
    username: 'Ayush',
    password: '12345'
}];

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static('public'));

// Configure session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//  Global User Middleware (Makes user available in all templates)
app.use((req, res, next) => {
    res.locals.user = req.session.user || {username: ''};
    next();
});




// Set up storage for multer to save files to public/images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'Images','profileImages')); // Save images in 'public/Images/profileImages'
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filename
    }
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

// Route to handle profile image upload
app.post('/upload-profile', upload.single('profilePhoto'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const profileImageUrl = `/Images/profileImages/${req.file.filename}`; // File path for the uploaded image
    
    req.session.user = { ...req.session.user, profilePhoto: profileImageUrl };
    let updatedUser = req.session.user;

    users = users.map(user => 
        user.username === updatedUser.username ? { ...user, ...updatedUser } : user
    );
    

    // You can save this URL in the user's profile in the database if required

    res.json({ imageUrl: profileImageUrl });
});

app.post('/upload-banner', upload.single('bannerPhoto'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const bannerImageUrl = `/Images/profileImages/${req.file.filename}`; // File path for the uploaded image
    
    req.session.user = { ...req.session.user, bannerPhoto: bannerImageUrl };
    let updatedUser = req.session.user;

    users = users.map(user => 
        user.username === updatedUser.username ? { ...user, ...updatedUser } : user
    );
    

    // You can save this URL in the user's profile in the database if required
    res.json({ imageUrl: bannerImageUrl });
});


//Remove Profile photo
app.post('/remove-photo', (req,res)=>{
    const user = req.session.user;

    if(user && user.profilePhoto){
        const imageUrl = path.join(__dirname, 'public', user.profilePhoto);

        fs.unlink(imageUrl, (err)=>{
            if(err){
                console.error('Error deleting profile photo:', err);
                return res.status(500).send('Failed to delete image.');
            }
        });

        user.profilePhoto = '';
        res.redirect('/?page=profile');
    }
    else if(user && user.bannerPhoto){
        const imageUrl = path.join(__dirname, 'public', user.bannerPhoto);

        fs.unlink(imageUrl, (err)=>{
            if(err){
                console.error('Error deleting profile photo:', err);
                return res.status(500).send('Failed to delete image.');
            }
        });

        user.bannerPhoto = '';
        res.redirect('/?page=profile');
    } else{
        res.redirect('/?page=profile');
    }
});

// Serve robots.txt
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

//Signup
app.post('/signup', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    users.push(user);
    req.session.user = user;

    req.session.save(()=>{
        res.redirect('/');
    });
});

//Login 
app.post('/login', (req, res) => {
    const sample = {
        username: req.body.username,
        password: req.body.password
    };

    let user = users.find(u => u.username === sample.username);

    if (user) {
        if (user.password === sample.password) {
            req.session.user = user;

            req.session.save(()=>{
                res.redirect('/')
            });
        }
        else {
            const errorMessage = 'Wrong Password';
            res.redirect(`/authentication?page=login&error=${errorMessage}`);
        }
    }
    else {
        const errorMessage = 'Incorrect Username';
        res.redirect(`/authentication?page=login&error=${errorMessage}`)
    }
});

//signout
app.get('/signout',(req,res)=>{
    req.session.regenerate(err => {
        if (err) {
            console.error('Error regenerating session:', err);
        }
        res.redirect('/');
    });
})

// Route to serve the authentication page
app.get('/authentication', (req, res) => {
    renderAuthentication(req, res);
});

// Serve the index.html from the root directory
app.get('/*', (req, res) => {
    renderPage(req, res);
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}`);
            server.close();
            app.listen(port + 1, () => {
                console.log(`Server is running on port http://localhost:${port + 1}`);
            });
        } else {
            console.error('Server error:', err);
        }
    });
}

// Export the Express API
module.exports = app;



function renderPage(req, res) {
    const page = req.query.page || 'home';
    const template = 'index-template/' + page;
    let title = {
        home: 'Home',
        recipe: 'Recipes',
        blog: 'Blogs',
        about: 'About',
        profile: 'Profile'
    }[page] || 'Page';

    if (['profile', 'settings'].includes(page) && !req.session.user) {
        return res.redirect('/authentication?page=login');
    }

    res.render('index', { template: template, title: title});
}

function renderAuthentication(req, res,) {
    const page = req.query.page || 'login';
    const template = 'authentication-template/' + page;
    let title = {
        login: 'login',
        signup: 'signup'
    }[page] || 'Page';

    const errorMessage = req.query.error;

    res.render('authentication', { template: template, title: title, errorMessage: errorMessage });
}