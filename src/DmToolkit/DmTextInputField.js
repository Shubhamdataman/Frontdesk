import React from "react";
import "./DmReactTheme.css";
import { FormHelperText, TextField } from "@mui/material";

const DmTextInputField = ({
  inputValue,
  setInputValue,
  placeholder,
  required,
  error,
  autoFill,
  isDisabled,
  size,
  autoFocus,
  sx,
  margin,
  type,
  number,
  fullWidth,
  onKeyDown,
  onChange,
  id
}) => {
  const handleChangeNumber = (e) => {
    let regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setInputValue(e.target.value);
    } else {
      setInputValue("");
    }
  };

  return (
      <TextField
        value={inputValue}
        id={id}
        onChange={number ? handleChangeNumber : onChange}
        size={size}
        label={placeholder}
        required={required}
        error={error}
        autoComplete={autoFill}
        disabled={isDisabled}
        autoFocus={autoFocus}
        sx={sx}
        margin={margin}
        type={type}
        fullWidth={fullWidth}
        inputProps={{
          autoComplete: 'off', // Additional input-level autocomplete off
        }}
        onKeyDown={onKeyDown}
      />
  );
};

export default DmTextInputField;
