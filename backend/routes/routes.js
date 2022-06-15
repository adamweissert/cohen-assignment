import express from 'express';

const router = express.Router();

let todos = [
    { id: 0, name: 'Make Dinner', finished: false, tasks: [
        {id: 0, title: "Look up recipe", date: "6/15/2022", priority: 3, completed: false}, 
        {id: 1, title: "Get ingredients", date: "6/15/2022", priority: 2, completed: false}, 
        {id: 2, title: "Cook the food", date: "6/15/2022", priority: 2, completed: false}, 
        {id: 3, title: "Eat!", date: "6/15/2022", priority: 3, completed: false}, 
    ] },
    { id: 1, name: 'Play with my Cat', finished: false,  tasks: [
        {id: 0, title: "Pick out a toy", date: "6/15/2022", priority: 3, completed: false},
        {id: 1, title: "Play for 15-20 minutes", date: "6/15/2022", priority: 2, completed: false}, 
    ] },
    { id: 2, name: 'Read a book', finished: false,  tasks: [
        {id: 0, title: "Find a good book", date: "6/15/2022", priority: 2, completed: false}, 
        {id: 1, title: "Go to a quiet location", date: "6/15/2022", priority: 3, completed: false}, 
        {id: 2, title: "Start reading", date: "6/15/2022", priority: 2, completed: false}
    ] },
];

router.get('/todos', (req, res) => {
    return res.status(200).send(todos);
});

router.get('/tasks/:id', (req, res) => {
    let id = req.params.id;
    let tasks = [];
    
   todos.forEach((object, index) => {
        if (index.toString() === id) {
            tasks.push(object.tasks);
        }
   });

    return res.status(200).send(tasks);
});

router.post('/todos', (req, res) => {
    let name = req.body.name.trim();
    if (name) {
        let exists = todos.some(todo => todo.name.toLowerCase() === name.toLowerCase());
        let todoId = todos.length;

        if (!exists) {
            todos.push({id: todoId, name: name,  completed: false, tasks: []});        
            return res.status(200).json({ message: 'Todo created', created: true });
        }
        return res.status(200).json({ message: 'Already exists' });
    } else {
        return res.status(500).json({ message: 'Error occurred' });
    }
});

router.post('/tasks/:id', (req, res) => {
    return res.status(200).send(todos);
});

router.put('/tasks/:id', (req, res) => {
    return res.status(200).send(todos);
});


router.delete('/todos/:id', (req, res) => {
    return res.status(200).send(todos);
});

router.delete('/tasks/:id', (req, res) => {
    return res.status(200).send(todos);
});

export default router;