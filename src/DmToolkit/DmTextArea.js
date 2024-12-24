import { FormHelperText, TextareaAutosize } from "@mui/material";
import React, { useEffect } from "react";

const DmTextArea = ({
  inputValue,
  setInputValue,
  placeholder,
  isDisabled,
  showHelperText,
  tag1,
  tag2,
}) => {
  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);
  return (
    <div className="dm-text-area">
      <TextareaAutosize
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder={placeholder}
        disabled={isDisabled}
        minRows={4}
        maxRows={4}
        style={{
          maxWidth: "150px",
          padding: "10px",
          maxHeight: "80px",
          overflow: "auto",
          resize: 'none'
        }}
      />

      {showHelperText ? (
        <div className="dm-text-area-formHelperText">
          <FormHelperText
            variant="outlined"
            sx={
              {
                // backgroundColor:'GrayText',                //To be looked at
              }
            }
          >
            {tag1}
          </FormHelperText>
          <FormHelperText variant="outlined">{tag2}</FormHelperText>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DmTextArea;