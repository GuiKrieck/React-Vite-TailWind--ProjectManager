const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express()

app.use(cors());
app.use(express.json());

const projectsFilePath = path.join(__dirname, 'projects.json');

app.get('/projects', (req, res) => {
    fs.readFile(projectsFilePath, 'utf-8', (err, data) =>{
        if (err){
            return res.status(500).json({error: 'Error on reading the projects file'});
        }

        res.status(200).json(JSON.parse(data));
    });
});

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

app.put('/projects/:projectId', (req, res) => {
    const {projectId} = req.params;
    const updatedData = req.body;

    fs.readFile(projectsFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: "Error reading projects file"});
        }

        const projectsData = JSON.parse(data);
        const projectIndex = projectsData.projects.findIndex((project) => project.id === projectId);

        if (projectIndex === -1) {
            return res.status(404).json({error: 'Project not found'})
        }

        projectsData.projects[projectIndex]= {
            ...projectsData.projects[projectIndex],
            ...updatedData,
        };

        fs.writeFile(projectsFilePath, JSON.stringify(projectsData, null, 2), (err) => {
            if (err){
                return res.status(500).json({error:'Error saving projects file'});
            }

            res.status(200).json({message: 'Project Updated Successfully', updatedProjectData:projectsData.projects[projectIndex]});
        });
    });
});

app.delete('/projects/:projectId', (req, res) =>{
    const {projectId} = req.params;

    fs.readFile(projectsFilePath, 'utf-8', (err, data) => {
        if (err){
            return res.status(500).json({error: 'Error reading projects file'});
        }

        const projectsData = JSON.parse(data);
        const updatedProjects = projectsData.projects.filter((project) => project.id !== projectId);

        if(updatedProjects.length === projectsData.projects.length) {
            return res.status(404).json({error: 'Project not found'});
        }

        projectsData.projects = updatedProjects;

        fs.writeFile(projectsFilePath, JSON.stringify(projectsData, null, 2), (err) => {
            if(err) {
                return res.status(500).json({error: 'Error saving projects file'});
            }

            res.status(200).json({ message: 'Project deleted sucessfully'});
        });
    });
});

app.post('/addTask/:projectId', (req,res) =>{
    const projectId = req.params.projectId;
    const newTask = req.body;

    fs.readFile(projectsFilePath, 'utf-8', (err, data) => {
        if (err){
            return res.status(500).json({error: 'Error on reading the projects file'});
        }

        const projectsData = JSON.parse(data);
        const projectIndex = projectsData.projects.findIndex ((project) => project.id === projectId)

        if (projectIndex === -1) {
            return res.status(404).json({error: 'Project not found'});
        }

        projectsData.projects[projectIndex].tasks = [...(projectsData.projects[projectIndex].tasks || []), newTask];

        fs.writeFile(projectsFilePath, JSON.stringify(projectsData, null, 2), (err) => {
            if (err){
                return res.status(500).json({error: 'Error on saving the projects file'});
            }

            res.status(200).json({message: 'Success on adding the new task.'});
        });
    });
});

app.delete('/projects/:projectId/tasks/:taskId', (req, res) =>{
    const {projectId, taskId} = req.params;

    fs.readFile(projectsFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Error reading projects file'});
        }

        const projectsData = JSON.parse(data);
        const projectIndex = projectsData.projects.findIndex((project) => project.id === projectId);

        if (projectIndex === -1) {
            return res.status(404).json({error:'Project not found'});
        }

        const updatedTasks = projectsData.projects[projectIndex].tasks.filter((task) => task.id !== taskId);

        projectsData.projects[projectIndex].tasks = updatedTasks;

        fs.writeFile(projectsFilePath, JSON.stringify(projectsData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({error: 'Error saving projects file'})
            }

            res.status(200).json({message: 'Task deleted sucessfully' });
        })
    })
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server on - Port: ${PORT}`);
});