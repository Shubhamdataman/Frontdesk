
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LuggageIcon from '@mui/icons-material/Luggage';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Cross icon
import ReceiptIcon from '@mui/icons-material/Receipt';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
const iconStyle={
    fontSize: 24,
    color: '#fff', // Icon color
    backgroundColor: 'green', // Background color for the circle
    borderRadius: '50%', // Make it circular
   // Add padding inside the circle
    padding:3,
    transition: 'background-color 0.3s'
}
const dashboardSubItems = [
  {
    text: "Current Occupancy",
    path: "/",
    icon: <HotelIcon  style={iconStyle}/>,
  },
  { text: "Reservation", path: "/dashboard/reservation", icon: <CalendarMonthIcon style={iconStyle}/> },
  {
    text: "Room Display",
    path: "/dashboard/room-display",
    icon: <BedroomParentIcon style={iconStyle}/>,
  },
];

const transactionsSubItems = [
  {
    text: "Guest Reservation",
    path: "/transactions/guest-reservation",
    icon: <PersonAddIcon style={iconStyle}/>,
  },
  {
    text: "Guest Check-In",
    path: "/transactions/guest-checkin",
    icon: <LuggageIcon style={iconStyle}/>,
  },
  {
    text: "Guest Services",
    path: "/transactions/guest-services",
    icon: <FoodBankIcon style={iconStyle} />,
  },
  {
    text: "Payment Receipt",
    path: "/transactions/payment-receipt",
    icon: <ReceiptIcon style={iconStyle}/>,
  },
  {
    text: "Payment Refund",
    path: "/transactions/payment-refund",
    icon: <CurrencyRupeeRoundedIcon style={iconStyle}/>,
  },
  {
    text: "Room Change Entry",
    path: "/transactions/room-change",
    icon: <SwapHorizontalCircleRoundedIcon style={iconStyle} />,
  },
  {
    text: "Room Check-Out",
    path: "/transactions/room-checkout",
    icon: <CheckBoxRoundedIcon style={iconStyle} />,
  },
  {
    text: "Check-Out Bill",
    path: "/transactions/checkout-bill",
    icon: <AccountBalanceWalletRoundedIcon style={iconStyle} />,
  },
];

const reportsSubItems = [
  { text: "User Reports", path: "/reports/user-reports", icon: <HotelIcon style={iconStyle} /> },
];

const masterSubItems = [
  { text: "Master List", path: "/master/master-list", icon: <HotelIcon style={iconStyle}/> },
];

