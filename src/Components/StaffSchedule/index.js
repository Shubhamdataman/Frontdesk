import React from 'react';
import { Box, Paper, Typography, Avatar, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Message, Phone } from '@mui/icons-material';

const staffMembers = [
  { name: 'Shubham', status: 'Available', avatar: '/placeholder.svg?height=48&width=48' },
  { name: 'Uttkarsh', status: 'Busy', avatar: '/placeholder.svg?height=48&width=48' },
  { name: 'Mradul', status: 'Available', avatar: '/placeholder.svg?height=48&width=48' },
];

export function StaffSchedule() {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Staff Schedule</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ bgcolor: 'background.paper' }}>
            <ChevronLeft />
          </IconButton>
          <IconButton size="small" sx={{ bgcolor: 'background.paper' }}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>

      {/* Avatar Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        {[1, 2, 3].map((_, i) => (
          <Avatar
            key={i}
            src="/placeholder.svg?height=48&width=48"
            sx={{ width: 48, height: 48 }}
          />
        ))}
      </Box>

      {/* Staff Cards */}
      {staffMembers.map((staff, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            bgcolor: 'background.paper',
            borderRadius: 1,
            mb: 1,
          }}
        >
          <Avatar src={staff.avatar} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">{staff.name}</Typography>
            <Typography
              variant="caption"
              sx={{ color: staff.status === 'Available' ? 'success.main' : 'warning.main' }}
            >
              {staff.status}
            </Typography>
          </Box>
          <IconButton size="small" sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <Message fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <Phone fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Paper>
  );
}
