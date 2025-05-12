import axios from "axios";

const baseUrl = "http://localhost:8080/api";

const getAllToDo = (setToDo) => {
  axios
    .get(baseUrl)
    .then(({ data }) => {
      setToDo(data); 
    })
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(`${baseUrl}/save`, { text })
    .then(({ data }) => {
      setText("");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err))
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    axios
    .put(`${baseUrl}/update`, { _id: toDoId, text })
    .then(({ data }) => {
      setIsUpdating(false);
      setText("");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err))
};

const deleteToDo = (_id, setToDo) => {
  axios
    .delete(`${baseUrl}/delete`, { data: { _id } })
    .then((response) => {
      console.log("Delete API call successful");
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error('Error deleting todo:', error);
    });
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
