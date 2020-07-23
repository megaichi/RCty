import React, { useState } from "react";
import {nanoid} from "nanoid";

import Form from "./components/Form";
import FileButton　from "./components/FilterButton";
import Todo from "./components/Todo";



function addTask(name) {
  const newTask = {id: "todo" + nanoid(), name: name, complated: false };
  setTasks([...tasks, newTask]);
}

const [tasks, setTasks] = useState(props.tasks);

function App(prpps){
  const taskList = tasks.map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    )
  );

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FileButton />
        <FileButton />
        <FileButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
       >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
