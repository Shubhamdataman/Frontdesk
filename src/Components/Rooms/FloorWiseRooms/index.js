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
import axios from "axios";

export function FloorWiseRooms() {
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
          `${ApiUrl}/api/dashboard/floor-wise-rooms`
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
  }, []);

  // Fetch room data for the selected room type
  useEffect(() => {
    if (!selectedRoom) return;

    const fetchRoomDataForSelectedType = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${ApiUrl}/api/dashboard/floor-wise-rooms`
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
                        src={`data:image/jpeg;base64,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`}
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
