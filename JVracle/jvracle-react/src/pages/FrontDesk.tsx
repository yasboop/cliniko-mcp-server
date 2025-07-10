import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Avatar,
  Divider,
  Stack,
  Tabs,
  Tab,
  Badge,
  Alert,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Login,
  Logout,
  Edit,
  Print,
  Phone,
  Email,
  PersonAdd,
  CheckCircle,
  VpnKey,
  CreditCard,
  Receipt,
  Notifications,
  AccessTime,
  LocationOn,
  Star,
  Warning,
  Refresh,
  Event,
  FlightLand,
  FlightTakeoff,
  Luggage
} from '@mui/icons-material';
import FolioViewer from '../components/frontdesk/FolioViewer';
import { MOCK_RESERVATIONS, MOCK_GUESTS, MOCK_ROOMS, Reservation, Guest, Room } from '../data/mockData';
import { isToday, format } from 'date-fns';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const FrontDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [checkInDialog, setCheckInDialog] = useState(false);
  const [isFolioViewerOpen, setFolioViewerOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Reservation | null>(null);

  const todayArrivals: Reservation[] = MOCK_RESERVATIONS.filter(
    (res: Reservation) => res.status === 'confirmed' && isToday(new Date(res.checkInDate))
  );

  const inHouseGuests: Reservation[] = MOCK_RESERVATIONS.filter(
    (res: Reservation) => res.status === 'checked-in'
  );

  const departureList: Reservation[] = MOCK_RESERVATIONS.filter(
    (res: Reservation) => res.status === 'checked-in' && isToday(new Date(res.checkOutDate))
  );


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCheckIn = (reservation: Reservation) => {
    // For now, just log to console, later will implement logic
    console.log('Checking in:', reservation);
    setSelectedGuest(reservation);
    setCheckInDialog(true);
  };

  const handleOpenFolio = (reservation: Reservation) => {
    setSelectedGuest(reservation);
    setFolioViewerOpen(true);
  };

  const handleCloseFolio = () => {
    setFolioViewerOpen(false);
    setSelectedGuest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'success';
      case 'cleaning': return 'warning';
      case 'checked-out': return 'info';
      case 'pending-payment': return 'error';
      case 'in-house': return 'primary';
      case 'late-checkout': return 'warning';
      case 'pending-checkout': return 'warning';
      default: return 'default';
    }
  };

  const getVipColor = (tier: string) => {
    switch (tier) {
      case 'Diamond': return '#b19cd9';
      case 'Platinum': return '#e5e4e2';
      case 'Gold': return '#ffd700';
      case 'Silver': return '#c0c0c0';
      default: return '#ffffff';
    }
  };

  // Helper to get guest details
  const getGuestDetails = (guestId: string): Guest | undefined => {
    return MOCK_GUESTS.find((g: Guest) => g.id === guestId);
  }

  // Helper to get room details
  const getRoomDetails = (roomId: string): Room | undefined => {
    return MOCK_ROOMS.find((r: Room) => r.id === roomId);
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary">
            Front Desk Operations Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enterprise-grade check-in/check-out management • Real-time guest services
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<PersonAdd />} size="large">
            Walk-in Registration
          </Button>
          <Button variant="outlined" startIcon={<Refresh />} size="large">
            Refresh All
          </Button>
          <Button variant="contained" startIcon={<CheckCircle />} size="large">
            Express Check-in
          </Button>
        </Stack>
      </Box>

      {/* Real-time Operations Dashboard */}
      <Card sx={{ mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Stack direction="row" spacing={4} alignItems="center">
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700}>
                {todayArrivals.length}
              </Typography>
              <Typography variant="body2">Ready for Check-in</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700}>
                {inHouseGuests.length}
              </Typography>
              <Typography variant="body2">In-House Guests</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700}>
                {departureList.length}
              </Typography>
              <Typography variant="body2">Pending Departures</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={700} color="warning.light">
                {todayArrivals.map((r: Reservation) => getGuestDetails(r.guestId)).filter((g: Guest | undefined) => g && g.loyaltyTier !== 'None').length}
              </Typography>
              <Typography variant="body2">VIP Arrivals Today</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
            <Tab 
              icon={<Login />} 
              label={`Arrivals (${todayArrivals.length})`} 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
            <Tab 
              icon={<VpnKey />} 
              label={`In-House (${inHouseGuests.length})`}
              iconPosition="start" 
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
            <Tab 
              icon={<Logout />} 
              label={`Departures (${departureList.length})`}
              iconPosition="start" 
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
          </Tabs>
        </Box>

        {/* Arrivals Tab */}
        <TabPanel value={activeTab} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Guest Information</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Room Assignment</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Status & VIP</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Financial</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todayArrivals.map((reservation) => {
                  const guest = getGuestDetails(reservation.guestId);
                  const room = getRoomDetails(reservation.roomId || '');
                  return (
                  <TableRow key={reservation.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar 
                          sx={{ 
                            bgcolor: getVipColor(guest?.loyaltyTier || 'None'), 
                            color: 'black',
                            width: 48,
                            height: 48,
                            fontWeight: 600
                          }}
                        >
                          {guest ? `${guest.firstName[0]}${guest.lastName[0]}` : 'G'}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {guest ? `${guest.firstName} ${guest.lastName}`: 'Guest Not Found'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Conf: {reservation.confirmationNumber} • {`${(new Date(reservation.checkOutDate).getTime() - new Date(reservation.checkInDate).getTime()) / (1000 * 3600 * 24)} nights`}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption">
                              Arrival: {format(new Date(reservation.checkInDate), 'p')}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600} color="primary">
                        Room {room?.number || 'TBA'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {reservation.roomTypeId}
                      </Typography>
                      {reservation.specialRequests && reservation.specialRequests.length > 0 && (
                        <Alert severity="info" sx={{ mt: 1, p: 1 }}>
                          <Typography variant="caption">
                            {reservation.specialRequests.join(', ')}
                          </Typography>
                        </Alert>
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        <Chip 
                          label={room?.status === 'vacant-clean' ? 'Ready for Check-in' : 'Room Not Ready'} 
                          color={room?.status === 'vacant-clean' ? 'success' : 'warning'}
                          variant="filled"
                        />
                        {guest && guest.loyaltyTier !== 'None' && (
                          <Chip 
                            label={`${guest.loyaltyTier} Member`} 
                            sx={{ 
                              bgcolor: getVipColor(guest.loyaltyTier),
                              color: 'black',
                              fontWeight: 600
                            }}
                            icon={<Star />}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600} color="success.main">
                        ${reservation.totalAmount.toLocaleString()}
                      </Typography>
                      <Chip 
                        label={reservation.paymentStatus === 'paid' ? 'Paid in Full' : 'Pre-authorized'} 
                        color={reservation.paymentStatus === 'paid' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton color="primary" title="Call Guest">
                          <Phone />
                        </IconButton>
                        <IconButton color="primary" title="Email Guest">
                          <Email />
                        </IconButton>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleCheckIn(reservation)}
                          disabled={room?.status !== 'vacant-clean'}
                          startIcon={<CheckCircle />}
                          sx={{ minWidth: 120 }}
                        >
                          {room?.status === 'vacant-clean' ? 'Check In' : 'Room Not Ready'}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* In-House Tab */}
        <TabPanel value={activeTab} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Guest & Room</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Stay Details</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Account Status</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Special Requests</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inHouseGuests.map((reservation) => {
                  const guest = getGuestDetails(reservation.guestId);
                  const room = getRoomDetails(reservation.roomId || '');
                  return (
                  <TableRow key={reservation.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: getVipColor(guest?.loyaltyTier || 'None'), color: 'black' }}>
                          {guest ? `${guest.firstName[0]}${guest.lastName[0]}`: 'G'}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {guest ? `${guest.firstName} ${guest.lastName}`: 'Guest Not Found'}
                          </Typography>
                          <Typography variant="body1" color="primary" fontWeight={600}>
                            Room {room?.number || 'N/A'}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Check-in: {format(new Date(reservation.checkInDate), 'PP')}
                      </Typography>
                      <Typography variant="body2">
                        Check-out: {format(new Date(reservation.checkOutDate), 'PP')}
                      </Typography>
                      <Chip 
                        label={isToday(new Date(reservation.checkOutDate)) ? 'Departing Today' : 'In-House'} 
                        color={isToday(new Date(reservation.checkOutDate)) ? 'warning' : 'primary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600}>
                        ${reservation.totalAmount.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Folio Balance
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {reservation.specialRequests && reservation.specialRequests.length > 0 ? (
                        <Alert severity="info" sx={{ p: 1 }}>
                          {reservation.specialRequests.join(', ')}
                        </Alert>
                      ) : (
                        <Typography variant="body2" color="text.secondary">None</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small" onClick={() => handleOpenFolio(reservation)}>View Folio</Button>
                        <Button variant="outlined" size="small">Post Charge</Button>
                        <IconButton title="Edit Reservation"><Edit /></IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Departures Tab */}
        <TabPanel value={activeTab} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight={600}>Guest & Room</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Checkout Status</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Folio Balance</Typography></TableCell>
                  <TableCell><Typography fontWeight={600}>Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departureList.map((reservation) => {
                  const guest = getGuestDetails(reservation.guestId);
                  const room = getRoomDetails(reservation.roomId || '');
                  return (
                    <TableRow key={reservation.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: getVipColor(guest?.loyaltyTier || 'None'), color: 'black' }}>
                          {guest ? `${guest.firstName[0]}${guest.lastName[0]}`: 'G'}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>{guest ? `${guest.firstName} ${guest.lastName}`: 'Guest Not Found'}</Typography>
                          <Typography variant="body1" color="primary" fontWeight={600}>
                            Room {room?.number || 'N/A'}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip label="Pending Checkout" color="warning" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600} color={reservation.totalAmount > 0 ? 'error.main' : 'success.main'}>
                        ${reservation.totalAmount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button variant="contained" color="primary" size="small">
                          Settle & Checkout
                        </Button>
                        <Button variant="outlined" size="small" onClick={() => handleOpenFolio(reservation)}>
                          View Folio
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Card>

      {/* Check-in Dialog */}
      <Dialog open={checkInDialog} onClose={() => setCheckInDialog(false)}>
        <DialogTitle>Confirm Check-in</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to check in {selectedGuest && getGuestDetails(selectedGuest.guestId)?.firstName}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckInDialog(false)}>Cancel</Button>
          <Button onClick={() => setCheckInDialog(false)} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Folio Viewer Dialog */}
      {selectedGuest && (
        <FolioViewer 
          open={isFolioViewerOpen} 
          onClose={handleCloseFolio} 
          reservation={selectedGuest} 
        />
      )}
    </Box>
  );
};

export default FrontDesk; 