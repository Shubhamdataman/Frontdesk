import React,{useState,useEffect}from "react";
import { Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import HotelIcon from "@mui/icons-material/Hotel";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";



export function OverviewCards() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;


  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
    
    setCurrentDate(today);
  }, []);
  useEffect(() => {
    if (currentDate) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${ApiUrl}/api/dashboard/counts?currDate=${currentDate}`);
          setData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();

      // const interval = setInterval(fetchData, 60000);
      // return () => clearInterval(interval);
    }
  }, [currentDate]);

  console.log("DATA1",data);
  console.log("currentdate",currentDate);

  const cards = data
  ? [
      {
        title: "Current Occupancy",
        value: data.occupancyCount || "0",
        subtext: "Today",
        icon: <LoginIcon />,
        color: "#FF6B35",
        path: "/currentoccupancy",
      },
      {
        title: "Arrivals",
        value: data.arrivalCount || "0",
        subtext: "Today",
        icon: <LogoutIcon />,
        color: "#38B6FF",
        path: "/arrivals",
      },
      {
        title: "Departures",
        value: data.departureCount || "0",
        subtext: "Today",
        icon: <BookOnlineIcon />,
        color: "#1976D2",
        path: "/departures",
      },
      {
        title: "Expected Arrivals",
        value: data.expectedArrivalCount || "0",
        subtext: "Today",
        icon: <HotelIcon />,
        color: "#4CAF50",
        path: "/expectedarrivals",
      },
      {
        title: "Expected Departures",
        value: data.expectedDepartureCount || "0",
        subtext: "Today",
        icon: <LuggageIcon />,
        color: "#4CAF50",
        path: "/expecteddepartures",
      },
      {
        title: "Total Pending Amount ",
        value: "0", 
        subtext: "On time",
        icon: <PaymentsIcon />,
        color: "#4CAF50",
        path: "/pendingguestbills",
      },
    ]
  : [];

const handleCardClick = (path) => {
  navigate(path);
};

if (loading) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
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
      height="100vh"
    >
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    </Box>
  );
}
  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              onClick={() => handleCardClick(card.path)} 
              sx={{
                p: 2.5,
                borderRadius: 2,
                height: "120px", 
                width: "130px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
                boxShadow: 2,
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 4,
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: card.color,
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s",
                  "& svg": {
                    color: "white",
                    fontSize: "1.5rem",
                  },
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
              >
                {card.icon}
              </Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="text.primary"
                textAlign="center"
              >
                {card.value}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                textAlign="center"
              >
                {card.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="center"
              >
                {card.subtext}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
// import React from "react";
// import { Card, Typography, IconButton, Grid, Box, Badge } from "@mui/material";
// import HotelIcon from "@mui/icons-material/Hotel";
// import FlightLandIcon from "@mui/icons-material/FlightLand";
// import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import ReceiptIcon from "@mui/icons-material/Receipt";

// // JSON Data
// const metrics = [
//   {
//     label: "Current Occupancy",
//     value: 85,
//     icon: <HotelIcon />,
//     color: "linear-gradient(45deg, #64b5f6, #1e3a8a)", // Light to Dark Blue
//     alert: 0,
//   },
//   {
//     label: "Today Arrivals",
//     value: 20,
//     icon: <FlightLandIcon />,
//     color: "linear-gradient(45deg, #81c784, #388e3c)", // Light to Dark Green
//     alert: 5,
//   },
//   {
//     label: "Today Departures",
//     value: 15,
//     icon: <FlightTakeoffIcon />,
//     color: "linear-gradient(45deg, #ffb74d, #f57c00)", // Light to Dark Orange
//     alert: 0,
//   },
//   {
//     label: "Expected Arrivals",
//     value: 10,
//     icon: <ScheduleIcon />,
//     color: "linear-gradient(45deg, #ab47bc, #6a1b9a)", // Light to Dark Purple
//     alert: 2,
//   },
//   {
//     label: "Expected Departures",
//     value: 12,
//     icon: <ScheduleIcon />,
//     color: "linear-gradient(45deg, #ef5350, #c62828)", // Light to Dark Red
//     alert: 1,
//   },
//   {
//     label: "Pending GuestBills",
//     value: 7,
//     icon: <ReceiptIcon />,
//     color: "linear-gradient(45deg, #ff7043, #d32f2f)", // Light to Dark Coral
//     alert: 3,
//   },
// ];

// const OverviewCards = () => {
//   return (
//     <Grid container spacing={4} justifyContent="center" sx={{ padding: 3 }}>
//       {metrics.map((item, index) => (
//         <Grid item xs={12} sm={6} md={4} key={index}>
//           <Card
//             sx={{
//               padding: 3,
//               borderRadius: 3,
//               boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//               background: item.color, // Apply the new gradient
//               color: "#fff",
//               display: "flex",
//               alignItems: "flex-start",
//               justifyContent:"flex-start",
//               transition: "all 0.3s ease-in-out",
//               "&:hover": {
//                 transform: "translateY(-2px) scale(1.05)",
//                 boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
//                 cursor:"pointer"
//               },
//             }}
//           >
//             <Box display="flex" alignItems="center">
//               <Badge
//                 badgeContent={item.alert}
//                 color="error"
//                 sx={{
//                   marginRight: 2,
//                   "& .MuiBadge-badge": {
//                     backgroundColor: "#f44336",
//                     fontSize: "0.65rem",
//                     padding: "4px 8px",
//                   },
//                 }}
//               >
//                 <IconButton
//                   sx={{
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                     color: "#fff",
//                     fontSize: "2rem",
//                     padding: "10px",
//                     "& svg": { fontSize: "2rem" },
//                     "&:hover": {
//                       backgroundColor: "rgba(255, 255, 255, 0.3)",
//                     },
//                   }}
//                 >
//                   {item.icon}
//                 </IconButton>
//               </Badge>
//               <Box>
//                 <Typography variant="h5" fontWeight="bold" >
//                   {item.value}
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
//                   {item.label}
//                 </Typography>
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default OverviewCards;

