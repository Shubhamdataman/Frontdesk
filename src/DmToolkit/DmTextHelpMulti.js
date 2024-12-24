import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGrid } from "@mui/x-data-grid";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

const DmTextHelpMulti = ({
  rows,
  columns,
  paginationModel,
  pageSizeOptions,
  selectedIds,
  setSelectedIds,
  label,
  columnName, //column on the basis of which you want to search
  displayColumnName,  //for showing the selected rows
}) => {
  // hide/show data grid
  const [showHelp, setShowHelp] = useState(false);

  //textfeild for entering data
  const [selectedItem, setSelectedItem] = useState("");

  //search input
  const [searchText, setSearchText] = useState("");

  //const [rows, setRows] = useState(initialRows);
  const [displayRows, setdisplayRows] = useState(rows);

  //array having selected rows ids
  const [selectedRows, setSelectedRows] = useState([]); // Global selection state (selected rows across searches)

  //for switching focus between 2 textfeilds
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  // ************************************************************************************************//
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=>{if(selectedIds){
    setSelectedRows(selectedIds);
  }},[selectedIds,showHelp])

  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggle = (id) => (event) => {
    if (event.target.checked) {
      // Add the id to the array if checked
      setCheckedItems((prev) => [...prev, id]);
    } else {
      // Remove the id from the array if unchecked
      setCheckedItems((prev) => prev.filter((checkedId) => checkedId !== id));
    }
  };

  const areAllChecked = checkedItems.length === rows.length;

  // Handle master checkbox change to check/uncheck all
  const handleMasterToggle = (event) => {
    if (event.target.checked) {
      // If master checkbox is checked, select all items
      const allIds = rows.map((item) => item.id);
      setCheckedItems(allIds);
    } else {
      // If master checkbox is unchecked, deselect all
      setCheckedItems([]);
    }
  };

  // *********************************************************************************************** //

  // function for handling input value on selectedItem textfield
  const handleSelectedItem = (e, nextInputRef) => {
    if (!selectedItem) {
      setShowHelp(true);
      setSearchText(e.target.value);
      handleSearch(e.target.value);
      nextInputRef?.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Delete" || e.key == "Backspace") {
      setSelectedItem("");
      setSelectedRows([]);
      setCheckedItems([]);
      setSelectedIds([])
    }
  };

  //search
  const handleSearch = (searchquery) => {
    setSearchText(searchquery);
    
    const filteredRows = rows.filter((row) =>
      row[columnName].toLowerCase().includes(searchquery.toLowerCase())
    );
    setdisplayRows(filteredRows);
  };

  const onRowSelection = (newSelectionModel) => {
    const currentVisibleRows = displayRows.map((row) => row.id);

    // Update the master selection list with the new selection changes
    const updatedSelection = [...selectedRows];

    // Add newly selected rows from the current visible rows
    newSelectionModel.forEach((id) => {
      if (!selectedRows.includes(id)) {
        updatedSelection.push(id);
      }
    });

    // Remove unchecked rows from the selection (only in the visible rows)
    currentVisibleRows.forEach((id) => {
      if (!newSelectionModel.includes(id)) {
        const index = updatedSelection.indexOf(id);
        if (index > -1) {
          updatedSelection.splice(index, 1);
        }
      }
    });

    setSelectedRows(updatedSelection);
  };

  const handleClose = () => {
    setSelectedRows([]);
    setCheckedItems([]);
    setShowHelp(false);
  };

  const handleSave = () => {
    setShowHelp(false);
    setSearchText("");
    if (isMobile) {
      setSelectedIds(checkedItems);
      let selItem = checkedItems.map((rowId, v) => {
        const selectedRow = rows.find((row) => row.id === rowId);
        return selectedRow ? selectedRow.firstName : null;
      });
      setSelectedItem(selItem.join(", "));
    } else {
      setSelectedIds(selectedRows);
      let selItem = selectedRows.map((rowId, v) => {
        const selectedRow = rows.find((row) => row.id === rowId);
        return selectedRow ? selectedRow.firstName : null;
      });
      setSelectedItem(selItem.join(", "));
    }
  };

  const loadMoreRows = () => {};

  return (
    <>
      <Box sx={{ minWidth: "100%" }}>
        <Box
          sx={{
            height: 40,
            width: !isMobile ? "18%" : "40%",
          }}
        >
          <TextField
            value={selectedItem}
            placeholder={label}
            size="small"
            onChange={(e) => handleSelectedItem(e, input2Ref)}
            onKeyDown={handleKeyDown}
            autoComplete={"off"}
            inputRef={input1Ref}
            disabled={showHelp}
            sx={{bgcolor: "ghostwhite"}}
          />
          <IconButton
            style={{ fontSize: "2.5em" }}
            onClick={() => setShowHelp(true)}
            sx={{ float: "right", position:'absolute', bgcolor:'ghostwhite', width:'3%', borderRadius:'0', "&:hover": {
                  cursor: "pointer",
                },}}
          >
            <ArrowDropDownIcon />
          </IconButton>
        </Box>
        {showHelp ? (
          <Box
            sx={{
              height: !isMobile ? 400 : 500,
              width: !isMobile ? "50%" : "65%",
              bgcolor: "ghostwhite",
              mt: 2,
            }}
          >
            <TextField
              value={searchText}
              placeholder={"Search..."}
              size="small"
              onChange={(e) => handleSearch(e.target.value)}
              autoComplete={"off"}
              inputRef={input2Ref}
            />
            <IconButton
              sx={{
                color: "primary.main",
                float: "right",
                "&:hover": {
                  color: "green", // Changes color on hover
                  cursor: "pointer",
                },
                p: 0,
              }}
              onClick={() => handleClose()}
            >
              <DisabledByDefaultIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "primary.main",
                float: "right",
                "&:hover": {
                  color: "green", // Changes color on hover
                  cursor: "pointer",
                },
                p: 0,
              }}
              onClick={() => handleSave()}
              disabled={
                !isMobile
                  ? selectedRows.length
                    ? false
                    : true
                  : !checkedItems.length
                  ? true
                  : false
              }
            >
              <CheckBoxIcon />
            </IconButton>
            {!isMobile ? (
              <>
                <DataGrid
                  rows={displayRows}
                  columns={columns}
                  checkboxSelection
                  disableRowSelectionOnClick
                  disableColumnMenu
                  disableColumnResize
                  sx={{
                    "& .MuiDataGrid-row:hover": {
                      cursor: "pointer",
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  // paginationModel={paginationModel}
                  // pageSizeOptions={pageSizeOptions}
                  onRowSelectionModelChange={(row) => onRowSelection(row)}
                  rowSelectionModel={selectedRows.filter((id) =>
                    rows.some((row) => row.id === id)
                  )} // Ensure only visible selected rows are shown as checked}
                  columnVisibilityModel={{
                    id: false,
                  }}
                  hideFooterPagination
                  paginationMode="server"
                  onRowsScrollEnd={() => {
                    loadMoreRows();
                  }}
                  rowCount={-1}
                  scrollEndThreshold={100}
                />
                {selectedRows.length ? (
                  <Box sx={{ bgcolor: "ghostwhite", height: 60 }}>
                    <Box sx={{ height: 35, alignItems: "center" }}>
                      Selected Item:
                      <IconButton
                        sx={{
                          color: "primary.main",
                          float: "right",
                          "&:hover": {
                            color: "green", // Changes color on hover
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => setSelectedRows([])}
                      >
                        <DisabledByDefaultIcon />
                      </IconButton>
                    </Box>

                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {selectedRows.map((rowId, v) => {
                        const selectedRow = rows.find(
                          (row) => row.id === rowId
                        );
                        return selectedRow ? (
                          <>
                            {v !== 0 ? ", " : " "}
                            {selectedRow[displayColumnName]}
                          </>
                        ) : null;
                      })}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <List
                  sx={{ overflow: "auto", maxHeight: "400px", width: "auto" }}
                >
                  <ListItem>
                    <ListItemIcon>
                      <Checkbox
                        checked={areAllChecked} // Check if all items are selected
                        indeterminate={
                          checkedItems.length > 0 &&
                          checkedItems.length < rows.length
                        } // Show indeterminate state when not all are checked
                        onChange={handleMasterToggle} // Handle master checkbox toggle
                      />
                    </ListItemIcon>
                    <ListItemText></ListItemText>
                  </ListItem>
                  {displayRows.map((v, i) => {
                    return (
                      <>
                        <ListItem key={v?.id}>
                          <ListItemIcon>
                            <Checkbox
                              checked={checkedItems.includes(v.id)}
                              onChange={handleToggle(v?.id)}
                            />{" "}
                          </ListItemIcon>
                          <ListItemText>
                            {" "}
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "ui-sans-serif",
                                fontSize: "0.700rem",
                                fontWeight: "300",
                              }}
                            >
                              {" "}
                              {"First Name: " + v?.firstName}
                              <br />
                              {"Last Name: " + v?.lastName}
                              <br />
                              {"Age: " + v?.age}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                        <Divider />
                      </>
                    );
                  })}
                </List>
                {checkedItems.length ? (
                  <Box
                    sx={{
                      bgcolor: "ghostwhite",
                      // height: 60,
                      pt: 1,
                      borderBlock: "2.5em",
                      borderBlockColor: "blueviolet",
                    }}
                  >
                    <Box sx={{ height: 35, alignItems: "center" }}>
                      Selected Item:
                      <IconButton
                        sx={{
                          color: "primary.main",
                          float: "right",
                          "&:hover": {
                            color: "green", // Changes color on hover
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => setCheckedItems([])}
                      >
                        <DisabledByDefaultIcon />
                      </IconButton>
                    </Box>

                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {checkedItems.map((rowId, v) => {
                        const selectedRow = rows.find(
                          (row) => row.id === rowId
                        );
                        return selectedRow ? (
                          <>
                            {v !== 0 ? ", " : " "}
                            {selectedRow[displayColumnName]}
                          </>
                        ) : null;
                      })}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
              </>
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default DmTextHelpMulti;
