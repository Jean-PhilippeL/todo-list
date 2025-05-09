// src/server.ts

import express, { Request, Response } from "express";
import cors from "cors";
import type { Task } from "./task"
import {v4 as uuidv4} from 'uuid';


const app = express();
const PORT = process.env.PORT || 8000;
const jsonfile = require('jsonfile');
const path = 'tasks.json';

app.use(cors());

app.get("/", (req: Request, res: Response) => {
res.status(200).json({
success: true,
message: "API is working fine."
});
});

app.get('/api/ping', (req: Request, res: Response) => {
    res.json({ message: 
            'pong' });
});


app.get('/api/add/:name', (req: Request, res: Response) => {
    let allTasks: Task[] = readTasksFromFile();
    
    const newTask: Task = {
        name: req.params.name,
        status: "created",
        id: uuidv4()
    };

    allTasks.push(newTask);

    saveTasksToFile(allTasks)
	res.status(201).json(newTask);
	res.status(201).json(newTask);
});

app.get('/api/delete/:id', (req: Request, res: Response) => {
    let allTasks: Task[] = readTasksFromFile().filter(t => t.id != req.params.id);
    saveTasksToFile(allTasks)
	res.json({ message: 'deleted : ' + req.params.id });
});

app.get('/api/update/:id/:status', (req: Request, res: Response) => {
    let allTasks: Task[] = readTasksFromFile()
	allTasks.filter(t => t.id === req.params.id).forEach(t => {
			t.status = req.params.status
	});
    saveTasksToFile(allTasks)
	res.json({ message: 'updated : ' + req.params.id });
});

app.get('/api/all', (req: Request, res: Response) => {	
	res.status(200).json(readTasksFromFile());
});

function readTasksFromFile(): Task[] {
    let allTasks: Task[] = [];
    try {
        allTasks = jsonfile.readFileSync(path);
        if (!Array.isArray(allTasks)) {
            allTasks = [];
        }
    } catch (err) {
        console.error(err);
    }
    return allTasks;
}

function saveTasksToFile(tasks: Task[]){
	jsonfile.writeFile(path, tasks, function (err: Error) {
        if (err) console.error(err);
    });
}

app.listen(PORT, () => {
	console.log(`API is working on PORT ${PORT}`);
});