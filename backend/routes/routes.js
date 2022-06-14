import express from 'express';

const router = express.Router();

let todos = [
    { id: 1, name: 'Cohen Interview Assignment' },
    { id: 2, name: 'Make Dinner' },
    { id: 4, name: 'Play with my Cat' },
    { id: 5, name: 'Read a book' },

];

router.get('/todos', (req, res) => {
    return res.status(200).send(todos);
});

router.get('/tasks', (req, res) => {
    return res.status(200).send(todos);
});

export default router;