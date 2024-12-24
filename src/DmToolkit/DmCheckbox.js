import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
const DmCheckbox = ({ checked, setChecked }) => {
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </>
  );
};

export default DmCheckbox;

