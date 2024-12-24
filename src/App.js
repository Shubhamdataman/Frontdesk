import React, { useState } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "./DMLayout/Sidebar";
import { Header } from "./DMLayout/Header";
import AllRoutes from "./Routes/AllRoutes";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        // minHeight: "100vh",
        
      }}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Layout */}
      <Box
        sx={{
          // flex: 1,
          width:'100%',
          ml: isSidebarOpen ? "240px" : "95px", // Match the sidebar's width
          transition: "margin-left 0.3s", // Smooth sidebar transition
        }}
      >
        {/* Fixed Header */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: isSidebarOpen ? "240px" : "95px", // Sidebar offset
            width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 95px)",
            // width:"100%",
            transition: "left 0.3s, width 0.3s",
            zIndex: 1200,
            bgcolor: "background.paper",
            boxShadow: 1,
          }}
        >
          <Header />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            mt: 8, // Offset for header height (adjust as per header size)
            p: 3, // Padding for content
            // bgcolor: "background.paper",
            bgcolor:"aliceblue",
            // borderRadius: "8px",
            // boxShadow: 1,
          }}
        >
          <AllRoutes />
        </Box>
      </Box>
    </Box>
  );
}
