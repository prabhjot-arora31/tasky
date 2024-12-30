import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [isEditClicked, setIsEditClicked] = useState({ isTrue: false, id: "" });
  const [editState, setEditState] = useState({
    title: "",
    desc: "",
    idOfTask: "",
    time: "",
  });
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const editTask = (id1) => {
    setIsEditClicked({ isTrue: true, id: id1 });
  };
  const actualEdit = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToBeEdited = allTasks.filter((task) => task.idOfTask === id);
    taskToBeEdited[0].title = editState.title;
    taskToBeEdited[0].desc = editState.desc;
    taskToBeEdited[0].time = editState.time;
    console.log("tas to be edited:", taskToBeEdited[0]);
    // const rTask = tasks.filter((task) => task.idOfTask === id);
    const finalArray = tasks.map((ele) =>
      ele.idOfTask === id
        ? {
            ...ele,
            title: editState.title,
            desc: editState.desc,
            time: editState.time,
          }
        : ele
    );
    setTasks(finalArray);
    localStorage.setItem("tasks", JSON.stringify(finalArray));

    setIsEditClicked({ isTrue: false });
  };
  const [task, setTask] = useState({
    title: "",
    desc: "",
    time: "",
    idOfTask: "",
    r:'',
    g:'',
    b:''
  });
  const addTask = () => {
    const r1 = Math.floor(Math.random() * 255+1);
    const g1 = Math.floor(Math.random() * 255+1)
    const b1 = Math.floor(Math.random() * 255+1)
    setTask((prev) => { return {...prev,r:r1, g:g1, b:b1}})
    setTasks((prev) => [...prev, task]);
    const storageTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storageTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(storageTasks));
    console.log("task is:", task);
    setTask({ title: "", desc: "", time: "", idOfTask: "" });
  };
  const deleteTask = (id) => {
    console.log("id is:", id);
    const totalTasks = tasks.filter((task1) => {
      return task1.idOfTask !== id;
    });
    console.log("total tasks:", totalTasks);
    localStorage.setItem("tasks", JSON.stringify(totalTasks));
    setTasks(totalTasks);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Tasky</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "6.3px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          style={{ padding: "0.24rem", width: "300px" }}
          placeholder="Enter title"
          value={task.title}
          onChange={(e) => {
            var id = "id" + Math.random().toString(16).slice(2);
            setTask({
              title: e.target.value,
              desc: task.desc,
              time: task.time,
              idOfTask: id,
            });
          }}
        />
        <textarea
          placeholder="Enter description"
          style={{ padding: "0.24rem", width: "300px" }}
          value={task.desc}
          onChange={(e) => {
            var id = "id" + Math.random().toString(16).slice(2);

            setTask({
              idOfTask: id,
              desc: e.target.value,
              title: task.title,
              time: task.time,
            });
          }}
        ></textarea>
        <input
          type="number"
          style={{ padding: "0.24rem", width: "300px" }}
          placeholder="Enter time (in minutes)"
          value={task.time}
          onChange={(e) => {
            var id = "id" + Math.random().toString(16).slice(2);

            setTask({
              idOfTask: id,
              time: e.target.value,
              title: task.title,
              desc: task.desc,
            });
          }}
        />
        <button
          onClick={addTask}
          style={{
            backgroundColor: "lightblue",
            color: "black",
            border: "none",
            padding: "0.4rem",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {tasks?.length === 0 ? (
          <p style={{ textAlign: "center" }}>No Task</p>
        ) : (
          <div>
            {tasks?.map((task1, id) => {
              return (
                <div style={{
                  backgroundColor:'rgba('+task1.r+','+task1.g+','+task1.b+','+'0.4)'
                }}>
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      
                      maxWidth: "500px",
                      padding: "0.4rem",
                      borderRadius: "10px",
                      margin: "14px auto",
                      marginTop: "10px",
                      marginBottom: 0,
                    }}
                  >
                    {task1.title}
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button style={{ padding: "0.34rem" }}>View</button>
                      <button
                        style={{ padding: "0.34rem" }}
                        onClick={() => editTask(task1.idOfTask)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ backgroundColor: "red", border: "none" }}
                        onClick={() => deleteTask(task1.idOfTask)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {isEditClicked.isTrue &&
                    isEditClicked.id === task1.idOfTask && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: "6px",
                          
                          margin: "0 auto",
                          maxWidth: "510px",
                          paddingTop: "10px",
                          borderRadius: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <input
                          type="text"
                          placeholder={task1.title}
                          value={editState.title}
                          onChange={(e) => {
                            setEditState((prev) => {
                              return { ...prev, title: e.target.value };
                            });
                          }}
                        />
                        <textarea
                          value={editState.desc}
                          placeholder={task1.desc}
                          onChange={(e) => {
                            setEditState((prev) => {
                              return { ...prev, desc: e.target.value };
                            });
                          }}
                        ></textarea>
                        <input
                          type="number"
                          value={editState.time}
                          placeholder={task1.time}
                          onChange={(e) => {
                            setEditState((prev) => {
                              return { ...prev, time: e.target.value };
                            });
                          }}
                        />
                        <button onClick={() => actualEdit(task1.idOfTask)}>
                          Edit
                        </button>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
