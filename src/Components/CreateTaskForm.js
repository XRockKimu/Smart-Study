import React from "react";
import { Box, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function NewTaskForm({
  subjectsList,
  task,
  setTask,
  addTaskToDb,
  DeleteTaskBtn,
  manage,
}) {
  const onInputChange = (e) => {
    const { id, value } = e.target;
    setTask({ ...task, [id]: value });
  };

  const onSelectChange = (e) => {
    const dataSelected = e.target.value;
    const { id, subject } = dataSelected;
    setTask({ ...task, subid: id, subject: subject });
  };

  return (
    <Box textAlign="left" p={6}>
      <Grid container justifyContent="space-between" spacing={3.5}>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              labelId="subject-label"
              id="subject"
              label="Subject"
              value={subjectsList.find(
                (item) => item.id === task.subid && item.subject === task.subject
              ) || ""}
              onChange={onSelectChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {subjectsList.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item.subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            id="task"
            label="Task"
            value={task.task}
            onChange={onInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="description"
            fullWidth
            label="Description"
            value={task.description}
            onChange={onInputChange}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button variant="contained" size="large" onClick={addTaskToDb}>
            {manage ? "Update" : "Add"}
          </Button>
        </Grid>
        {manage && DeleteTaskBtn && (
          <Grid item xs={12}>
            <Button variant="contained" size="large" onClick={DeleteTaskBtn}>
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}