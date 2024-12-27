import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";

export default function RoomStatus() {
  const [roomStatus, setRoomStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  useEffect(() => {
    const fetchRoomStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${ApiUrl}/api/dashboard/room-status`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setRoomStatus(data);
        console.log("roomStatus", data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    console.log("shubham Kumar Keshri");
    fetchRoomStatus();
    
  
  
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!roomStatus) {
    return null;
  }

  const total = Object.values(roomStatus).reduce(
    (sum, value) => sum + value,
    0
  );

  const statusItems = [
    { label: "Occupied", value: roomStatus.occupied, color: "#FFC107" }, // Yellow
    { label: "Available", value: roomStatus.clean, color: "green" }, // Green
    { label: "Dirty", value: roomStatus.dirty, color: "red" }, // Red
    { label: "Out Of Order", value: roomStatus.outOfOrder, color: "#87CEEB" }, // Sky Blue
    { label: "Block", value:roomStatus.block, color: "purple" }, // Purple
  ];

  return (
    <Box
      maxWidth="lg"
      mx="auto"
      mt={2}
      p={3}
      bgcolor="white" // White background
      border="1px solid #ddd" // Light gray border
      borderRadius={4} // Rounded corners
      boxShadow={1} // Subtle shadow for elevation
    >
      {/* Status Bar */}
      <Box
        display="flex"
        height="32px"
        borderRadius={2}
        overflow="hidden"
        bgcolor="#f0f0f0" // Light gray background for the bar
      >
        {statusItems.map((item) => {
          const percentage = ((item.value / total) * 100).toFixed(1); // Calculate percentage
          return (
            <Box
              key={item.label}
              sx={{
                width: `${percentage}%`,
                backgroundColor: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "0.65rem",
              }}
            >
              {item.value > 0 ? ` ${percentage}%` : ""}
            </Box>
          );
        })}
      </Box>

      {/* Legend */}
      <Grid container spacing={2} mt={2}>
        {statusItems.map((item) => (
          <Grid item xs={6} sm={4} md={2.4} key={item.label}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                width={21}
                height={21}
                bgcolor={item.color} // Circle uses the same color
                borderRadius="50%"
              />
              <Typography variant="body2">
                <span style={{ fontWeight: "bold" }}>{item.label}</span>:{" "}
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
