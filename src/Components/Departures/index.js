import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Departures = () => {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  const isMobile = useMediaQuery("(max-width:1100px)");

  const getCurrentFormattedDate = () => {
    const date = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
  };

  useEffect(() => {
    const currentDate = getCurrentFormattedDate();
    setCurrentDate(currentDate);

    const fetchDepartures = async () => {
      try {
        const response = await fetch(
          `${ApiUrl}/api/dashboard/getCurrentDeparture?v_Date=${currentDate}`
        );
        const data = await response.json();
        setDepartures(data);
      } catch (error) {
        console.error("Error fetching arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartures();
  }, []);

  const columns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "guestName", headerName: "Guest Name", flex: 2 },
    { field: "roomCategory", headerName: "Room Category", flex: 1 },
    { field: "packageName", headerName: "Package Name", flex: 1 },
    { field: "reservationNo", headerName: "Reservation No", flex: 1 },
    { field: "grcNo", headerName: "GRC No", flex: 1 },
    { field: "gidNo", headerName: "GID No", flex: 1 },
    { field: "organization", headerName: "Organization", flex: 1 },
    { field: "arrivalDate", headerName: "Arrival Date", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
  ];

  const rows = departures.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Box sx={{ p: 2, maxWidth: "1100px", mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Departures
      </Typography>
      <Box sx={{ height: isMobile ? "auto" : 465, mt: 2 }}>
        {loading ? (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress size="4rem" />
          </Grid>
        ) : departures.length === 0 ? (
          <Typography>
            No data found for the current date: {currentDate}
          </Typography>
        ) : isMobile ? (
          <Grid container spacing={2}>
            {departures.map((departure, index) => (
              <Grid item xs={12} key={index}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Room No: {departure.roomNo}
                    </Typography>
                    <Typography variant="body2">
                      Guest Name: {departure.guestName}
                    </Typography>
                    <Typography variant="body2">
                      Room Category: {departure.roomCategory}
                    </Typography>
                    <Typography variant="body2">
                      Package Name: {departure.packageName}
                    </Typography>
                    <Typography variant="body2">
                      Reservation No: {departure.reservationNo}
                    </Typography>
                    <Typography variant="body2">
                      GRC No: {departure.grcNo}
                    </Typography>
                    <Typography variant="body2">
                      GID No: {departure.gidNo}
                    </Typography>
                    <Typography variant="body2">
                      Organization: {departure.organization}
                    </Typography>
                    <Typography variant="body2">
                      Arrival Date: {departure.arrivalDate}
                    </Typography>
                    <Typography variant="body2">
                      City: {departure.city}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f5f5f5",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "0.9rem",
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Departures;
