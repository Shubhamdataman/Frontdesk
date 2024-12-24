import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const CurrentOccupancy = () => {
  const [occupancyData, setOccupancyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:1100px)");
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  useEffect(() => {
    const fetchOccupancyData = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}/api/dashboard/getCurrentOccupancy`
        );
        setOccupancyData(response.data);
      } catch (error) {
        console.error("Error fetching occupancy data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOccupancyData();
  }, []);

  const columns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "guestName", headerName: "Guest Name", flex: 2 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "checkInDate", headerName: "Check-In Date", flex: 1 },
    { field: "checkInTime", headerName: "Check-In Time", flex: 1 },
    { field: "depDate", headerName: "Departure Date", flex: 1 },
    { field: "pax", headerName: "Pax", flex: 1 },
    { field: "categoryName", headerName: "Category", flex: 2 },
    { field: "rate", headerName: "Rate", flex: 1 },
    { field: "packageName", headerName: "Package", flex: 1 },
    { field: "otaname", headerName: "OTA Name", flex: 1 },
    { field: "grcNo", headerName: "GRC No", flex: 2 },
    { field: "reservationNo", headerName: "Reservation No", flex: 1 },
    { field: "displayName", headerName: "Display Name", flex: 2 },
  ];

  return (
    <Box p={2}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Current Occupancy
      </Typography>
      {loading ? (
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="4rem" />
        </Grid>
      ) : isMobile ? (
        <Grid container spacing={2}>
          {occupancyData.map((room, index) => (
            // <Grid item xs={12} md={8} key={index}>
            <Grid size={{ xs: 12, md: 8 }} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Room No: {room.roomNo}
                  </Typography>
                  <Typography variant="body1">
                    Guest Name: {room.guestName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Mobile: {room.mobile}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Check-In Date: {room.checkInDate} at {room.checkInTime}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Departure Date: {room.depDate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Pax: {room.pax}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {room.categoryName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rate: {room.rate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Package: {room.packageName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    OTA Name: {room.otaname || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    GRC No: {room.grcNo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Reservation No: {room.reservationNo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Display Name: {room.displayName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ height: 465 }}>
          <DataGrid
            rows={occupancyData}
            columns={columns}
            getRowId={(row) => row.code}
            sx={{ overflow: "auto" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CurrentOccupancy;
