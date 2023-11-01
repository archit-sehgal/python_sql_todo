import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function App() {
  const [todo, setTodo] = useState("");
  const [output, setOutput] = useState([]);
  useEffect(() => {
    const savedData = localStorage.getItem("todoData");
    if (savedData) {
      setOutput(JSON.parse(savedData));
    }
  }, []);

  const senddata = () => {
    axios.post("http://127.0.0.1:8080/todo", { todo }).then((response) => {
      setOutput(response.data);
      localStorage.setItem("todoData", JSON.stringify(response.data));
    });
  };
  const deletetodos = () => {
    axios.post("http://127.0.0.1:8080/delete").then((response) => {
      setOutput(response.data);
      localStorage.setItem("todoData", JSON.stringify(response.data));
    });
  };
  const deleteSingleTodo = (todoId) => {
    axios.delete(`http://127.0.0.1:8080/delete/todo/${todoId}`).then((response) => {
      setOutput(response.data);
      localStorage.setItem("todoData", JSON.stringify(response.data));
    });
  };
  

  return (
    <div className="main flex">
      <label>Enter To-do task:</label>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <Button variant="contained" onClick={senddata}>
        Create ToDo
      </Button>
      <Button variant="contained" onClick={deletetodos}>
        Delet Todos
      </Button>
      <div className="output">
        {Array.isArray(output) &&
          output.map((t, index) => (
            <div className="mainout flex" key={index}>
              <Alert
                className="output"
                severity="info"
                style={{ margin: "10px" }}
              >
                ID: {t.id}, Task: {t.task}
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteSingleTodo(t.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Alert>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
