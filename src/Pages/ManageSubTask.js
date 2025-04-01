import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SubTasksAccordian from "../CustomComponents/SubTasksAccordian";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";


const ManageSubTask = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [subTasks, setSubTasks] = useState([]);

  // Hypothetical: Select a task from tasks prop or via URL param
  useEffect(() => {
    if (tasks.length > 0) {
      setSelectedTask(tasks[0]); // Example: Select first task
      setSubTasks(tasks[0].subTasks || []);
    }
  }, [tasks]);

  const handleUpdateSubtasks = async () => {
    if (!selectedTask) return;
    const taskRef = doc(db, "tasks", selectedTask.id);
    const updatedTask = { ...selectedTask, subTasks };
    try {
      await updateDoc(taskRef, updatedTask);
      console.log("Subtasks updated in Firestore");
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating subtasks:", error);
    }
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        {selectedTask ? (
          <>
            <Grid item xs={12}>
              <h2>Manage Subtasks for: {selectedTask.task}</h2>
              <SubTasksAccordian subTasks={subTasks} setSubTasks={setSubTasks} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleUpdateSubtasks}>
                Update Subtasks
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <p>No task selected</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ManageSubTask;