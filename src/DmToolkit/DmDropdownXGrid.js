import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGrid } from "@mui/x-data-grid";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const DmDropdownXGrid = ({
  inputValue,
  setInputValue,
  placeholder,
  required,
  columns,
  rows,
  fieldName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchedRows, setSearchedRows] = useState([]);
  useEffect(() => {
    if (rows && inputValue) {
      let arr = rows.filter((v, i) => {
        if (v[fieldName].toLowerCase().includes(inputValue.toLowerCase())) {
          return v;
        }
      });
      setSearchedRows(arr);
      if (inputValue == "") {
        setIsOpen(false);
      }
    }
  }, [inputValue, rows]);

  const handleSearch = (e) => {
    setIsOpen(true);
    setInputValue(e.target.value);
    if (inputValue !== undefined) {
      let arr = rows.filter((v, i) => {
        if (v[fieldName].toLowerCase().includes(inputValue.toLowerCase())) {
          return v;
        }
      });
      setSearchedRows(arr);
    }
  };
  const isRowSelectable = (params) => {
    setInputValue(params.row[fieldName]);
    setIsOpen(false);
    return rows.find((row) => row.id === params.id).selectable;
  };

  return (
    <div className="dm-textfield-dropdown">
      <TextField
        margin="normal"
        label={placeholder}
        required={required}
        value={inputValue}
        onChange={handleSearch}
        sx={{}}
        size="small"
        // onClick={()=>setIsOpen(true)}
      />
      <div className="dm-textfield-dropdown-arrow">
        {!isOpen ? (
          <ArrowDropDownIcon
            sx={{ height: "30px", width: "30px" }}
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <ArrowDropUpIcon
            sx={{ height: "30px", width: "30px" }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
      {isOpen ? (
        <div>
          <DataGrid
            columns={columns}
            rows={!inputValue ? rows : searchedRows}
            isRowSelectable={isRowSelectable}
            sx={{
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                backgroundColor: "rgb(73 210 200 / 67%)",
              },
              "& .MuiDataGrid-row": {
                cursor: "pointer", // Pointer cursor for all rows
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "rgba(0, 128, 0, 0.1)", // Example hover color
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "rgba(0, 128, 0, 0.3)", // Example selected row color
              },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DmDropdownXGrid;
