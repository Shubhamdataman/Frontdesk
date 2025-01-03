import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { KeyOutlined, Logout, Settings } from "@mui/icons-material";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Header() {
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
   const { username,logout } = useAuth();
   const navigate = useNavigate();
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };
  const logoutHandler=()=>{
  
    logout();
    handleMenuClose();
    toast.success("Logout Success",{
      position:"top-center",
      autoClose: 700, // Auto close after 3 seconds
      hideProgressBar: true, // No progress bar
      closeOnClick: true, // Close on click
      pauseOnHover: true, // Pause on hover
      draggable: true, // Allow dragging the toast
      theme: "colored", // Colored theme
      className: "custom-toast", // Custom class
    })
    navigate("/login");

   
  }

  // const handleProfileClick = () => {
  //   console.log("Navigate to profile");
  //   handleMenuClose();
  // };

  // const handleLogoutClick = () => {
  //   console.log("Logout action");
  //   handleMenuClose();
  // };
  
  return (
    <AppBar
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "static",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo or Text on the Left */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 32,
              height: 32,
              fontSize: "1rem",
            }}
          >
            FD
          </Avatar>
          <Typography
            variant="h6"
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            Front Desk
          </Typography>
        </Box>

        {/* Right-side Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Badge badgeContent={10} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={6} color="error">
              <MailOutlineIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleAvatarClick}>
            <Avatar />
          </IconButton>
        </Box>

        {/* Avatar Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 1, // Adjusted spacing to move the menu downward
                ml: 1,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0, // Positioned at the top of the menu
                  left: "135px", // Centered horizontally (adjust as needed)
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)", // Arrow pointing upwards
                  zIndex: 0,
                },
              },
            },
          }}
        >
         
          <MenuItem onClick={handleMenuClose}>
            <Avatar
              sx={{
                color: "white",
                bgcolor: "#007FFF",
                width: "30px",
                height: "30px",
              }}
            />
            {username ||"Profile"} {/* Display the username or "Guest" if not available */}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} sx={{ alignItems: "center" }}>
            <ListItemIcon>
              <KeyOutlined fontSize="small" sx={{ color: "#007FFF" }}/>
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ alignItems: "center" }}>
            <ListItemIcon>
              <Settings fontSize="small" sx={{ color: "#007FFF" }}/>
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem
             onClick={logoutHandler}
            sx={{ fontWeight: "bold", fontSize: 14, alignItems: "center" }}
          >
            <ListItemIcon  >
              <Logout fontSize="small" sx={{ color: "#007FFF" }}/>
            </ListItemIcon>
            LOGOUT
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
