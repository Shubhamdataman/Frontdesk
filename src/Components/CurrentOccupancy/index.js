// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   useMediaQuery,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
// import ManageSearchIcon from "@mui/icons-material/ManageSearch";

// const CurrentOccupancy = () => {
//   const [occupancyData, setOccupancyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMobile = useMediaQuery("(max-width:1100px)");
//   const ApiUrl = process.env.REACT_APP_DATABASE_URL;
//   const [openDetails, setOpenDetails] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   console.log("SelectedRoom:", selectedRoom);
//   useEffect(() => {
//     const fetchOccupancyData = async () => {
//       try {
//         const response = await axios.get(
//           `${ApiUrl}/api/dashboard/getCurrentOccupancy`
//         );
//         setOccupancyData(response.data);
//       } catch (error) {
//         console.error("Error fetching occupancy data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOccupancyData();
//   }, []);

//   const columns = [
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleRoomDetails(params.row)}>
//           <ManageSearchIcon sx={{ color: "green" }} />
//         </IconButton>
//       ),
//     },
//     { field: "roomNo", headerName: "Room No", flex: 1 },
//     { field: "guestName", headerName: "Guest Name", flex: 3 },
//     { field: "mobile", headerName: "Mobile", flex: 3 },
//     { field: "checkInDate", headerName: "Check-In Date", flex: 3 },
//     { field: "checkInTime", headerName: "Check-In Time", flex: 2 },
//     { field: "depDate", headerName: "Departure Date", flex: 3 },
//     { field: "categoryName", headerName: "Category", flex: 3 },
//     { field: "packageName", headerName: "Package", flex: 2 },
//     { field: "rate", headerName: "Rate", flex: 2 },
//     { field: "displayName", headerName: "Display Name", flex: 3 },
//     { field: "otaname", headerName: "OTA Name", flex: 2 },
//     { field: "reservationNo", headerName: "Reservation No", flex: 2 },
//     { field: "grcNo", headerName: "GRC No", flex: 2 },
//     { field: "pax", headerName: "Pax", flex: 1 },
//   ];
//   const handleRoomDetails = (room) => {
//     setSelectedRoom(room);
//     setOpenDetails(true);
//   };
//   const handleCloseDetails = () => {
//     setOpenDetails(false);
//     setSelectedRoom(null);
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Current Occupancy
//       </Typography>
//       {loading ? (
//         <Grid
//           container
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CircularProgress size="4rem" />
//         </Grid>
//       ) : isMobile ? (
//         <Grid container spacing={2}>
//           {occupancyData.map((room, index) => (
//             // <Grid item xs={12} md={8} key={index}>
//             <Grid size={{ xs: 12, md: 8 }} key={index}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     Room No: {room.roomNo}
//                   </Typography>
//                   <Typography variant="body1">
//                     Guest Name: {room.guestName}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Mobile: {room.mobile}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Check-In Date: {room.checkInDate} at {room.checkInTime}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Departure Date: {room.depDate}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Pax: {room.pax}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Category: {room.categoryName}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Rate: {room.rate}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Package: {room.packageName}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     OTA Name: {room.otaname || "N/A"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     GRC No: {room.grcNo}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Reservation No: {room.reservationNo}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Display Name: {room.displayName}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Box sx={{ height: 465 }}>
//           <DataGrid
//             rows={occupancyData}
//             columns={columns}
//             getRowId={(row) => row.code}
//             sx={{ overflow: "auto" }}
//           />
//         </Box>
//       )}
//       {/* Room Details Modal */}
//       <Dialog open={openDetails} onClose={handleCloseDetails}>
//         <DialogTitle>Room Details</DialogTitle>
//         <DialogContent>
//           {selectedRoom && (
//             <div>

