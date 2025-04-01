import Card from "../CustomComponents/TaskCard";
import { Grid, Box } from "@mui/material";
import CardPanTask from "../Components/SideDrawerTask";
import { useState, useEffect } from "react";

const AllTasks = ({ tasks }) => {
  const [opener, setOpener] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    console.log("Tasks in AllTasks:", tasks); // Debug tasks prop
  }, [tasks]);

  const openDrawer = (data) => {
    console.log("Opening drawer with task:", data); // Debug selected task
    setSelectedTask(data);
    setOpener(true);
  };

  const closeDrawer = () => {
    setOpener(false);
  };

  return (
    <div>
      <Box
        sx={{
          width: opener ? "90%" : 0,
          position: "fixed",
          zIndex: 10005,
          top: 0,
          right: 0,
          backgroundColor: "RGB(13, 30, 45)",
          color: "BB86FC",
          opacity: 0.99,
          overflowX: "auto",
          transition: "0.5s",
          paddingTop: "60px",
        }}
      >
        <CardPanTask closePanel={closeDrawer} taskData={selectedTask} />
      </Box>

      <Grid container spacing={2}>
        {tasks && tasks.length > 0 ? (
          tasks.map((selectedRow) => (
            <Grid item md={4} sm={8} xs={12} key={selectedRow.id}>
              <Card taskData={selectedRow} onClick={() => openDrawer(selectedRow)} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p style={{ textAlign: "center", color: "gray" }}>No tasks available</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default AllTasks;