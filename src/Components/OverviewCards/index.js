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
  const navigate = useNavigate();
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ApiUrl}/api/dashboard/counts?currDate=2024-12-24`);
 
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("DATA1",data);

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
        title: "Pending Guest Bills",
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
