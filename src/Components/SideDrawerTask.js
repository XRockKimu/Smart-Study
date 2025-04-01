import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import SortableTable from "../CustomComponents/SortableTable";
import "../CSS/taskDets.css";

const DrawerTask = (props) => {
  const [subTasks, setSubTasks] = useState([]);

  const closeSidePanel = props.closePanel;

  // Use subtasks from props.taskData instead of fetching
  React.useEffect(() => {
    if (props.taskData && props.taskData.subTasks) {
      setSubTasks(props.taskData.subTasks);
    } else {
      setSubTasks([]);
    }
  }, [props.taskData]);

  const closePanel = () => {
    closeSidePanel();
    console.log("Panel closed");
  };

  const columns = [
    { field: "subtaskid", hide: true },
    { field: "subtask", headerName: "SubTask", minWidth: 150, flex: 1, editable: true },
    { field: "desc", headerName: "Description", minWidth: 150, flex: 1, editable: true },
    // Remove 'link' if not used, or adjust to match subtask structure
    { field: "link", headerName: "URL", minWidth: 150, flex: 1, editable: true },
    {
      field: "completed",
      headerName: "Completed",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (params.value ? "Yes" : "No"), // Adjust for boolean
    },
  ];

  return (
    <div>
      <Box sx={{ padding: "1rem", height: "90vh" }}>
        <Button
          sx={{
            position: "absolute",
            top: 0,
            right: "25px",
            fontSize: "30px",
            backgroundColor: "yellow",
          }}
          onClick={closePanel}
        >
          <CancelPresentationIcon fontSize="large" />
        </Button>
        {props.taskData && (
          <table>
            <tr>
              <th>Subject:</th>
              <td>{props.taskData.subject || "N/A"}</td>
            </tr>
            <tr>
              <th>Task:</th>
              <td>{props.taskData.task || "Unnamed"}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{props.taskData.description || "No description"}</td>
            </tr>
            <tr>
              <th>Start Date:</th>
              <td>{props.taskData.fromdate || "N/A"}</td>
            </tr>
            <tr>
              <th>End Date:</th>
              <td>{props.taskData.todate || "N/A"}</td> {/* Match CreateTask.js */}
            </tr>
          </table>
        )}
        <div style={{ marginTop: "3rem" }}>
          <SortableTable rows={subTasks} columns={columns} idName="subtaskid" />
        </div>
      </Box>
    </div>
  );
};

export default DrawerTask;