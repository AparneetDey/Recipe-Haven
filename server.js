const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the public directory
app.use(express.static('public'));

// Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// Serve the index.html from the root directory
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
}

// Export the Express API
module.exports = app;