import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Knob } from "primereact/knob";
import { useEffect, useState } from "react";

export default function TaskCard(props) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    setTask(props.taskData);
    console.log("TaskCard taskData:", props.taskData);
  }, [props.taskData]);

  return (
    task && (
      <Card sx={{ width: "100%" }} onClick={props.onClick}> {/* Added onClick */}
        <CardHeader
          title={<Typography color="secondary">{task.subject || "N/A"}</Typography>}
          subheader={<Typography color="secondary">{task.todate || "N/A"}</Typography>}
        />
        <CardContent>
          <div>
            <Knob
              value={task.percentComp ?? 0}
              readOnly
              valueColor={"rgb(3, 218, 200)"}
            />
          </div>
          <Typography color="secondary" variant="h6">
            {task.task || "Unnamed"}
          </Typography>
          <Typography variant="body2" color="secondary">
            {task.description || "No description"}
          </Typography>
        </CardContent>
      </Card>
    )
  );
}