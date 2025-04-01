import Table from "../CustomComponents/CRUD-pr-table"; // Assuming this is DataTableCrudDemo.js
import { Box } from "@mui/material";
import { useState } from "react";

const PredefinedTask = () => {
  const [subTasks, setSubTasks] = useState([
    { subtaskid: "1", subtask: "Sample Subtask", desc: "Do this", link: "", completed: false },
    { subtaskid: "2", subtask: "Another Subtask", desc: "Do that", link: "", completed: true },
  ]);

  return (
    <Box sx={{ display: "table", tableLayout: "fixed", width: "100%" }}>
      <Table subTasks={subTasks} setSubTasks={setSubTasks} />
    </Box>
  );
};

export default PredefinedTask;