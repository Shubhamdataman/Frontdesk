import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const DmTopControl = ({
  formName,
  controls, 
  newClicked,
  setNewClicked,
  editClicked,
  setEditClicked,
  deleteClicked,
  setDeleteClicked,
  cardClicked,
  setCardClicked,
  findClicked,
  setFindClicked,
  printClicked,
  setPrintClicked,
  saveClicked,
  setSaveClicked,
  refreshClicked,
  setRefreshClicked,
  otherClicked,
  setOtherClicked,
  closeClicked,
  setCloseClicked,
  setFirstNavigateClicked,
  setPreviousNavigateClicked,
  setNextNavigateClicked,
  setLastNavigateClicked,
  isPreviousDisable,
  isNextDisable,
  currentIndex,
  setCurrentIndex,
  items,
  setIsDisable,
  bgColor
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [newOptions, setNewOptions] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = [
    { id: 1, name: "Add", icon: <AddIcon /> },
    { id: 2, name: "Edit", icon: <EditNoteIcon /> },
    { id: 3, name: "Delete", icon: <DeleteIcon /> },
    { id: 4, name: "Print", icon: <PrintIcon /> },
    { id: 5, name: "Card", icon: !toggle ? <ToggleOffIcon /> : <ToggleOnIcon /> },
    { id: 6, name: "Search", icon: <SearchIcon /> },
    { id: 7, name: "Other", icon: <ShareIcon /> },
    { id: 8, name: "Refresh", icon: <RefreshIcon /> },
  ];

  useEffect(() => {
    if (controls) {
      let arr = options.filter((item1) => controls.some((item2) => item2?.id === item1?.id));
      setNewOptions(arr);
    }
  }, [controls]);

  const keyMap = {
    Add: "F2",
    Edit: "Ctrl + E",
    Delete: "Ctrl + D",
    Card: "Ctrl + T",
    Find: "Ctrl + F",
    Other: "Ctrl + O",
    Close: "Escape",
    Save: "Ctrl + S",
    Print: "Ctrl + P",
    Refresh: "Escape",
  };

  const handleItem = (v, i) => {
    if (v?.id === "Add") 
      {
        setNewClicked(true);
      }
    if (v?.name === "Edit") setEditClicked(true);
    if (v?.name === "Delete") setDeleteClicked(true);
    if (v?.name === "Print") setPrintClicked(true);
    if (v?.name === "Search") setFindClicked(true);
    if (v?.name === "Other") setOtherClicked(true);
    if (v?.name === "Card") {
      setCardClicked(true);
      setCurrentIndex(0);
      setToggle(!toggle);
    }
    if (v?.name === "Refresh") setRefreshClicked(true);
    if (v === "Save") setSaveClicked(true);
    if (v === "Close") setCloseClicked(true);
    if (v === "first") {
      setFirstNavigateClicked(true);
      setCurrentIndex((prev) => {
        return 0;
      });
    }
    if (v === "previous") {
      setPreviousNavigateClicked(true);
      setCurrentIndex((prev) => {
        if (prev !== 0) return prev - 1;
        else return 0;
      });
    }
    if (v === "next") {
      setNextNavigateClicked(true);
      setCurrentIndex((prev) => {
        if (prev !== items.length - 1) return prev + 1;
        else return items.length - 1;
      });
    }
    if (v === "last") {
      setLastNavigateClicked(true);
      setCurrentIndex((prev) => {
        return items.length - 1;
      });
    }

    handleClose();
  };
  useEffect(()=>{
    console.log("bgccoo",bgColor)
  },[bgColor])

  return (
      <Box
        variant="gradient"
        sx={{mb:2}}
      >
        <AppBar position="static" sx={{borderTopRightRadius:'5px', borderTopLeftRadius:'5px', textAlign:'center', bgcolor:bgColor?bgColor:'black'}}>
          <Toolbar>
            {/* Form name aligned left */}
            <Typography
              variant="h5"
              color="white"
              //sx={{ flexGrow: 1 }} // This pushes it to the left
            >
              {formName}
            </Typography>
            {(cardClicked) ? (
              <>
                <IconButton size="small" color="white"
                  onClick={() => {
                    handleItem("first");
                  }} 
                >
                  <FirstPageIcon/>
                </IconButton>
               
                <IconButton size="small" color="white"
                  disabled={isPreviousDisable}
                  onClick={() => {
                    handleItem("previous");
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                
                <Typography variant="body1">
                  <h6>{currentIndex + 1 + " / " + items.length}</h6>
                </Typography>
                
                <IconButton size="small" color="white"
                  disabled={isNextDisable}
                  onClick={() => {
                    handleItem("next");
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
                
                <IconButton size="small" color="white"
                  onClick={() => {
                    handleItem("last");
                  }}
                >
                  <LastPageIcon />
                </IconButton>
              </>
            ) : (
              ""
            )}

            {/* Buttons aligned right */}
            <Box ml="auto" display="flex" alignItems="center">
              <IconButton  onClick={() => handleItem("Save")} sx={{color:'#fff'}}>
                <SaveIcon sx={{ fontSize: {xs:'18px', sm:'24px', md:'28px', lg:'28px', xl:'28px'}}}/>
              </IconButton>

              <IconButton size="small" color="white" onClick={() => handleItem("Close")} sx={{color:'#fff'}}>
                <CloseIcon sx={{ fontSize: {xs:'18px', sm:'24px', md:'28px', lg:'28px', xl:'28px'}}}/>
              </IconButton>

              <IconButton
                size="small"
                edge="end"
                color="white"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{color:'#fff'}}
              >
                <MoreIcon sx={{ fontSize: {xs:'18px', sm:'24px', md:'28px', lg:'28px', xl:'28px'}}}/>
              </IconButton>
            </Box>

            {/* Dropdown menu */}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {newOptions.map((v, i) => (
                <MenuItem key={v.id} onClick={() => handleItem(v, i)}>
                  {v?.icon} &nbsp; {v?.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar> 
      </Box>
  );
};


export default DmTopControl;