import React from "react";
import { DataGrid } from "@mui/x-data-grid";
const DmDataTable = ({
  rows,
  columns,
  paginationModel,
  pageSizeOptions,
  checkboxSelection,
  onRowSelectionModelChange,
  rowSelectionModel,
  disableRowSelectionOnClick,
  sx,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection={true}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      onRowSelectionModelChange={onRowSelectionModelChange}
      sx={sx}
      rowSelectionModel={rowSelectionModel}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      disableColumnMenu
      disableColumnResize
    />
  );
};

export default DmDataTable;
