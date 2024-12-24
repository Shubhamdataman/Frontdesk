import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography, CircularProgress } from "@mui/material";

export default function FloorStatus() {
  const [floorData, setFloorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFloorStatus = async () => {
      try {
        const response = await fetch("http://192.168.6.13:3030/api/dashboard/floorWiseStatus");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setFloorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFloorStatus();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "lg", margin: "auto", padding: 3 }}>
      <Grid container spacing={4}>
        {floorData.map((floor) => {
          const total = floor.occupied + floor.guestInRoom + floor.clean + floor.dirty + floor.outOfOrder;

          return (
            <Grid item xs={12} sm={6} md={4} key={floor.floorName}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {floor.floorName}
                  </Typography>
                  <Box sx={{ display: "flex", height: 40, borderRadius: 1, overflow: "hidden" }}>
                    {/* Occupied */}
                    {floor.occupied > 0 && (
                      <Box
                        sx={{
                          width: `${(floor.occupied / total) * 100}%`,
                          backgroundColor: "#FFC107",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {floor.occupied}
                      </Box>
                    )}

                    {/* Guest In Room */}
                    {floor.guestInRoom > 0 && (
                      <Box
                        sx={{
                          width: `${(floor.guestInRoom / total) * 100}%`,
                          backgroundColor: "purple",
                          display: "flex",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "white", marginLeft: 1 }}>
                          {floor.guestInRoom}
                        </Typography>
                      </Box>
                    )}

                    {/* Clean */}
                    {floor.clean > 0 && (
                      <Box
                        sx={{
                          width: `${(floor.clean / total) * 100}%`,
                          backgroundColor: "green",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {floor.clean}
                      </Box>
                    )}

                    {/* Dirty */}
                    {floor.dirty > 0 && (
                      <Box
                        sx={{
                          width: `${(floor.dirty / total) * 100}%`,
                          backgroundColor: "red",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {floor.dirty}
                      </Box>
                    )}

                    {/* Out of Order */}
                    {floor.outOfOrder > 0 && (
                      <Box
                        sx={{
                          width: `${(floor.outOfOrder / total) * 100}%`,
                          backgroundColor: "#87CEEB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {floor.outOfOrder}
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Legend
      <Box sx={{ marginTop: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: 16, height: 16, backgroundColor: "#FFC107", borderRadius: "50%" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Occupied
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: 16, height: 16, backgroundColor: "purple", borderRadius: "50%" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Guest In Room
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: 16, height: 16, backgroundColor: "green", borderRadius: "50%" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Available
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: 16, height: 16, backgroundColor: "red", borderRadius: "50%" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Dirty
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ width: 16, height: 16, backgroundColor: "#87CEEB", borderRadius: "50%" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Out of Order
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
}
