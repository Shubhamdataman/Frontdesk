import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
const DmPopUp = ({button1content, button2content,dialogueTitle,dialogueContent,open, setOpen, onButton1Click, onButton2Click}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {dialogueTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogueContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onButton1Click}>
            {button1content}
          </Button>
          <Button onClick={onButton2Click} autoFocus>
            {button2content}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default DmPopUp;
