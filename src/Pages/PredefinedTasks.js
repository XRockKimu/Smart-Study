import Table from "../CustomComponents/CRUD-pr-table";
import { Box } from "@mui/material";

const PredefinedTask = () => {
  return (
    <Box sx={{ display: "table", tableLayout: "fixed", width: "100%" }}>
      <Table />
    </Box>
  );
};

export default PredefinedTask;
