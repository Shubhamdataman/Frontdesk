import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
const DashboardPriceGraph = () => {
  const sampleData = [
    { date: "1-Jan-2024", revenue: 800, refunds: 100, billToCompany: 300 },
    { date: "2 Jan 2024", revenue: 700, refunds: 300, billToCompany: 250 },
    { date: "3 Jan 2024", revenue: 600, refunds: 250, billToCompany: 280 },
    { date: "4 Jan 2024", revenue: 850, refunds: 300, billToCompany: 400 },
    { date: "5 Jan 2024", revenue: 750, refunds: 200, billToCompany: 320 },
    { date: "6 Jan 2024", revenue: 900, refunds: 350, billToCompany: 450 },
    { date: "7 Jan 2024", revenue: 650, refunds: 220, billToCompany: 300 },
    { date: "8 Jan 2024", revenue: 800, refunds: 100, billToCompany: 300 },
    { date: "9 Jan 2024", revenue: 700, refunds: 300, billToCompany: 250 },
    { date: "10 Jan 2024", revenue: 600, refunds: 250, billToCompany: 280 },
    { date: "11 Jan 2024", revenue: 850, refunds: 300, billToCompany: 400 },
    { date: "12 Jan 2024", revenue: 750, refunds: 200, billToCompany: 320 },
    { date: "13 Jan 2024", revenue: 900, refunds: 350, billToCompany: 450 },
    { date: "14 Jan 2024", revenue: 650, refunds: 220, billToCompany: 300 },
    { date: "15 Jan 2024", revenue: 800, refunds: 100, billToCompany: 300 },
    { date: "16 Jan 2024", revenue: 700, refunds: 300, billToCompany: 250 },
    { date: "17 Jan 2024", revenue: 600, refunds: 250, billToCompany: 280 },
    { date: "18 Jan 2024", revenue: 850, refunds: 300, billToCompany: 400 },
    { date: "19 Jan 2024", revenue: 750, refunds: 200, billToCompany: 320 },
    { date: "20 Jan 2024", revenue: 900, refunds: 350, billToCompany: 450 },
    { date: "21 Jan 2024", revenue: 650, refunds: 220, billToCompany: 300 },
    { date: "22 Jan 2024", revenue: 800, refunds: 100, billToCompany: 300 },
    { date: "23 Jan 2024", revenue: 700, refunds: 300, billToCompany: 250 },
    { date: "24 Jan 2024", revenue: 600, refunds: 250, billToCompany: 280 },
    { date: "25 Jan 2024", revenue: 850, refunds: 300, billToCompany: 400 },
    { date: "26 Jan 2024", revenue: 750, refunds: 200, billToCompany: 320 },
    { date: "27 Jan 2024", revenue: 900, refunds: 350, billToCompany: 450 },
    { date: "28 Jan 2024", revenue: 650, refunds: 220, billToCompany: 300 },
    { date: "29 Jan 2024", revenue: 750, refunds: 200, billToCompany: 320 },
    { date: "30 Jan 2024", revenue: 900, refunds: 350, billToCompany: 450 },
    { date: "31 Jan 2024", revenue: 650, refunds: 220, billToCompany: 300 },
  ];

  const [data, setData] = useState(sampleData);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const [totalBillToCompany, setTotalBillToCompany] = useState(0);

  useEffect(() => {
    const revenue = data.reduce((sum, day) => sum + day.revenue, 0);
    const refunds = data.reduce((sum, day) => sum + day.refunds, 0);
    const billToCompany = data.reduce((sum, day) => sum + day.billToCompany, 0);
    setTotalRevenue(revenue);
    setTotalRefunds(refunds);
    setTotalBillToCompany(billToCompany);
  }, [data]);

  return (
    <Card
      sx={{
        bgcolor: "#fff",
        color: "white",
        maxWidth: 1200,
        margin: "auto",
        p: 2,
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ color: "#000" }}>
            Financial Statistics
          </Typography>
          <Typography variant="body2" sx={{ color: "#000" }}>
            Monthly received, refunds, and bill to company overview
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ color: "#2196f3" }}>
              ₹{totalRevenue.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgb(148, 163, 184)" }}>
              Revenue
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ color: "#f44336" }}>
              ₹{totalRefunds.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgb(148, 163, 184)" }}>
              Refunds
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ color: "#ffa726" }}>
              ₹{totalBillToCompany.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgb(148, 163, 184)" }}>
              Bill to Company
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent>
        <LineChart
          height={350}
          series={[
            {
              data: data.map((item) => item.revenue),
              label: "Revenue",
              color: "#00FF00",
              curve: "natural",
            },
            {
              data: data.map((item) => item.refunds),
              label: "Refunds",
              color: "#f44336",
              curve: "natural",
            },
            {
              data: data.map((item) => item.billToCompany),
              label: "Bill to Company",
              color: "#ffa726",
              curve: "natural",
            },
          ]}
          xAxis={[
            {
              data: data.map((item) => item.date),
              scaleType: "point",
              valueFormatter: (value) => value, // Display dates as is
            },
          ]}
          sx={{
            ".MuiLineElement-root": {
              strokeWidth: 2,
            },
            ".MuiChartsLegend-root": {
              color: "white",
            },
            ".MuiChartsAxis-tick": {
              color: "rgb(148, 163, 184)",
            },
            ".MuiChartsAxis-line": {
              stroke: "rgb(148, 163, 184)",
            },
            ".MuiChartsAxis-label": {
              fill: "rgb(148, 163, 184)",
            },
          }}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 0,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DashboardPriceGraph;
