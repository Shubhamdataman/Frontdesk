import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import { PieChart } from "@mui/x-charts";

export default function CustomerSatisfaction() {
  const [roomStatus, setRoomStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  useEffect(() => {
    const fetchRoomStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${ApiUrl}/api/dashboard/room-status`);
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

    fetchRoomStatus();
    // const interval = setInterval(fetchRoomStatus, 60000);
    // return () => clearInterval(interval);
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

  const total = Object.values(roomStatus).reduce((sum, value) => sum + value, 0);

  const statusItems = [
    { label: "Occupied", value: roomStatus.occupied, color: "#FFC107" }, // Yellow
    { label: "Available", value: roomStatus.clean, color: "green" }, // Green
    { label: "Dirty", value: roomStatus.dirty, color: "red" }, // Red
    { label: "Out of Order", value: roomStatus.outOfOrder, color: "#87CEEB" }, // Sky Blue
    { label: "Block", value: roomStatus.block, color: "purple" }, // Purple
  ];

  const percentages = statusItems.map((item) => ({
    ...item,
    percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : 0,
  }));

  return (
    <Box>

      <Box sx={{ textAlign: "center"}}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Room Status
        </Typography>
      </Box>
      <Divider/>

   
      <Box sx={{ display: "flex", justifyContent:"flex-start", alignItems: "center" }}>
        <PieChart
          series={[
            {
              data: percentages.map((item) => ({
                id: item.label,
                value: item.value,
                label: `${item.label} (${item.percentage}%)`, 
                color: item.color,
              })),
              colorScheme: percentages.map((item) => item.color),
            },
          ]}
          width={500}
          height={200}
        />
      </Box>
    </Box>
  );
}

// import React, { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress, Divider } from "@mui/material";
// import { PieChart } from "@mui/x-charts";

// export default function CustomerSatisfaction() {
//   const [roomStatus, setRoomStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const ApiUrl = process.env.REACT_APP_DATABASE_URL;

//   useEffect(() => {
//     const fetchRoomStatus = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${ApiUrl}/api/dashboard/room-status`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setRoomStatus(data);
//         console.log("roomStatus", data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoomStatus();
//     // const interval = setInterval(fetchRoomStatus, 60000);
//     // return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="200px"
//       >
//         <CircularProgress size="4rem" />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   if (!roomStatus) {
//     return null;
//   }

//   const total = Object.values(roomStatus).reduce((sum, value) => sum + value, 0);

//   const statusItems = [
//     { label: "Occupied", value: roomStatus.occupied, color: "#FFC107" }, // Yellow
//     { label: "Available", value: roomStatus.clean, color: "green" }, // Green
//     { label: "Dirty", value: roomStatus.dirty, color: "red" }, // Red
//     { label: "Out of Order", value: roomStatus.outOfOrder, color: "#87CEEB" }, // Sky Blue
//     { label: "Block", value: roomStatus.block, color: "purple" }, // Purple
//   ];

//   const percentages = statusItems.map((item) => ({
//     ...item,
//     percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : 0,
//   }));

//   return (
//     <Box>

//       <Box sx={{ textAlign: "center"}}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Room Status
//         </Typography>
//       </Box>
//       <Divider/>

   
//       <Box sx={{ display: "flex", justifyContent:"flex-start", alignItems: "center" }}>
//         <PieChart
//           series={[
//             {
//               data: percentages.map((item) => ({
//                 id: item.label,
//                 value: item.value,
//                 label: `${item.label} (${item.percentage}%)`, 
//                 color: item.color,
//               })),
//               colorScheme: percentages.map((item) => item.color),
//             },
//           ]}
//           width={500}
//           height={200}
//         />
//       </Box>
//     </Box>
//   );
// }