export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <Box
      sx={{
        
        width: isOpen ? 240 : 95,
        backgroundColor: "primary.main",
        color: "white",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
        transition: "width 0.3s",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
        // overflowX: 'visible',
        overflowY: "auto",
      }}
    >
      {/* Header Section with Branding and Toggle Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          width: "100%", // Ensures the entire header width is used for centering
        }}
      >
        {/* Branding */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isOpen && (
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                color: "white",
                // marginLeft: '5px',
              }}
            >
              HOTEL BOOKERS
            </Typography>
          )}
        </Box>

        {/* Centered Toggle Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // Ensures the button is centered in the available space
          }}
        >
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              color: "white",
              marginLeft: "15px",
              marginRight: "15px",
              position: "absolute", // Position the button centrally
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Box>
      <Divider />
      {/* Menu Items */}
      <List>
        {/* Dashboard Section */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="dashboard-content"
            id="dashboard-header"
            sx={{
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              paddingLeft: isOpen ? "16px" : "0px",
            }}
          >
            <Tooltip
              title={!isOpen ? "Dashboard" : ""}
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#000", // Green background color
                    color: "#FFFFFF", // White text color
                    fontSize: "14px", // Adjust text size
                    borderRadius: "8px", // Rounded corners
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                    padding: "8px 12px", // Padding for spacing
                  },
                },
                arrow: {
                  sx: {
                    color: "#4CAF50", // Arrow color matches tooltip background
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: isOpen ? 40 : "auto",
                  justifyContent: "center",
                  ml: 1,
                }}
              >
                <HomeIcon />
              </ListItemIcon>
            </Tooltip>
            {isOpen && <ListItemText primary="Dashboard" />}
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: isOpen ? "16px" : "0px" }}>
            {dashboardSubItems.map((subItem) => (
              <NavLink
                key={subItem.text}
                to={subItem.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Tooltip
                  title={isOpen ? "" : subItem.text}
                  placement="right"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#4CAF50", // Green background color
                        color: "#FFFFFF", // White text color
                        fontSize: "14px", // Adjust text size
                        borderRadius: "8px", // Rounded corners
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                        padding: "8px 12px", // Padding for spacing
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#4CAF50", // Arrow color matches tooltip background
                      },
                    },
                  }}
                >
                  <ListItem
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.05)", // Slight scale-up effect on hover
                        transition:
                          "transform 0.2s ease, background-color 0.3s ease", // Smooth transition
                      },
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "background-color 0.3s, transform 0.2s", // Smooth transition
                      pl: isOpen ? "20px" : "10px", // Adjust padding based on sidebar state
                      display: "flex",
                      alignItems: "center", // Align icon and text properly
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        minWidth: "40px", // Consistent width for icon
                        mr: isOpen ? "12px" : "0px", // Add some space between icon and text if sidebar is open
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>

                    {/* Render text only when sidebar is open */}
                    {isOpen && <ListItemText primary={subItem.text} />}
                  </ListItem>
                </Tooltip>
              </NavLink>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Transactions Section */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="transactions-content"
            id="transactions-header"
            sx={{
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              paddingLeft: isOpen ? "16px" : "0px",
            }}
          >
            <Tooltip
              title={!isOpen ? "Transactions" : ""}
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#000", // Green background for tooltip
                    color: "#FFFFFF", // White text color
                    fontSize: "14px", // Adjust text size
                    borderRadius: "8px", // Rounded corners
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                    padding: "8px 12px", // Padding for spacing
                  },
                },
                arrow: {
                  sx: {
                    color: "#4CAF50", // Arrow color matches tooltip background
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: isOpen ? 40 : "auto",
                  justifyContent: "center",
                  ml: 1,
                }}
              >
                <PointOfSaleIcon/>
              </ListItemIcon>
            </Tooltip>
            {isOpen && <ListItemText primary="Transactions" />}
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: isOpen ? "16px" : "0px" }}>
            {transactionsSubItems.map((subItem) => (
              <NavLink
                key={subItem.text}
                to={subItem.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Tooltip
                  title={isOpen ? "" : subItem.text}
                  placement="right"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#4CAF50", // Green background for tooltip
                        color: "#FFFFFF", // White text color
                        fontSize: "14px", // Adjust text size
                        borderRadius: "8px", // Rounded corners
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                        padding: "8px 12px", // Padding for spacing
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#4CAF50", // Arrow color matches tooltip background
                      },
                    },
                  }}
                >
                  <ListItem
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.05)", // Slight scale-up effect on hover
                        transition:
                          "transform 0.2s ease, background-color 0.3s ease", // Smooth transition
                      },
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "background-color 0.3s, transform 0.2s", // Smooth transition
                      pl: isOpen ? "20px" : "10px", // Adjust padding based on sidebar state
                      display: "flex",
                      alignItems: "center", // Align icon and text properly
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        minWidth: "40px", // Consistent width for icon
                        mr: isOpen ? "12px" : "0px", // Add some space between icon and text if sidebar is open
                      }}
                    >
                   {subItem.icon}
                    </ListItemIcon>

                    {/* Render text only when sidebar is open */}
                    {isOpen && <ListItemText primary={subItem.text} />}
                  </ListItem>
                </Tooltip>
              </NavLink>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Reports Section */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="reports-content"
            id="reports-header"
            sx={{
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              paddingLeft: isOpen ? "16px" : "0px",
            }}
          >
            <Tooltip
              title={!isOpen ? "Reports" : ""}
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#000", // Green background color
                    color: "#FFFFFF", // White text color
                    fontSize: "14px", // Adjust text size
                    borderRadius: "8px", // Rounded corners
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow for better visibility
                    padding: "8px 12px", // Add padding for better spacing
                  },
                },
                arrow: {
                  sx: {
                    color: "#4CAF50", // Arrow color matches tooltip background
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: isOpen ? 40 : "auto",
                  justifyContent: "center",
                  ml: 1,
                }}
              >
                <DescriptionIcon />
              </ListItemIcon>
            </Tooltip>
            {isOpen && <ListItemText primary="Reports" />}
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: isOpen ? "16px" : "0px" }}>
            {reportsSubItems.map((subItem) => (
              <NavLink
                key={subItem.text}
                to={subItem.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Tooltip
                  title={isOpen ? "" : subItem.text}
                  placement="right"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#4CAF50", // Green background color
                        color: "#FFFFFF", // White text color
                        fontSize: "14px", // Adjust text size
                        borderRadius: "8px", // Rounded corners
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow
                        padding: "8px 12px", // Add padding
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#4CAF50", // Arrow color matches tooltip background
                      },
                    },
                  }}
                >
                  <ListItem
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.05)", // Slight scale-up effect on hover
                        transition:
                          "transform 0.2s ease, background-color 0.3s ease", // Smooth transition
                      },
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "background-color 0.3s, transform 0.2s", // Smooth transition
                      pl: isOpen ? "20px" : "10px", // Adjust padding based on sidebar state
                      display: "flex",
                      alignItems: "center", // Align icon and text properly
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        minWidth: "40px", // Consistent width for icon
                        mr: isOpen ? "12px" : "0px", // Add space between icon and text if sidebar is open
                      }}
                    >
                     {subItem.icon}
                    </ListItemIcon>

                    {/* Render text only when sidebar is open */}
                    {isOpen && <ListItemText primary={subItem.text} />}
                  </ListItem>
                </Tooltip>
              </NavLink>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Master Section */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="master-content"
            id="master-header"
            sx={{
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              paddingLeft: isOpen ? "16px" : "0px",
            }}
          >
            <Tooltip
              title={!isOpen ? "Master" : ""}
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#000", // Green background for tooltip
                    color: "#FFFFFF", // White text color
                    fontSize: "14px", // Adjust text size
                    borderRadius: "8px", // Rounded corners
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                    padding: "8px 12px", // Padding for spacing
                  },
                },
                arrow: {
                  sx: {
                    color: "#4CAF50", // Arrow color matches tooltip background
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: isOpen ? 40 : "auto",
                  justifyContent: "center",
                  ml: 1,
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
            </Tooltip>
            {isOpen && <ListItemText primary="Master" />}
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: isOpen ? "16px" : "0px" }}>
            {masterSubItems.map((subItem) => (
              <NavLink
                key={subItem.text}
                to={subItem.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Tooltip
                  title={isOpen ? "" : subItem.text}
                  placement="right"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#4CAF50", // Green background for tooltip
                        color: "#FFFFFF", // White text color
                        fontSize: "14px", // Adjust text size
                        borderRadius: "8px", // Rounded corners
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow for better visibility
                        padding: "8px 12px", // Padding for spacing
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#4CAF50", // Arrow color matches tooltip background
                      },
                    },
                  }}
                >
                  <ListItem
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.05)", // Slight scale-up effect on hover
                        transition:
                          "transform 0.2s ease, background-color 0.3s ease", // Smooth transition
                      },
                      borderRadius: "50px",
                      cursor: "pointer",
                      transition: "background-color 0.3s, transform 0.2s", // Smooth transition
                      pl: isOpen ? "20px" : "10px", // Adjust padding based on sidebar state
                      display: "flex",
                      alignItems: "center", // Align icon and text properly
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: "center",
                        minWidth: "40px", // Consistent width for icon
                        mr: isOpen ? "12px" : "0px", // Add some space between icon and text if sidebar is open
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>

                    {/* Render text only when sidebar is open */}
                    {isOpen && <ListItemText primary={subItem.text} />}
                  </ListItem>
                </Tooltip>
              </NavLink>
            ))}
          </AccordionDetails>
        </Accordion>
      </List>
    </Box>
  );
}
