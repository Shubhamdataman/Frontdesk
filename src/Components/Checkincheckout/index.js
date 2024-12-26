import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios"; 

export default function CheckinCheckout() {
  
  const [metricsData, setMetricsData] = useState([
    { id: 1, label: "Check In", value: 0, color: "#0066FF" },
    { id: 2, label: "Check Out", value: 0, color: "#FFB766" },
  ]);
  const [currentDate, setCurrentDate] = useState("");
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

 
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

 
  useEffect(() => {
    if (currentDate) {

      axios
        .get(`${ApiUrl}/api/dashboard/counts?currDate=${currentDate}`) 
        .then((response) => {
          const data = response.data;

          const total = data.arrivalCount + data.departureCount;

         
          if (total === 0) {
            setMetricsData([
              { id: 1, label: "Check In", value: 0, color: "#0066FF" },
              { id: 2, label: "Check Out", value: 0, color: "#FFB766" },
            ]);
          } else {
            
            setMetricsData([
              {
                id: 1,
                label: "Check In",
                value: ((data.arrivalCount / total) * 100).toFixed(1),
                color: "#0066FF",
              },
              {
                id: 2,
                label: "Check Out",
                value: ((data.departureCount / total) * 100).toFixed(1),
                color: "#FFB766",
              },
            ]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [currentDate]); 

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        gap: 4,
        p: 3,
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      {metricsData.map((metric) => (
        <Box
          key={metric.id}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "150px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              size={100}
              thickness={4}
              sx={{ color: "lightgray", position: "absolute" }}
            />
            <CircularProgress
              variant="determinate"
              value={metric.value}
              size={100}
              thickness={4}
              sx={{ color: metric.color, transform: "rotate(-90deg)" }}
            />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {`${metric.value}%`}
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ mt: 1, textAlign: "center" }}>
            {metric.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
