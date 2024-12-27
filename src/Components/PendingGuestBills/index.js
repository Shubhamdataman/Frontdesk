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

const PendingGuestBills = () => {
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
    { field: "guestname", headerName: "Guest Name", flex: 2 },
    { field: "arrivalDate", headerName: "Arrival Date", flex: 2 },
    { field: "arrivalTime", headerName: "Arrival Time", flex: 2 },
    { field: "departureDate", headerName: "Departure Date", flex: 2 },
    { field: "categoryName", headerName: "Category Name", flex: 2 },
    { field: "packageName", headerName: "Package Name", flex: 2 },
    { field: "pendingAmount", headerName: "Pending Amount", flex: 2 },
  ];

  const rows = expectedArrivals.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Box sx={{ p: 2, maxWidth: "1100px", mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Total Pending Amount
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
                    <Typography variant="body2">
                      Guest Name: {arrival.guestname}
                    </Typography>
                    <Typography variant="body2">
                      Arrival Date: {arrival.arrivalDate}
                    </Typography>
                    <Typography variant="body2">
                      Departure Date: {arrival.departureDate}
                    </Typography>
                    <Typography variant="body2">
                      Arrival Date: {arrival.arrivalDate}
                    </Typography>
                    <Typography>Arrival Time:{arrival.arrivalTime}</Typography>

                    <Typography variant="body2">
                      Category Name: {arrival.categoryName}
                    </Typography>
                    <Typography variant="body2">
                      Package Name: {arrival.packageName}
                    </Typography>
                    <Typography variant="body2">
                      Pending Amount: {arrival.pendingAmount}
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

export default PendingGuestBills;
