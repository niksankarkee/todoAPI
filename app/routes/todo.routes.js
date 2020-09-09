module.exports = app => {
    const todos = require('../controllers/todo.controller.js');

    // Create a new todo
    app.post('/todos', todos.create);

    // Retrive all todos
    app.get('/todos', todos.findAll);

    // Retrive a Single todos
    app.get('/todos/:id', todos.findOne);

    // Update a todo with id
    app.put('/todos/:id', todos.update);

    // Delete a todo by id
    app.delete('/todos/:id', todos.delete);
}