const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the index.html from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});