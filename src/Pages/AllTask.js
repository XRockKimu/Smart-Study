import Card from "../CustomComponents/TaskCard";
import { Grid, Box } from "@mui/material";
import CardPanTask from "../Components/SideDrawerTask";
import { useState, useEffect } from "react";

const AllTasks = () => {
  const [opener, setOpener] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [allData, setAllData] = useState([]); // ✅ FIXED: Use an empty array to prevent errors

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL_GET}/alltask`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const dataX = await response.json();
        setAllData(dataX);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    fetchTasks();
  }, []);

  const openDrawer = (data) => {
    setSelectedTask(data);
    setOpener(true);
  };

  const closeDrawer = () => {
    setOpener(false);
  };

  return (
    <div>
      {/* Side Panel for Task Details */}
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

      {/* Task List Grid */}
      <Grid container spacing={2}>
        {allData.length > 0 ? (
          allData.map((selectedRow) => (
            <Grid item md={4} sm={8} xs={12} key={selectedRow.id || Math.random()}>
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
