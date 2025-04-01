import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import SortableTable from "../CustomComponents/SortableTable";

const NewSubject = ({ subjects, setSubjects }) => {
  const [subjectInput, setSubjectInput] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    { field: "subject", headerName: "Subject", width: 200 },
    { field: "date", headerName: "Date Created", width: 150 },
    {
      field: "completed",
      headerName: "Completed",
      type: "boolean",
      width: 100,
      editable: true, // Make it editable
    },
  ];

  const handleAddSubject = async () => {
    if (!subjectInput.trim()) return;

    const newSubject = {
      subject: subjectInput,
      date: new Date().toLocaleDateString(),
      completed: false,
    };

    try {
      const docRef = await addDoc(collection(db, "subjects"), newSubject);
      console.log("Subject added with ID:", docRef.id);
      setSubjects([...subjects, { id: docRef.id, ...newSubject }]);
      setSubjectInput("");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "subjects", id));
      setSubjects(subjects.filter((subject) => subject.id !== id));
      console.log("Subject deleted with ID:", id);
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handleRowUpdate = async (newRow) => {
    try {
      const subjectRef = doc(db, "subjects", newRow.id);
      await updateDoc(subjectRef, { completed: newRow.completed });
      setSubjects(subjects.map((s) => (s.id === newRow.id ? newRow : s)));
      console.log("Subject updated with ID:", newRow.id);
      return newRow;
    } catch (error) {
      console.error("Error updating subject:", error);
      throw error; // Revert on error
    }
  };

  const handleInputChange = (event) => {
    setSubjectInput(event.target.value);
  };

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <TextField
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          value={subjectInput}
          onChange={handleInputChange}
        />
        <Button variant="outlined" onClick={handleAddSubject} sx={{ ml: 2 }}>
          Add Subject
        </Button>
      </Box>
      <Box sx={{ p: 2 }}>
        <SortableTable
          rows={subjects || []}
          columns={columns}
          idName="id"
          onDelete={handleDelete}
          processRowUpdate={handleRowUpdate}
          experimentalFeatures={{ newEditingApi: true }} // Enable editing
        />
      </Box>
    </div>
  );
};

export default NewSubject;