import {useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function App() {
  const [todo, setTodo] = useState("");
  const [output, setOutput] = useState({ tasklist: [] });
  useEffect(() => {
    const savedData = localStorage.getItem("todoData");
    if (savedData) {
      setOutput(JSON.parse(savedData));
    }
  }, []);
  const senddata = () => {
    axios.post("http://127.0.0.1:8080/todo", { todo }).then((response) => {
      console.log("Response Data: ", response.data);
      setOutput(response.data);
      localStorage.setItem("todoData", JSON.stringify(response.data));
    });
  };
  const deletetodos=()=>{
    localStorage.removeItem("todoData")
    setOutput({tasklist:[]})
  }

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
      <Button variant="contained" onClick={deletetodos}>Delet Todos</Button>
      <div className="output">
        {Array.isArray(output) &&
          output.map((t, index) => <div key={index}>{t}</div>)}
      </div>
    </div>
  );
}

export default App;
