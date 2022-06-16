import express from 'express';

const router = express.Router();

let todos = [
    { id: 0, name: 'Make Dinner', finished: false, tasks: [
        {id: 0, title: "Look up recipe", date: "06/15/2022", priority: "Medium", completed: false}, 
        {id: 1, title: "Get ingredients", date: "06/15/2022", priority: "Medium", completed: false}, 
        {id: 2, title: "Cook the food", date: "06/15/2022", priority: "Medium", completed: false}, 
        {id: 3, title: "Eat!", date: "06/15/2022", priority: "Medium", completed: true}, 
    ] },
    { id: 1, name: 'Play with my Cat', finished: false,  tasks: [
        {id: 0, title: "Pick out a toy", date: "06/15/2022", priority: "Medium", completed: false},
        {id: 1, title: "Play for 15-20 minutes", date: "06/15/2022", priority: "Medium", completed: false,
        }, 
    ] },
    { id: 2, name: 'Read a book', finished: false,  tasks: [
        {id: 0, title: "Find a good book", date: "06/15/2022", priority: "Medium", completed: false}, 
        {id: 1, title: "Go to a quiet location", date: "06/15/2022", priority: "Medium", completed: false}, 
        {id: 2, title: "Start reading", date: "06/15/2022", priority: "Medium", completed: false}
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
    if (!req.body) return res.status(500).send({ message: 'input required' });

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
    if (!req.body) return res.status(500).send({ message: 'input required' });
    let { todoId, title, date, priority } = req.body.data;

    let task = {};
    let taskExists = false;
    let todoItem = todos.at(parseInt(todoId));
    let todoItemTasks = todoItem.tasks;

    let dateParts = date.split("-");
    let year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2];
    let formattedDate = month + "/" + day + "/" + year;

    todoItemTasks.forEach((task) => {
        if (task.title.toLowerCase() == title.toLowerCase() && task.date == formattedDate) {
            taskExists = true;
        }
    })

    if (!taskExists) {
        task.id = todoItemTasks.length;
        task.title = title;
        task.date = formattedDate;
        task.priority = priority;

        todoItem.tasks.push(task);

        return res.status(200).json({message: 'success adding task', taskId: task.id});
    } else {
        return res.status(200).json({message: 'Task already exists' });
    }

});

router.put('/tasks/:id', (req, res) => {
    if (!req.body) return res.status(500).send({ message: 'input required' });

    let todoID = req.body.data.todoId;
    let taskID = req.body.data.taskId;
    let markComplete = req.body.data.markComplete;
    let taskTitle = req.body.title;
    let taskDate = req.body.date;
    let taskPriority = req.body.priority;

    let task = todos.at(todoID).tasks.at(taskID);

    if (markComplete) {
        task.completed = true;
    }

    return res.status(200).json({ message: "update completed", markComplete: task.completed});
});


router.delete('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    todos.splice(todoId, 1);

    return res.status(200).json({message: "success deleting todo"});
});

router.delete('/tasks/:todoId/:taskId', (req, res) => {
    let todoId = req.params.todoId;
    let taskId = req.params.taskId;

    let tasks = todos.at(todoId).tasks;

    tasks.splice(taskId, 1);
    
    return res.status(200).json({message: "success deleting task"});
});

export default router;