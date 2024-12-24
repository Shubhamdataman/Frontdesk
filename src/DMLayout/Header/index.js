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
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export function Header() {
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleProfileClick = () => {
    console.log("Navigate to profile");
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    console.log("Logout action");
    handleMenuClose();
  };

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
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
