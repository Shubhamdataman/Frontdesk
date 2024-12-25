import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const DashboardPriceGraph = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const [totalBillToCompany, setTotalBillToCompany] = useState(0);
  const [month, setMonth] = useState("");

  // Fetch financial data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.6.13:3030/api/dashboard/financialAmount"
        );
        const result = await response.json();

        // Format the data
        const formattedData = result.map((item) => ({
          date: item.day,
          revenue: item.recAmt,
          refunds: item.refundAmt,
          billToCompany: item.billToComp,
        }));

        setData(formattedData);

        // Calculate totals
        const totalRevenue = formattedData.reduce(
          (sum, day) => sum + day.revenue,
          0
        );
        const totalRefunds = formattedData.reduce(
          (sum, day) => sum + day.refunds,
          0
        );
        const totalBillToCompany = formattedData.reduce(
          (sum, day) => sum + day.billToCompany,
          0
        );

        setTotalRevenue(totalRevenue);
        setTotalRefunds(totalRefunds);
        setTotalBillToCompany(totalBillToCompany);

        if (formattedData.length > 0) {
          const firstDate = new Date(formattedData[0].date);
          console.log("firstDate", firstDate);
          const monthName = firstDate.toLocaleString("default", {
            month: "long",
          });
          setMonth(monthName);
        }
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("graph Record", data);
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
            Financial Statistics for{" "}
            <span style={{ fontWeight: "bold", color: "brown" }}>{month}</span>
          </Typography>
          <Typography variant="body2" sx={{ color: "#000" }}>
            Monthly received, refunds, and bill to company overview
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ color: "#00FF00" }}>
              ₹{totalRevenue.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgb(148, 163, 184)" }}>
              Received
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
              label: "Received",
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
              data: data.map((_, index) => index + 1), // Sequential numbers: 1, 2, 3, ...
              scaleType: "point",
              valueFormatter: (value) => value.toString(),
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
