const express = require('express');
const path = require('path');

const app = express();
const PORT = 4400;

// Static files serve
app.use(express.static(path.join(__dirname, 'build')));

// React Router for fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`> Server is running on http://localhost:${PORT}`);
});
