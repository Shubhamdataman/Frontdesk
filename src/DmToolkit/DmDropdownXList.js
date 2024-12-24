import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export const DmDropdownXList = ({
  placeholder,
  required,
  inputValue,
  setInputValue,
  sx,
  optionSelected,
  onSelectChange,
  menuArray,
  searchText,
  setSearchText,
  rows,
  fieldName,
  fieldName1,
  fieldName2,
  onClickItem,
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchedRows, setSearchedRows] = useState([]);
  const handleSearch = (e) => {
    setIsOpen(true);
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (rows.length !== 0 && searchText) {
      if (searchText !== "" && optionSelected) {
        if (optionSelected === 1) {
          let arr = rows.filter((v, i) => {
            if (
              v[fieldName1].toLowerCase().includes(searchText.toLowerCase())
            ) {
              return v;
            }
          });
          setSearchedRows(arr);
        } else if (optionSelected === 2) {
          let arr = rows.filter((v, i) => {
            if (
              v[fieldName2].toLowerCase().includes(searchText.toLowerCase())
            ) {
              return v;
            }
          });
          setSearchedRows(arr);
        }
      }
    }
  }, [searchText, rows, inputValue]);

  const handleSearchOption = (e) => {
    setSearchText(e.target.value);
    if (searchText !== undefined && optionSelected) {
      if (optionSelected === 1) {
        let arr = rows.filter((v, i) => {
          if (v[fieldName1].toLowerCase().includes(searchText.toLowerCase())) {
            return v;
          }
        });
        setSearchedRows(arr);
      } else if (optionSelected === 2) {
        let arr = rows.filter((v, i) => {
          if (v[fieldName2].toLowerCase().includes(searchText.toLowerCase())) {
            return v;
          }
        });
        setSearchedRows(arr);
      }
    }
  };

  const handleChange = (e) => {
    onSelectChange(e.target.value);
  };
  const handleClick = (item) => {
    onClickItem(item?.City);
    setIsOpen(false);
  };
  return (
    <>
      <div className="dm-textfield-dropdown">
        <TextField
          margin="normal"
          //   label={placeholder}
          placeholder={placeholder}
          required={required}
          value={inputValue}
          onChange={handleSearch}
          sx={{ margin: 0 }}
          size="small"
          InputProps={{
            readOnly: true,
          }}
          disabled={isDisabled}
          // onClick={()=>setIsOpen(true)}
        />
        <div className="dm-textfield-dropdown-arrow">
          {!isOpen ? (
            <ArrowDropDownIcon
              sx={{ height: "30px", width: "30px" }}
              onClick={() => setIsOpen(true)}
              style={{ display: isDisabled ? "none" : "block" }}
            />
          ) : (
            <ArrowDropUpIcon
              sx={{ height: "30px", width: "30px" }}
              onClick={() => setIsOpen(false)}
              style={{ display: isDisabled ? "none" : "block" }}
            />
          )}
        </div>
      </div>
      {isOpen ? (
        <div className="dm-dropdown-arrow-container">
          <Box>
            <Select
              value={optionSelected}
              onChange={handleChange}
              sx={{
                width: "8%",
              }}
              size="small"
            >
              {menuArray.map((v, i) => {
                return (
                  <MenuItem key={v?.value} value={v?.value}>
                    {v?.label}
                  </MenuItem>
                );
              })}
            </Select>
            &nbsp;&nbsp;&nbsp;
            <TextField
              margin="normal"
              value={searchText}
              onChange={handleSearchOption}
              sx={{ width: "10%", mt: "0" }}
              size="small"
            />
            <ListItem>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ "font-family": "cursive" }}
              >
                {" "}
                {fieldName1} &nbsp;&nbsp;&nbsp; <br />
                {fieldName2}
              </Typography>
              {/* <ListItemText primary={fieldName1} secondary={fieldName2} /> */}
            </ListItem>
            <List sx={{ overflow: "auto", maxHeight: "300px", width: "260px" }}>
              {searchText === ""
                ? rows.map((v, i) => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={v[fieldName1]}
                          secondary={v[fieldName2]}
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleClick(v)}
                        />
                      </ListItem>
                    );
                  })
                : searchedRows.map((v, i) => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={v[fieldName1]}
                          secondary={v[fieldName2]}
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleClick(v)}
                        />
                      </ListItem>
                    );
                  })}
            </List>
          </Box>
        </div>
      ) : (
        ""
      )}
    </>
  );
};


export default DmDropdownXList;
