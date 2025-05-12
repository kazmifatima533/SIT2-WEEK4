const ToDoModel = require("../models/ToDoModel.js");

// Get all ToDo items
module.exports.getToDo = async (req, res) => {
  console.log("thr data from the front end:",req.body)
  try {
    const toDos = await ToDoModel.find();
    res.status(200).send(toDos); 
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send({ error: 'Failed to fetch todos' }); 
  }
};

// Save a new ToDo item
module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;

  console.log("the text from the front end:",text)
  if (!text) {
    return res.status(400).send({ error: 'Text is required for the todo' }); 
  }

  try {
    const newToDo = await ToDoModel.create({ text }); 
    console.log("Added Successfully...");
    console.log(newToDo);
    res.status(201).send(newToDo); 
  } catch (err) {
    console.error("Error saving todo:", err);
    res.status(500).send({ error: 'Failed to save todo' }); 
  }
};

// Update an existing ToDo item
module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;

  if (!_id || !text) {
    return res.status(400).send({ error: 'ID and text are required for update' }); 
  }

  try {
    const updatedToDo = await ToDoModel.findByIdAndUpdate(_id, { text }, { new: true }); 
    if (!updatedToDo) {
      return res.status(404).send({ error: 'ToDo not found' }); 
    }
    res.status(200).send(updatedToDo); 
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).send({ error: 'Failed to update todo' }); 
  }
};

// Delete a ToDo item
module.exports.deleteToDo = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).send({ error: 'ToDo ID is required for deletion' }); 
    }

    const deletedToDo = await ToDoModel.findByIdAndDelete(_id);

    if (!deletedToDo) {
      return res.status(404).send({ error: 'ToDo not found' }); 
    }

    res.status(200).send({ message: 'ToDo deleted successfully', deletedToDo }); 
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).send({ error: 'Failed to delete todo' }); 
  }
};