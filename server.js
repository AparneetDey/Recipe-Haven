const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const { isUint16Array } = require('util/types');
const { emit } = require('process');
const { log } = require('console');

let users = [{
    userName: 'Ayush',
    passWord: '12345'
}];

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

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

//Signup
app.post('/signup', (req, res) => {
    const user = {
        userName: req.body.username,
        passWord: req.body.password
    };

    users.push(user);
    req.session.user = user;

    renderPage(req, res);
});

//Login 
app.post('/login', (req, res) => {
    const user = {
        userName: req.body.username,
        passWord: req.body.password
    };

    if (users.some(u => u.userName === user.userName)) {
        if (users.some(u => u.passWord === user.passWord)) {
            req.session.user = user;

            renderPage(req, res);
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

// Serve static files from the public directory
app.use(express.static('public'));

// Serve robots.txt
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

//signout
app.get('/signout',(req,res)=>{
    if(req.session){
        delete req.session.user;
    }
    renderPage(req,res);
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
    let title;

    const user = req.session.user || {
        userName: '',
        passWord: ''
    };
    const userName = user.userName;

    switch (page) {
        case 'home':
            title = 'Home';
            break;
        case 'recipe':
            title = 'Recipes';
            break;
        case 'blog':
            title = 'Blogs';
            break;
        case 'about':
            title = 'About';
            break;
    }
    res.render('index', { template: template, title: title, username: userName });
}

function renderAuthentication(req, res, errorMessage = '') {
    const page = req.query.page || 'login';
    template = 'authentication-template/' + page;

    switch (page) {
        case 'login':
            title = 'Log In';
            break;
        case 'signup':
            title = 'Sign Up';
            break;
    }

    res.render('authentication', { template: template, title: title, errorMessage: errorMessage });
}