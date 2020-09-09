const Todo = require("../models/todo.model.js");

// Create and Save a todo
exports.create = (req, res, next) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: 'Todo description can not be empty'
        });
    }

    // Create a Todo
    const toto = new Todo({
        name: req.body.name || 'Unitiled Todo',
        description: req.body.description
    });

    // Save todo in the database
    toto.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Todo."
            });
        });
};

exports.findAll = (req, res, next) => {
    Todo.find()
        .then(todos => {
            res.send(todos);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving todos."
            });
        });
};

// Find a single todo with a id
exports.findOne = (req, res, next) => {
    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.id
                });
            }
            res.send(todo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Todo not found with id ' + req.params.id
                });
            }
            return res.status(5000).send({
                message: 'Error retrieving todo with id ' + req.params.id
            });
        })
}

// Update a todo identified by the id in the request
exports.update = (req, res, next) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: 'Todo description can not be empty'
        });
    }

    // Find todo and update it with the request body
    Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.name || 'Untitled Todo',
        description: req.body.description
    }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo not found with id ' + req.params.id
                });
            }
            res.send(todo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Todo not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Error updating todo with id ' + req.params.id
            })
        });
}

// Delete a todo with the specified id in the request
exports.delete = (req, res, next) => {
    Todo.findByIdAndRemove(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.id
                });
            }
            res.send({ message: 'Todo deleted successfully!' });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name == 'notFound') {
                return res.status(404).send({
                    message: "Todo not found with id " + req.params.todo
                });
            }
            return res.status(500).send({
                message: "Could not delete todo with id " + req.params.id
            });
        })
}