//               <Typography variant="h6">
//                 Room No: {selectedRoom.roomNo}
//               </Typography>
//               <Typography variant="body1">
//                 Guest Name: {selectedRoom.guestName}
//               </Typography>
//               <Typography variant="body2">
//                 Mobile: {selectedRoom.mobile}
//               </Typography>
//               <Typography variant="body2">
//                 Check-In Date: {selectedRoom.checkInDate} at{" "}
//                 {selectedRoom.checkInTime}
//               </Typography>
//               <Typography variant="body2">
//                 Departure Date: {selectedRoom.depDate}
//               </Typography>
//               <Typography variant="body2">Pax: {selectedRoom.pax}</Typography>
//               <Typography variant="body2">
//                 Category: {selectedRoom.categoryName}
//               </Typography>
//               <Typography variant="body2">Rate: {selectedRoom.rate}</Typography>
//               <Typography variant="body2">
//                 Package: {selectedRoom.packageName}
//               </Typography>
//               <Typography variant="body2">
//                 OTA Name: {selectedRoom.otaname || "N/A"}
//               </Typography>
//               <Typography variant="body2">
//                 GRC No: {selectedRoom.grcNo}
//               </Typography>
//               <Typography variant="body2">
//                 Reservation No: {selectedRoom.reservationNo}
//               </Typography>
//               <Typography variant="body2">
//                 Display Name: {selectedRoom.displayName}
//               </Typography>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <button onClick={handleCloseDetails}>Close</button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CurrentOccupancy;
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Paper,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const CurrentOccupancy = () => {
  const [occupancyData, setOccupancyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomServiceData, setRoomServiceData] = useState([
    { vrNo: "101", date: "2024-12-01", service: "Mini Bar", total: 30.0 },
    { vrNo: "102", date: "2024-12-02", service: "Mini Bar2", total: 99.0 },
  ]);
  const [housekeepingData, setHousekeepingData] = useState([
    { vrNo: "201", date: "2024-12-01", service: "Laundry", total: 15.0 },
    { vrNo: "202", date: "2024-12-01", service: "Laundry", total: 25.0 },
    { vrNo: "203", date: "2024-12-01", service: "Laundry", total: 15.0 },
  ]);
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

  const fetchRoomDetails = async (regDocId) => {
    setLoadingDetails(true);
    try {
      const roomServiceResponse = await axios.get(
        `${ApiUrl}/api/services/getRoomService/${regDocId}`
      );
      const housekeepingResponse = await axios.get(
        `${ApiUrl}/api/services/getHousekeeping/${regDocId}`
      );
      setRoomServiceData(roomServiceResponse.data);
      setHousekeepingData(housekeepingResponse.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };
  console.log("roomServiceData", roomServiceData);
  console.log("houseKeepingData", housekeepingData);
  const handleRoomDetails = (room) => {
    setSelectedRoom(room);
    fetchRoomDetails(room.regDocId);
    setOpenDetails(true);
  };
  console.log("SelectedRoom:", selectedRoom);
  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedRoom(null);
    setRoomServiceData([]);
    setHousekeepingData([]);
  };

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleRoomDetails(params.row)}>
          <ManageSearchIcon sx={{ color: "green" }} />
        </IconButton>
      ),
    },
    { field: "roomNo", headerName: "Room No", width: 80 },
    { field: "guestName", headerName: "Guest Name", width: 150 },
    { field: "mobile", headerName: "Mobile", width: 120 },
    { field: "checkInDate", headerName: "Check-In Date", width: 120 },
    { field: "checkInTime", headerName: "Check-In Time", width: 100 },
    { field: "depDate", headerName: "Departure Date", width: 120 },
    { field: "categoryName", headerName: "Category", width: 120 },
    { field: "packageName", headerName: "Package", width: 120 },
    { field: "rate", headerName: "Rate", width: 90 },
    { field: "displayName", headerName: "Display Name", width: 120 },
    { field: "otaname", headerName: "OTA Name", width: 100 },
    { field: "reservationNo", headerName: "Reservation No", width: 150 },
    { field: "grcNo", headerName: "GRC No", width: 150 },
    { field: "pax", headerName: "Pax", width: 90 },
  ];
  const calculateGrandTotal = () => {
    const roomServiceTotal = roomServiceData.reduce(
      (total, service) => total + service.total,
      0
    );
    const housekeepingTotal = housekeepingData.reduce(
      (total, service) => total + service.total,
      0
    );
    return (roomServiceTotal + housekeepingTotal).toFixed(2);
  };
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
            <Grid item xs={12} md={8} key={index}>
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
        <Box sx={{ width: 950 }}>
          <DataGrid
            rows={occupancyData}
            columns={columns}
            getRowId={(row) => row.code}
            pageSizeOptions={[5, 25, 40, 50]} // Options for page size
            paginationModel={{ pageSize: 5, page: 0 }} // Default page size and initial page
            pagination // Enables pagination
            sx={{ overflow: "auto" }}
          />
        </Box>
      )}
      {/* Room Details Modal */}
      <Dialog open={openDetails} onClose={handleCloseDetails}>
        <DialogTitle sx={{ backgroundColor: "aliceblue", mb: 1 }}>
          Service Details
        </DialogTitle>
        <DialogContent>
          {selectedRoom && (
            <Box>
              <Paper elevation={2} sx={{ padding: 1, marginBottom: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ backgroundColor: "#F7F9F9" }}
                >
                  <strong>Guest Detail</strong>
                </Typography>
                <Divider sx={{ marginBottom: 1 }} />
                <Typography variant="body2">
                  <strong>Room No:</strong> {selectedRoom.roomNo}
                </Typography>
                <Typography variant="body2">
                  <strong>Guest Name:</strong> {selectedRoom.guestName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Mobile:</strong> {selectedRoom.mobile}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Check-In Date:</strong> {selectedRoom.checkInDate} at{" "}
                  {selectedRoom.checkInTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Departure Date:</strong> {selectedRoom.depDate}
                </Typography>
              </Paper>

              {/* Room Service Section */}
              <Paper elevation={2} sx={{ padding: 1, marginBottom: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ backgroundColor: "#F7F9F9" }}
                >
                  <strong>Room Service</strong>
                </Typography>
                <Divider sx={{ marginBottom: 1 }} />
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Vr. No.</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {roomServiceData.map((service, index) => (
                        <TableRow key={service.vrNo}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{service.date}</TableCell>
                          <TableCell>{service.vrNo}</TableCell>
                          <TableCell>{service.service}</TableCell>
                          <TableCell align="right">
                            ₹{service.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} align="right">
                          <strong>Total:</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>
                            ₹
                            {roomServiceData
                              .reduce(
                                (total, service) => total + service.total,
                                0
                              )
                              .toFixed(2)}
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* Housekeeping Section */}
              <Paper elevation={2} sx={{ padding: 1 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ backgroundColor: "#F7F9F9" }}
                >
                  <strong>Housekeeping Service</strong>
                </Typography>
                <Divider sx={{ marginBottom: 1 }} />
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Vr. No.</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {housekeepingData.map((service, index) => (
                        <TableRow key={service.vrNo}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{service.date}</TableCell>
                          <TableCell>{service.vrNo}</TableCell>
                          <TableCell>{service.service}</TableCell>
                          <TableCell align="right">
                            ₹{service.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} align="right">
                          <strong>Total:</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>
                            ₹
                            {housekeepingData
                              .reduce(
                                (total, service) => total + service.total,
                                0
                              )
                              .toFixed(2)}
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              {/* Grand Total */}
              <Paper
                elevation={2}
                sx={{
                  padding: 1,
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Grand Total
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#4caf50" }}
                >
                  ₹{calculateGrandTotal()}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "aliceblue" }}>
          <button onClick={handleCloseDetails}>Close</button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CurrentOccupancy;
