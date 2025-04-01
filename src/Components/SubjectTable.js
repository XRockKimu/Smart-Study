import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { db } from "../firebase"; // Import Firestore
import { updateDoc, doc } from "firebase/firestore"; // For updating completion

export default function SubjectTable(props) {
  const { data, handleEdit } = props;
  const [subjects, setSubjects] = useState(data); // Local state for sorting/dragging

  // Sync local state with props.data when it changes
  React.useEffect(() => {
    setSubjects(data);
  }, [data]);

  // Handle completion toggle
  const handleToggleComplete = async (subject) => {
    const subjectRef = doc(db, "subjects", subject.id);
    const updatedSubject = { ...subject, completed: !subject.completed };
    await updateDoc(subjectRef, { completed: updatedSubject.completed });
    setSubjects(subjects.map((s) => (s.id === subject.id ? updatedSubject : s)));
  };

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedSubjects = Array.from(subjects);
    const [movedSubject] = reorderedSubjects.splice(result.source.index, 1);
    reorderedSubjects.splice(result.destination.index, 0, movedSubject);
    setSubjects(reorderedSubjects); // Local reorder (Firebase update optional)
  };

  // Sort subjects by date (smart scheduling)
  const sortedSubjects = [...subjects].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB; // Add priority sorting if you include a priority field
  });

  const handleClick = (event, rowData) => {
    const dateIn = new Date().toLocaleDateString();
    handleEdit({
      ...rowData,
      date: dateIn,
    });
  };

  return (
    <Box sx={{ width: "90vw" }}>
      <Paper sx={{ width: "100%", mb: 2, p: 3 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    Done
                  </Typography>
                </TableCell>
                <TableCell padding="2rem">
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    Subject
                  </Typography>
                </TableCell>
                <TableCell padding="2rem">
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    Date Created
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="subjects">
                {(provided) => (
                  <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                    {sortedSubjects.map((row, index) => (
                      <Draggable key={row.id} draggableId={row.id} index={index}>
                        {(provided) => (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row)}
                            tabIndex={-1}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={row.completed || false}
                                onChange={() => handleToggleComplete(row)}
                                onClick={(e) => e.stopPropagation()} // Prevent row click
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="2rem">
                              {row.subject}
                            </TableCell>
                            <TableCell component="th" scope="row" padding="2rem">
                              {row.date}
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}