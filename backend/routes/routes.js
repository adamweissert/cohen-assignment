import express from 'express';

const router = express.Router();

router.get('/todos', (req, res) => {
    return res.status(200).send(todos);
});

router.get('/tasks', (req, res) => {
    return res.status(200).send(todos);
});

router.post('/todos', (req, res) => {
    return res.status(200).send(todos);
});

router.post('/tasks', (req, res) => {
    return res.status(200).send(todos);
});

export default router;