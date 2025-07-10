import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';
import {
  Star,
  Phone,
  Email,
  LocationOn,
  Edit,
  Add,
  Search,
  FilterList,
  Visibility,
  VpnKey,
  Refresh,
  Download,
  Print,
} from '@mui/icons-material';
import { MOCK_GUESTS, MOCK_RESERVATIONS, Guest } from '../data/mockData';

const GuestProfiles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [guestDialog, setGuestDialog] = useState(false);
  const [filterTier, setFilterTier] = useState('all');

  const filteredGuests = useMemo(() => {
    return MOCK_GUESTS.filter(guest => {
      const matchesSearch = guest.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guest.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guest.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTier = filterTier === 'all' || guest.loyaltyTier === filterTier;
      return matchesSearch && matchesTier;
    });
  }, [searchQuery, filterTier]);

  const guestReservations = selectedGuest ? 
    MOCK_RESERVATIONS.filter(r => r.guestId === selectedGuest.id) : [];

  const handleViewGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setGuestDialog(true);
  };

  const getLoyaltyColor = (tier: string) => {
    switch (tier) {
      case 'Diamond': return '#b19cd9';
      case 'Platinum': return '#e5e4e2';
      case 'Gold': return '#ffd700';
      case 'Silver': return '#c0c0c0';
      default: return '#ffffff';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} sx={{ 
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Guest Profile Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive guest database • CRM • Loyalty management
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<Download />} size="large">
            Export Guests
          </Button>
          <Button variant="outlined" startIcon={<FilterList />} size="large">
            Advanced Filters
          </Button>
          <Button variant="contained" startIcon={<Add />} size="large">
            New Guest Profile
          </Button>
        </Stack>
      </Stack>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Loyalty Tier</InputLabel>
            <Select
              value={filterTier}
              label="Loyalty Tier"
              onChange={(e) => setFilterTier(e.target.value)}
            >
              <MenuItem value="all">All Tiers</MenuItem>
              <MenuItem value="Diamond">Diamond</MenuItem>
              <MenuItem value="Platinum">Platinum</MenuItem>
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Silver">Silver</MenuItem>
              <MenuItem value="None">Standard</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Refresh />} size="small">
            Refresh
          </Button>
        </Stack>
      </Paper>

      {/* Guest List */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Guest Database ({filteredGuests.length} profiles)
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Guest Profile</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Contact Information</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Loyalty Status</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Stay History</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGuests.map((guest: Guest) => (
                  <TableRow key={guest.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar 
                          sx={{ 
                            bgcolor: getLoyaltyColor(guest.loyaltyTier), 
                            color: 'black',
                            width: 48,
                            height: 48,
                            fontWeight: 600
                          }}
                        >
                          {guest.firstName[0]}{guest.lastName[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {guest.title} {guest.firstName} {guest.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Profile #{guest.profileNumber}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{guest.email}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{guest.phone}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {guest.address.city}, {guest.address.country}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1} alignItems="flex-start">
                        <Chip 
                          label={guest.loyaltyTier} 
                          sx={{ 
                            bgcolor: getLoyaltyColor(guest.loyaltyTier),
                            color: 'black',
                            fontWeight: 600
                          }}
                          icon={<Star />}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {guest.loyaltyPoints.toLocaleString()} points
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={600}>
                          {guest.stayHistory.totalStays} stays
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${guest.stayHistory.totalSpent.toLocaleString()} total
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Last: {guest.stayHistory.lastStay.toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" color="primary" onClick={() => handleViewGuest(guest)}>
                          <Visibility />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <VpnKey />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Guest Detail Dialog */}
      <Dialog open={guestDialog} onClose={() => setGuestDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Guest Profile Details
            </Typography>
            <IconButton onClick={() => setGuestDialog(false)}>
              <Edit />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedGuest && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Personal & Loyalty Info */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {/* Personal Information */}
                <Box sx={{ flex: 1, minWidth: 300 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Personal Information
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar 
                        sx={{ 
                          bgcolor: getLoyaltyColor(selectedGuest.loyaltyTier), 
                          color: 'black',
                          width: 64,
                          height: 64,
                          fontSize: '1.5rem'
                        }}
                      >
                        {selectedGuest.firstName[0]}{selectedGuest.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight={600}>
                          {selectedGuest.title} {selectedGuest.firstName} {selectedGuest.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Profile #{selectedGuest.profileNumber}
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Divider />
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{selectedGuest.email}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">{selectedGuest.phone}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Address</Typography>
                      <Typography variant="body1">
                        {selectedGuest.address.street}<br />
                        {selectedGuest.address.city}, {selectedGuest.address.state}<br />
                        {selectedGuest.address.country} {selectedGuest.address.postalCode}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Nationality</Typography>
                      <Typography variant="body1">{selectedGuest.nationality}</Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Loyalty & Preferences */}
                <Box sx={{ flex: 1, minWidth: 300 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Loyalty & Preferences
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Loyalty Status</Typography>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
                        <Chip 
                          label={selectedGuest.loyaltyTier} 
                          sx={{ 
                            bgcolor: getLoyaltyColor(selectedGuest.loyaltyTier),
                            color: 'black',
                            fontWeight: 600
                          }}
                          icon={<Star />}
                        />
                        <Typography variant="body2">
                          {selectedGuest.loyaltyPoints.toLocaleString()} points
                        </Typography>
                      </Stack>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">Room Preferences</Typography>
                      <Typography variant="body1">
                        {selectedGuest.preferences.roomType} • {selectedGuest.preferences.floor} • {selectedGuest.preferences.bedType}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">Special Requests</Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.5 }}>
                        {selectedGuest.preferences.specialRequests.map((request, index) => (
                          <Chip key={index} label={request} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>

                    {selectedGuest.vipNotes.length > 0 && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">VIP Notes</Typography>
                        {selectedGuest.vipNotes.map((note, index) => (
                          <Alert key={index} severity="info" sx={{ mt: 0.5 }}>
                            {note}
                          </Alert>
                        ))}
                      </Box>
                    )}
                  </Stack>
                </Box>
              </Box>

              {/* Stay History & Stats */}
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Stay History & Statistics
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 150 }}>
                    <CardContent>
                      <Typography variant="h4" fontWeight={600} color="primary">
                        {selectedGuest.stayHistory.totalStays}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Stays
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 150 }}>
                    <CardContent>
                      <Typography variant="h4" fontWeight={600} color="success.main">
                        ${selectedGuest.stayHistory.totalSpent.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Spent
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 150 }}>
                    <CardContent>
                      <Typography variant="h4" fontWeight={600} color="info.main">
                        ${selectedGuest.stayHistory.averageRate.toFixed(0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Rate
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ flex: 1, minWidth: 150 }}>
                    <CardContent>
                      <Typography variant="h4" fontWeight={600} color="warning.main">
                        {selectedGuest.stayHistory.lastStay.toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last Stay
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {/* Recent Reservations */}
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                  Recent Reservations
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Confirmation</TableCell>
                        <TableCell>Dates</TableCell>
                        <TableCell>Room Type</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {guestReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.confirmationNumber}</TableCell>
                          <TableCell>
                            {new Date(reservation.checkInDate).toLocaleDateString()} - {new Date(reservation.checkOutDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{reservation.roomTypeId}</TableCell>
                          <TableCell>${reservation.rateAmount}</TableCell>
                          <TableCell>
                            <Chip 
                              label={reservation.status} 
                              size="small" 
                              color={
                                reservation.status === 'confirmed' ? 'success' :
                                reservation.status === 'checked-in' ? 'info' :
                                reservation.status === 'checked-out' ? 'default' :
                                'warning'
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGuestDialog(false)}>Close</Button>
          <Button variant="outlined" startIcon={<Print />}>Print Profile</Button>
          <Button variant="contained" startIcon={<Edit />}>Edit Profile</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuestProfiles; 