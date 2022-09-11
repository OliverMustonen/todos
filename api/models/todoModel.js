const mongodb = require('mongoose');
const Todo = require('./todoSchema');

exports.getTodos = ( req, res ) => {
    Todo.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
}

exports.getOneTodo = (req, res) => {
    Todo.findOne({ _id: req.params.id })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}

exports.saveTodo = (req, res) => {
    
    const todo = new Todo({ 
        title: req.body.title
    })

    todo.save()
    .then(() => {
        res.status(201).json({
            statusCode: 201,
            status: true,
            message: 'Todo created',
            data
        })
    })
    .catch((err => {
        res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Failed to create todo',
            err
        })
    }))

}

exports.deleteTodo = ( req, res) => {
    Todo.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: 'Todo was deleted'
        })
    })
    .catch(() => {
        res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Failed to delete todo'
    })
    })
}

exports.updateTodo = (req, res) => {
    Todo.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: 'Todo was updated successfully'
    })
    })
    .catch(() => {
        res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Failed to update todo'
    })
    })
}
