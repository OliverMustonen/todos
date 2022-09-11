const router = require('express').Router();
const todoModel = require('../models/todoModel');

router.get('/', todoModel.getTodos);
router.get('/:id', todoModel.getOneTodo);

router.post('/new', todoModel.saveTodo);

router.delete('/:id', todoModel.deleteTodo);

router.patch('/:id', todoModel.updateTodo);

module.exports = router;