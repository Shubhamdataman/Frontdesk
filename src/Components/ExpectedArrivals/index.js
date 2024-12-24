import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography, useMediaQuery, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ExpectedArrivals = () => {
  const [expectedArrivals, setExpectedArrivals] = useState([]);
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

    const fetchExpectedArrivals = async () => {
      try {
        const response = await fetch(
          `${ApiUrl}/api/dashboard/getExpectedArrival?arrivalDate=${currentDate}`
        );
        const data = await response.json();
        setExpectedArrivals(data);
      } catch (error) {
        console.error("Error fetching arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpectedArrivals();
  }, []);

  const columns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "reservationNo", headerName: "Reservation No", flex: 1 },
    { field: "categoryName", headerName: "Category Name", flex: 1 },
    { field: "packageName", headerName: "Package Name", flex: 1 },
    { field: "arrivalDate", headerName: "Arrival Date", flex: 1 },
    { field: "stayDays", headerName: "Stay Days", flex: 1 },
    { field: "depDate", headerName: "Departure Date", flex: 1 },
    { field: "bookedBy", headerName: "Booked By", flex: 1 },
    { field: "mobile", headerName: "Contact No.", flex: 1 },
    { field: "organization", headerName: "Organization", flex: 1 },
    { field: "totalAdults", headerName: "Total Adults", flex: 1 },
  ];

  const rows = expectedArrivals.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Box sx={{ p: 2, maxWidth: "1100px", mx: "auto" }}>
      <Typography variant="h6" gutterBottom >
        Expected Arrivals
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
        ) : expectedArrivals.length === 0 ? (
          <Typography>
            No data found for the current date: {currentDate}
          </Typography>
        ) : isMobile ? (
          <Grid container spacing={2}>
            {expectedArrivals.map((arrival, index) => (
              <Grid item xs={12} key={index}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Room No: {arrival.roomNo}
                    </Typography>
                    <Typography variant="body2">Reservation No: {arrival.reservationNo}</Typography>
                    <Typography variant="body2">Category Name: {arrival.categoryName}</Typography>
                    <Typography variant="body2">Package Name: {arrival.packageName}</Typography>
                    <Typography variant="body2">Arrival Date: {arrival.arrivalDate}</Typography>
                    <Typography variant="body2">Stay Days: {arrival.stayDays}</Typography>
                    <Typography variant="body2">Departure Date: {arrival.depDate}</Typography>
                    <Typography variant="body2">Booked By: {arrival.bookedBy}</Typography>
                    <Typography variant="body2">Contact No: {arrival.mobile}</Typography>
                    <Typography variant="body2">Organization: {arrival.organization}</Typography>
                    <Typography variant="body2">Total Adults: {arrival.totalAdults}</Typography>
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

export default ExpectedArrivals;
