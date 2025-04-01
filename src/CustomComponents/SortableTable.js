import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

export default function SortableTable(props) {
  const [pageSize, setPageSize] = React.useState(5);

  const columnsWithActions = [
    ...props.columns,
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => {
              console.log("Delete clicked for ID:", params.row.id);
              props.onDelete(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={columnsWithActions}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row[props.idName]}
        pagination
      />
    </div>
  );
}