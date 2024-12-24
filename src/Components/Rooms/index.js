import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { RoomGrid } from "./RoomGrid";
import RoomStatus from "./RoomStatus";
import { FloorWiseRooms } from "./FloorWiseRooms";
// import FloorStatus from "./FloorStatus";
// import {FloorWiseRooms} from "./FloorWiseRooms"
export function Rooms() {
  const [view, setView] = useState("category");

  const handleChange = (event) => {
    setView(event.target.value);
  };
  return (
    <>
      <Box>
        <Typography variant="h5" gutterBottom>
          Rooms
        </Typography>
        {/* <RoomGrid />
      
      <RoomStatus/> */}
        {/* <FloorWiseRooms/> */}
      </Box>
      <Box className="w-full max-w-4xl mx-auto p-4 space-y-6">
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="view-selector"
            name="view-selector"
            value={view}
            onChange={handleChange}
          >
            <FormControlLabel
              value="category"
              control={<Radio />}
              label="Category Wise"
            />
            <FormControlLabel
              value="floor"
              control={<Radio />}
              label="Floor Wise"
            />
          </RadioGroup>
        </FormControl>

        {view === "category" ? (
          <>
            <RoomGrid />
            <RoomStatus />
          </>
        ) : (
          <>
            <FloorWiseRooms />
            {/* <FloorStatus/> */}
            <RoomStatus />
          </>
        )}
      </Box>
    </>
  );
}
