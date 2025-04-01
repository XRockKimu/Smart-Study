import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import SortableTable from "../CustomComponents/SortableTable";

const NewSubject = ({ subjects, setSubjects }) => {
  const [subjectInput, setSubjectInput] = useState("");

  const handleAddSubject = async () => {
    if (!subjectInput.trim()) return;

    try {
      const newSubject = {
        subject: subjectInput,
        date: new Date().toLocaleDateString(),
        completed: false,
      };
      const docRef = await addDoc(collection(db, "subjects"), newSubject);
      setSubjects([...subjects, { id: docRef.id, ...newSubject }]);
      setSubjectInput("");
      console.log("Subject added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding subject:", error);
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
        <SortableTable data={subjects || []} />
      </Box>
    </div>
  );
};

export default NewSubject;