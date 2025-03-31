const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const multer = require('multer');

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
    res.locals.user = req.session.user || { username: '', password: '', profilePhoto: '' };
    next();
});




// Set up storage for multer to save files to public/images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'Images')); // Save images in 'public/images'
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

    const profileImageUrl = `/Images/${req.file.filename}`; // File path for the uploaded image
    
    req.session.user = req.session.user || {}; // Ensure user object exists
    req.session.user.profilePhoto = profileImageUrl; // Save the image path in session

    // You can save this URL in the user's profile in the database if required

    res.json({ imageUrl: profileImageUrl });
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
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    if (users.some(u => u.userName === user.userName)) {
        if (users.some(u => u.passWord === user.passWord)) {
            req.session.user = user;

            req.session.save(()=>{
                res.redirect('/')
            });
        }
        else {
            const errorMessage = 'Wrong Password';
            renderAuthentication(req, res, errorMessage)
        }
    }
    else {
        const errorMessage = 'Incorrect Username';
        renderAuthentication(req, res, errorMessage);
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
        about: 'About'
    }[page] || 'Page';

    res.render('index', { template: template, title: title});
}

function renderAuthentication(req, res, errorMessage = '') {
    const page = req.query.page || 'login';
    const template = 'authentication-template/' + page;
    let title = {
        login: 'login',
        signup: 'signup'
    }[page] || 'Page';

    res.render('authentication', { template: template, title: title, errorMessage: errorMessage });
}