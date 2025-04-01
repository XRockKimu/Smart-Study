import "./App.css";
import { darkTheme, lightTheme } from "./Theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

import Navbar from "./CustomComponents/NavBar";
import ArchivedTask from "./Pages/ArchivedTasks";
import PredefinedTask from "./Pages/PredefinedTasks";
import CreateNewTask from "./Pages/CreateTask";
import CalenderView from "./Components/CalenderView";
import { Box } from "@mui/system";
import ManageTask from "./Pages/ManageTask";
import AllTask from "./Pages/AllTask";
import Dashboard from "./Pages/Dashboard";
import NewSubject from "./Components/CreateNewSubject";
import ErrorPage from "./Pages/404";
import ManageSubTask from "./Pages/ManageSubTask";

const useStyles = makeStyles({
  root: {
    display: "flex",
    paddingRight: "0px",
  },
});

function App() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const unsubscribeTasks = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
        console.log("Tasks updated:", taskList);
      },
      (error) => console.error("Tasks error:", error)
    );

    const unsubscribeSubjects = onSnapshot(
      collection(db, "subjects"),
      (snapshot) => {
        const subjectList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubjects(subjectList);
        console.log("Subjects updated:", subjectList);
      },
      (error) => console.error("Subjects error:", error)
    );

    return () => {
      unsubscribeTasks();
      unsubscribeSubjects();
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Router>
          <div className={classes.root}>
            <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Switch>
                <Route path="/dashboard">
                  <Dashboard tasks={tasks} />
                </Route>
                <Route path="/archived">
                  <ArchivedTask tasks={tasks} />
                </Route>
                <Route path="/newsub">
                  <NewSubject subjects={subjects} setSubjects={setSubjects} />
                </Route>
                <Route path="/predefined">
                  <PredefinedTask />
                </Route>
                <Route path="/createnewtask">
                  <CreateNewTask setTasks={setTasks} tasks={tasks} subjectsList={subjects} />
                </Route>
                <Route path="/managetask">
                  <ManageTask tasks={tasks} />
                </Route>
                <Route path="/alltask">
                  <AllTask tasks={tasks} />
                </Route>
                <Route path="/calender">
                  <div style={{ width: "80%" }}>
                    <CalenderView tasks={tasks} />
                  </div>
                </Route>
                <Route path="/managesubtask">
                  <div style={{ width: "80%" }}>
                    <ManageSubTask tasks={tasks} />
                  </div>
                </Route>
                <Route path="*">
                  <ErrorPage />
                </Route>
              </Switch>
            </Box>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;