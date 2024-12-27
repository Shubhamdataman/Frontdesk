import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  Tooltip,
  CircularProgress,
  Divider,
  Modal,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import axios from "axios";
import shubham from "./skk.jpeg";

export function RoomGrid() {
  const [selectedRoom, setSelectedRoom] = useState();
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [guestDetails, setGuestDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("Double");
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  console.log(filterType);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${ApiUrl}/api/dashboard/room-categories`
        );
        const data = response.data;
        console.log("Alldata", data);

        const types = data.map((room) => room.name);
        setRoomTypes(types);

        // Set the first room type as default
        if (types.length > 0) {
          setSelectedRoom(types[0]);
          setRoomData(data.find((room) => room.name === types[0])?.rooms || []);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
    // const interval = setInterval(fetchRoomData, 60000);
    // return () => clearInterval(interval);
  }, []);

  // Fetch room data for the selected room type
  useEffect(() => {
    if (!selectedRoom) return;

    const fetchRoomDataForSelectedType = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${ApiUrl}/api/dashboard/room-categories`
        );
        const data = response.data;
        setRoomData(
          data.find((room) => room.name === selectedRoom)?.rooms || []
        );
      } catch (error) {
        console.error("Error fetching room data for selected type:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDataForSelectedType();
    // const interval = setInterval(fetchRoomDataForSelectedType, 60000);
    // return () => clearInterval(interval);
  }, [selectedRoom]);

  console.log("selectedroomdata", roomData);

  const handleRoomClick = (roomType) => {
    setSelectedRoom(roomType);
  };

  const handleOccupiedRoomClick = async (docId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${ApiUrl}/api/dashboard/guest-details?docId=${docId}`
      );
      setGuestDetails(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching guest details:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setGuestDetails(null);
  };

  const filteredRoomData = roomData.filter((room) => room.type === filterType);
  console.log("filteredRoomData", filteredRoomData);

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Room Status Overview
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {roomTypes.map((type) => (
          <Button
            key={type}
            onClick={() => handleRoomClick(type)}
            sx={{
              margin: "0.5rem 0",
              textTransform: "none",
              fontWeight: "bold",
              width: "100%",
              fontSize: "17px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 1,
              backgroundColor:
                type === selectedRoom ? "gray" : "background.paper",
              color: type === selectedRoom ? "common.white" : "text.primary",
              "&:hover": {
                backgroundColor: type === selectedRoom ? "gray" : "grey.200",
                color: type === selectedRoom ? "common.white" : "text.primary",
              },
              transition: "all 0.3s ease",
              padding: "0.6rem 1rem",
            }}
          >
            {type}
          </Button>
        ))}
      </Box>
      <Divider />
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={filterType}
            onChange={handleFilterChange}
            sx={{ gap: 2 }}
          >
            <FormControlLabel
              value="Single"
              control={<Radio />}
              label="Single"
            />
            <FormControlLabel
              value="Double"
              control={<Radio />}
              label="Double"
            />
            <FormControlLabel
              value="Triple"
              control={<Radio />}
              label="Triple"
            />
            <FormControlLabel
              value="Quadruple"
              control={<Radio />}
              label="Quadruple"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {!selectedRoom ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 2, mb: 3, marginTop: 2 }}>
            <Box sx={statusBoxStyles("#FFC107")}>Occupied</Box>
            <Box sx={statusBoxStyles("#4CAF50")}>Available</Box>
            <Box sx={statusBoxStyles("#FF6B35")}>Dirty</Box>
            <Box sx={statusBoxStyles("#87CEEB")}>OutOfOrder</Box>
            <Box sx={statusBoxStyles("purple")}>Block</Box>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <Typography sx={{ mb: 2 }}>Loading rooms...</Typography>
              <CircularProgress color="secondary" size={40} />
            </Box>
          ) : filteredRoomData && filteredRoomData.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 2,
                minHeight: "30vh",
              }}
            >
              {filteredRoomData.map((room, index) => (
                <Tooltip
                  key={index}
                  title={
                    room.status === "Occupied" ? (
                      <>
                        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                          {room.guest_name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          Contact: {room.mobile}
                        </Typography>
                      </>
                    ) : (
                      ""
                    )
                  }
                  arrow
                >
                  <Box
                    onClick={() =>
                      room.status === "Occupied" &&
                      handleOccupiedRoomClick(room.docId)
                    }
                    sx={{
                      width: 80,
                      height: 48,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",

                      fontSize: 14,
                      fontWeight: "bold",
                      backgroundColor:
                        room.status === "Clean"
                          ? "#4CAF50"
                          : room.status === "Occupied"
                          ? "#FFC107"
                          : room.status === "Dirty"
                          ? "#FF6B35"
                          : room.status === "Outoforder"
                          ? "#87CEEB"
                          : "purple",
                      color: "#fff",
                      position: "relative",
                      cursor:
                        room.status === "Occupied" ? "pointer" : "default",
                    }}
                  >
                    <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                      {room.room_no}
                    </Typography>
                    {room.status === "Occupied" && (
                      <BedIcon sx={{ fontSize: 18 }} />
                    )}
                      {room.status === "Dirty" && (
                      <CleaningServicesIcon sx={{ fontSize: 18 }} />
                    )}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              No rooms available for this category.
            </Typography>
          )}
        </>
      )}

      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {guestDetails ? (
            <Box>
              {/* Room Details Section */}
              <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="subtitle2" gutterBottom>
                      Room Number: {guestDetails.roomDetails.roomNo}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      GRC No.: {guestDetails.roomDetails.grcNo}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Reservation No.:{" "}
                      {guestDetails.roomDetails.reservationNo || "N/A"}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Reservation Date:{" "}
                      {guestDetails.roomDetails.reservationDate || "N/A"}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Checkin Date: {guestDetails.roomDetails.checkinDate}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Checkin Time: {guestDetails.roomDetails.checkinTime}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Status: {guestDetails.roomDetails.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      sx={{
                        height: "150px",
                        width: "150px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={shubham}
                        alt="Guestimg"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Guests Table Section */}
              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>Guest Name</TableCell>
                      <TableCell>Mobile No.</TableCell>
                      <TableCell>ID Name</TableCell>
                      <TableCell>ID No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {guestDetails.guestGrid.map((guest, index) => (
                      <TableRow key={index}>
                        <TableCell>{guest.guestNames}</TableCell>
                        <TableCell>{guest.mobile}</TableCell>
                        <TableCell>{guest.idName}</TableCell>
                        <TableCell>{guest.idNo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Typography>Loading guest details...</Typography>
          )}
        </Box>
      </Modal>
    </Paper>
  );
}

const statusBoxStyles = (color) => ({
  backgroundColor: color,
  padding: "8px 16px",
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  color: "#fff",
  fontSize: 12,
  width: "10%",
});
// import React, { useState, useEffect } from 'react';
// import { Box, Paper, Button, Typography, Tooltip, CircularProgress, Divider } from '@mui/material';
// import BedIcon from '@mui/icons-material/Bed';
// import axios from 'axios';

// export function RoomGrid() {
//   const [selectedRoom, setSelectedRoom] = useState();
//   const [loading, setLoading] = useState(false);
//   const [roomData, setRoomData] = useState([]);
//   const [roomTypes, setRoomTypes] = useState([]);

//   console.log(selectedRoom);

//   // Fetch room types and initialize selected room type
//   useEffect(() => {
//     const fetchRoomData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://192.168.6.13:3030/api/dashboard/room-categories');
//         const data = response.data;
//         console.log('Alldata', data);

//         const types = data.map((room) => room.name);
//         setRoomTypes(types);

//         // Set the first room type as default
//         if (types.length > 0) {
//           setSelectedRoom(types[0]);
//           setRoomData(data.find((room) => room.name === types[0])?.rooms || []);
//         }
//       } catch (error) {
//         console.error('Error fetching room data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoomData();
//   }, []);

//   // Fetch room data for the selected room type
//   useEffect(() => {
//     if (!selectedRoom) return;

//     const fetchRoomDataForSelectedType = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://192.168.6.13:3030/api/dashboard/room-categories');
//         const data = response.data;
//         setRoomData(data.find((room) => room.name === selectedRoom)?.rooms || []);
//       } catch (error) {
//         console.error('Error fetching room data for selected type:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoomDataForSelectedType();
//   }, [selectedRoom]);

//   console.log('selectedroomdata', roomData);

//   const handleRoomClick = (roomType) => {
//     setSelectedRoom(roomType);
//   };

//   return (
//     <Paper sx={{ p: 3, borderRadius: 2 }}>
//       <Typography variant="h6" sx={{ mb: 3 }}>
//         Room Status Overview
//       </Typography>

//       {/* Room Type Buttons */}
//       <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//         {roomTypes.map((type) => (
//           <Button
//             key={type}
//             onClick={() => handleRoomClick(type)}
//             sx={{
//               margin: '0.5rem 0',
//               textTransform: 'none',
//               fontWeight: 'bold',
//               width: '100%',
//               fontSize: '17px',
//               justifyContent: 'center',
//               alignItems: 'center',
//               textAlign: 'center',
//               borderRadius: 1,
//               backgroundColor: type === selectedRoom ? 'gray' : 'background.paper',
//               color: type === selectedRoom ? 'common.white' : 'text.primary',
//               '&:hover': {
//                 backgroundColor: type === selectedRoom ? 'gray' : 'grey.200',
//                 color: type === selectedRoom ? 'common.white' : 'text.primary',
//               },
//               transition: 'all 0.3s ease',
//               padding: '0.6rem 1rem',
//             }}
//           >
//             {type}
//           </Button>
//         ))}
//       </Box>
//       <Divider />

//       {/* Room Data Display */}
//       {!selectedRoom ? (
//         <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
//           <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: 'text.secondary' }}>
//             Select a room type to show available, occupied, and dirty rooms.
//           </Typography>
//         </Box>
//       ) : (
//         <>
//           {/* Status Boxes */}
//           <Box sx={{ display: 'flex', gap: 2, mb: 3, marginTop: 2 }}>
//             <Box sx={statusBoxStyles('#FFC107')}>Occupied</Box>
//             <Box sx={statusBoxStyles('#4CAF50')}>Available</Box>
//             <Box sx={statusBoxStyles('#FF6B35')}>Dirty</Box>
//           </Box>
//           <Divider sx={{ mb: 2 }} />

//           {/* Room Data Grid */}
//           {loading ? (
//             <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
//               <Typography sx={{ mb: 2 }}>Loading rooms...</Typography>
//               <CircularProgress color="secondary" size={40} />
//             </Box>
//           ) : roomData && roomData.length > 0 ? (
//             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, minHeight: '30vh' }}>
//               {roomData.map((room, index) => (
//                 <Tooltip
//                   key={index}
//                   title={
//                     room.status === 'Occupied' ? (
//                       <>
//                         <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{room.guest_name}</Typography>
//                         <Typography sx={{ fontSize: 14 }}>Contact: {room.mobile}</Typography>
//                       </>
//                     ) : (
//                       ''
//                     )
//                   }
//                   arrow
//                 >
//                   <Box
//                     sx={{
//                       width: 80,
//                       height: 48,
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: 14,
//                       fontWeight: 'bold',
//                       backgroundColor:
//                         room.status === 'Available' ? '#4CAF50' :
//                         room.status === 'Occupied' ? '#FFC107' :
//                         '#FF6B35',
//                       color: '#fff',
//                       position: 'relative',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{room.room_no}</Typography>
//                     {room.status === 'Occupied' && <BedIcon sx={{ fontSize: 18 }} />}
//                   </Box>
//                 </Tooltip>
//               ))}
//             </Box>
//           ) : (
//             <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
//               No rooms available for this category.
//             </Typography>
//           )}
//         </>
//       )}
//     </Paper>
//   );
// }

// const statusBoxStyles = (color) => ({
//   backgroundColor: color,
//   padding: '8px 16px',
//   borderRadius: 8,
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontWeight: 'bold',
//   color: '#fff',
//   fontSize: 12,
//   width: '10%',
// });
