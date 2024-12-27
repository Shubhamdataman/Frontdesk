import React, { useEffect, useState } from "react";
import {
  Box,

  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  Divider,

} from "@mui/material";
import { Phone } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";

export function StaffSchedule() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const ApiUrl = process.env.REACT_APP_DATABASE_URL;

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}/api/dashboard/staff-schedule`
        );
        setStaffMembers(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaffData();
    // const interval = setInterval(fetchStaffData, 60000);
    // return () => clearInterval(interval);
  }, []);
  console.log("Staff",staffMembers);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
       
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 2,
          color: "text.primary",
        }}
      >
        Staff Schedule
      </Typography>
      <Divider sx={{ mb: 3 }} />


      {staffMembers.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          No staff members available.
        </Typography>
      ) : (
        staffMembers.map((staff, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 2,
              mb: 2,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: 2,
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 4,
              },
            }}
          >
            <Avatar
              src={staff.avatar || "/placeholder.svg"}
              alt={staff.name}
              sx={{
                width: 56,
                height: 56,
                border: "2px solid",
                borderColor: "primary.main",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {staff.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color:"success.main",
                  fontWeight: 500,
                }}
              >
                Available
              </Typography>
            </Box>
            <Box sx={{display:"flex",flexWrap:"wrap",gap:1}}>
            <IconButton
              size="small"
              sx={{
                bgcolor: "success.light",
                color: "white",
                "&:hover": { bgcolor: "success.main" },
              }}
              onClick={() =>
                window.open(`https://wa.me/${staff.mobile}`, "_blank")
              }
            >
              <WhatsAppIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
              onClick={() => window.open(`tel:${staff.mobile}`)}
            >
              <Phone fontSize="small" />
            </IconButton>
            </Box>
           
          </Box>
        ))
      )}
    </Box>
  );
}
