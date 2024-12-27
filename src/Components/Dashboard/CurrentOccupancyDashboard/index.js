import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import {OverviewCards} from "../../OverviewCards";
import { RoomGrid } from "../../Rooms/RoomGrid";
import CustomerSatisfaction from "../../CustomerSatisfaction";
import { StaffSchedule } from "../../StaffSchedule";
import DashboardPriceGraph from "../../DashboardPriceGraph";
import Checkincheckout from "../../Checkincheckout";

const CurrentOccupancyDashboard = () => {
  return (
    <>
      <Box sx={{ p: 1 }}>
        {/* Page Title */}
        <Typography variant="h4" gutterBottom>
          Hotel's Name
        </Typography>

        {/* <Typography color="text.secondary" paragraph>
        Gain valuable insights into the overall performance of your business.
        Explore key metrics, room details, customer satisfaction, and staff
        schedules, all in one place to help you make informed decisions.
      </Typography> */}

        {/* Main Grid Layout */}
        <Grid container spacing={3}>
          {" "}
          {/* Adjusted spacing */}
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* OverviewCards Section */}
            <Box sx={{ mb: 4 }}>
              {" "}
              {/* Reduced gap */}
              <OverviewCards />
            </Box>

            {/* RoomGrid Section */}
            <Box>
              <RoomGrid />
            </Box>
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, boxShadow: 3 }}>
              <CustomerSatisfaction />
            </Card>
            <Card sx={{mb:2}}>
                  <Checkincheckout/>
            </Card>
           
            <Card sx={{ minHeight:"465px",borderRadius:"10px"}}>
             
              <StaffSchedule />
            
            </Card>
          
          </Grid>
        </Grid>

        <DashboardPriceGraph />
      </Box>
    </>
  );
};

export default CurrentOccupancyDashboard;
