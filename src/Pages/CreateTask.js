import React, { useState } from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
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
    id: null,
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
        id: null,
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
        <Grid item md={10} xs={12} sx={{ width: "90vw", mt: 4 }}>
          <h3>Created Tasks</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="created tasks table">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>From Date</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell>Progress (%)</TableCell>
                  <TableCell>Subtasks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {tasks && tasks.length > 0 ? (
    tasks.map((t) => (
      <TableRow key={t.id}>
        <TableCell>{t.task || "Unnamed"}</TableCell>
        <TableCell>{t.subject || "N/A"}</TableCell>
        <TableCell>{t.description || "No description"}</TableCell>
        <TableCell>{t.fromdate || "N/A"}</TableCell>
        <TableCell>{t.todate || "N/A"}</TableCell>
        <TableCell>{t.percentComp ?? 0}</TableCell>
        <TableCell>{t.subTasks?.length || 0}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7}>No tasks available</TableCell>
    </TableRow>
  )}
</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTask;