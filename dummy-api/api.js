const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8008;
const cors = require('cors'); // Import cors

app.use(cors()); // Use cors middleware to enable CORS

// Replace 'data.json' with the path to your JSON file
const ZA_Populations = './json/ZA_Population.json';
const ZA_Dams = './json/ZA_Dams.json';

app.get('/ZA_populations', (req, res) => {
    fs.readFile(ZA_Populations, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Failed to load data' });
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).send({ error: 'Failed to parse JSON data' });
        }
    });
});

app.get('/ZA_dams', (req, res) => {
    fs.readFile(ZA_Dams, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Failed to load data' });
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).send({ error: 'Failed to parse JSON data' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});