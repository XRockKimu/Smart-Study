import { Task } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

const ManageTaskCard = (props) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    setTask(props.taskData);
  }, [props.taskData]);

  return (
    task && (
      <Box
        sx={{
          width: "95%",
          height: "auto",
          margin: "0.4rem",
          padding: "0.8rem",
          textAlign: "start",
          backgroundColor: "primary.dark",
          opacity: [0.9, 0.8, 0.7],
          color: "black",
          "&:hover": {
            opacity: [1, 1, 1],
          },
        }}
      >
        <Typography variant="h5">
          <Task sx={{ mr: 1 }} /> Task: {task.task || "Unnamed"}
        </Typography>
        <Typography variant="h6">Subject: {task.subject || "N/A"}</Typography>
        <Typography variant="body2">Progress: {task.percentComp ?? 0}%</Typography>
        <Typography variant="body2">Subtasks: {task.subTasks?.length || 0}</Typography>
      </Box>
    )
  );
};

export default ManageTaskCard;