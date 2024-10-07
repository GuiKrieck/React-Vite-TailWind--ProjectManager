const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express()

app.use(express.json());

const projectsFilePath = path.join(__dirname, 'projects.json');

app.post('/addProject', (req, res) => {
    const newProject = req.body;

    fs.readFile(projectsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error on reading the projects file' });
        }
        const projectsData = JSON.parse(data);

        projectsData.projects.push(newProject);

        fs.writeFile(projectsFilePath, JSON.stringify(projectsData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error on saving the projects file' });
            }

            res.status(200).json({ message: 'Success on Saving the new project.' });
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});