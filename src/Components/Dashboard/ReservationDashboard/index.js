import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
} from "@mui/material";

export default function ReservationDashboard() {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(7);
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [bookedRoomDetails, setBookedRoomDetails] = useState(null);
  const [bookedRoomModalOpen, setBookedRoomModalOpen] = useState(false);
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  // Fetch room availability data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${ApiUrl}/api/dashboard/room-availability?fromDate=${currentDate}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const dates = Array.from({ length: dateRange }, (_, i) =>
    format(addDays(new Date(currentDate), i), "yyyy-MM-dd")
  );

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const fetchRoomDetails = async (roomCategoryCode) => {
    try {
      const response = await fetch(
        `${ApiUrl}/api/dashboard/room-detail?roomCategoryCode=${roomCategoryCode}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch room details");
      }

      const result = await response.json();
      setRoomDetails(result);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };
  const fetchBookedRoomDetails = async (date, roomCategoryCode) => {
    try {
      const response = await fetch(
        `${ApiUrl}/api/dashboard/booking-detail?roomCategoryCode=${roomCategoryCode}&bookingDate=${date}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch room details");
      }

      const result = await response.json();
      setBookedRoomDetails(result);
      setBookedRoomModalOpen(true);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setRoomDetails(null);
  };
  const handleBookedModalClose = () => {
    setBookedRoomModalOpen(false);
    setBookedRoomDetails(null);
  };

  const totalAvailabilityPerDate = dates.map((date) => {
    let totalBooked = 0;
    let totalAvailable = 0;
    data.forEach((category) => {
      const availability = category.availability?.[date] || {
        booked: 0,
        available_rooms: category.totalRooms,
      };
      totalBooked += availability.booked;
      totalAvailable += availability.available_rooms;
    });
    return { date, totalBooked, totalAvailable };
  });
  console.log("totalAvailabilityPerDate", totalAvailabilityPerDate);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", p: 1 }}>
      <Typography variant="h4" gutterBottom>
        Reservation Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
          mb: 2,
        }}
      >
        <TextField
          type="date"
          label="Select Date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
        <Button
          variant={dateRange === 7 ? "contained" : "outlined"}
          onClick={() => handleDateRangeChange(7)}
        >
          7 Days
        </Button>
        <Button
          variant={dateRange === 15 ? "contained" : "outlined"}
          onClick={() => handleDateRangeChange(15)}
        >
          15 Days
        </Button>
        <Button
          variant={dateRange === 30 ? "contained" : "outlined"}
          onClick={() => handleDateRangeChange(30)}
        >
          30 Days
        </Button>

        {/* Indicator */}
        <Box display="flex" alignItems="center" gap={2} sx={{ ml: "auto" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "green",
                borderRadius: "50%",
                border: "1px solid black",
              }}
            />
            <Typography>Available</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "#FFC107",
                borderRadius: "50%",
                border: "1px solid black",
              }}
            />
            <Typography>Occupied</Typography>
          </Box>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 600, overflow: "auto", boxShadow: 3, borderRadius: 2 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: "primary.main", color: "white" }}>
                Room Category
              </TableCell>
              <TableCell sx={{ bgcolor: "primary.main", color: "white" }}>
                Total Rooms
              </TableCell>
              {dates.map((date) => (
                <TableCell
                  key={date}
                  sx={{ bgcolor: "primary.main", color: "white" }}
                >
                  {date}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((category) => (
              <TableRow
                key={category.roomCategory}
                hover
                sx={{ "&:hover": { bgcolor: "grey.200" } }}
              >
                <TableCell>{category.roomCategory}</TableCell>
                <TableCell>
                  <Button
                    sx={{
                      backgroundColor: "aliceblue",
                      color: "black",
                      borderRadius: 2,
                      padding: "10px 20px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        backgroundColor: "lightblue",
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    variant="text"
                    color="primary"
                    onClick={() => fetchRoomDetails(category.roomCategoryCode)}
                  >
                    {category.totalRooms}
                  </Button>
                </TableCell>
                {dates.map((date) => {
                  const availability = category.availability?.[date] || {
                    booked: 0,
                    available_rooms: category.totalRooms,
                  };
                  return (
                    <TableCell key={date}>
                      <Box display="flex" alignItems="center" gap={2}>
                        {/* Available Rooms Circle */}
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            backgroundColor: "green",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          <Typography variant="body2">
                            {availability.available_rooms}
                          </Typography>
                        </Box>

                        {/* Booked Rooms Circle */}
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            backgroundColor: "#FFC107",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            fetchBookedRoomDetails(
                              date,
                              category.roomCategoryCode
                            )
                          }
                        >
                          <Typography variant="body2">
                            {availability.booked}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}

            {/* Total row */}
            <TableRow sx={{ bgcolor: "grey.300", fontWeight: "bold" }}>
              <TableCell>Total</TableCell>
              <TableCell>
                {data.reduce(
                  (total, category) => total + category.totalRooms,
                  0
                )}
              </TableCell>
              {totalAvailabilityPerDate.map((totals) => (
                <TableCell key={totals.date}>
                  <Box display="flex" alignItems="center" gap={2}>
                    {/* Available Rooms Circle */}
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: "green",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography variant="body2">
                        {totals.totalAvailable}
                      </Typography>
                    </Box>

                    {/* Booked Rooms Circle */}
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#FFC107",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography variant="body2">
                        {totals.totalBooked}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* model */}
      <Modal open={modalOpen} >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            width: "30%",
            maxHeight: "80vh",
            overflow: "auto",
            fontSize: "0.875rem",
            border: "1px solid black",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
            Room Details
          </Typography>
          {roomDetails && roomDetails.length ? (
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "60vh",
                overflow: "auto",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      Room Number
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>Category</TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>Floor</TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      Occupancy Type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomDetails.map((room, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {room.roomName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {room.roomCatName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {room.floorName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {room.occupancyType}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ fontSize: "0.875rem" }}>
              No details available
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{ mt: 2, fontSize: "0.875rem" }}
            onClick={handleModalClose}
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Booked Room Details Modal */}
      <Modal open={bookedRoomModalOpen} >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            width: "60%",
            maxHeight: "80vh",
            overflow: "auto",
            fontSize: "0.875rem",
            border: "1px solid black",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
            Booked Room Details
          </Typography>
          {bookedRoomDetails && bookedRoomDetails.length ? (
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "60vh",
                overflow: "auto",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      Booking No.
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>Status</TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      No. of Rooms
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>OTA</TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      Organisation
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      Guest Name
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>Mobile</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookedRoomDetails.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {detail.bookingNo}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {detail.status}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {detail.noOfRoom}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {detail.otaName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {detail.orgName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {detail.guestName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.8rem" }}>
                        {detail.mobile}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ fontSize: "0.875rem" }}>
              No details available
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{ mt: 2, fontSize: "0.875rem" }}
            onClick={handleBookedModalClose}
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
