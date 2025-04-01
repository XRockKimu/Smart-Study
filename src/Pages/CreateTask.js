import React, { useState } from "react";
import { Grid } from "@mui/material";
import CreateTaskForm from "../Components/CreateTaskForm";
import SubTasksAccordian from "../CustomComponents/SubTasksAccordian";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateTask = ({ tasks, setTasks, subjectsList }) => {
  const [subTasks, setSubTasks] = useState([]);
  const [task, setTask] = useState({
    uid: "aab55780-6e20-11ec-9569-0ef4b0d5e5d1",
    completed: false,
    percentComp: 0,
    subject: "",
    subid: "",
    task: "",
    description: "",
    fromdate: new Date().toLocaleDateString(),
    todate: new Date().toLocaleDateString(),
    id: null, // Set to null instead of an empty string
  });

  const addTaskToDb = async () => {
    const taskData = {
      ...task,
      percentComp: subTasks.length
        ? (subTasks.filter((st) => st.completed).length / subTasks.length) * 100
        : 0,
      subTasks,
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), taskData);
      console.log("Task added to Firestore with ID:", docRef.id);
      
      setTasks([...tasks, { id: docRef.id, ...taskData }]);

      // Reset task state
      setTask({
        uid: "aab55780-6e20-11ec-9569-0ef4b0d5e5d1",
        completed: false,
        percentComp: 0,
        subject: "",
        subid: "",
        task: "",
        description: "",
        fromdate: new Date().toLocaleDateString(),
        todate: new Date().toLocaleDateString(),
        id: null, // Ensure new tasks start fresh
      });

      setSubTasks([]);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={10} xs={12}>
          <CreateTaskForm
            subjectsList={subjectsList}
            task={task}
            setTask={setTask}
            addTaskToDb={addTaskToDb}
            DeleteTaskBtn={null}
            manage={!!task.id}
          />
        </Grid>
        <Grid item md={10} xs={12} sx={{ width: "90vw" }}>
          <SubTasksAccordian subTasks={subTasks} setSubTasks={setSubTasks} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTask;
