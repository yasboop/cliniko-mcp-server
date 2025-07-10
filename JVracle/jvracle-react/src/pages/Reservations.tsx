import React from 'react';
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
  Stack,
  Tabs,
  Tab,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Tooltip,
  Badge,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Switch,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion
} from '@mui/material';
import {
  Add,
  Search,
  CalendarToday,
  Person,
  Hotel,
  AttachMoney,
  Edit,
  Delete,
  Print,
  Email,
  Phone,
  Star,
  Warning,
  CheckCircle,
  Schedule,
  Group,
  CreditCard,
  Flight,
  Restaurant,
  LocalParking,
  Wifi,
  FitnessCenter,
  Pool,
  Spa,
  Business,
  ExpandMore,
  TrendingUp,
  Analytics,
  Refresh,
  FilterList,
  Download,
  Upload,
  Visibility,
  Block,
  VerifiedUser,
  LocationOn,
  Event,
  AccessTime,
  MonetizationOn
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MOCK_RESERVATIONS, Reservation, MOCK_GUESTS, Guest } from '../data/mockData';
import { format } from 'date-fns';


function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reservations-tabpanel-${index}`}
      aria-labelledby={`reservations-tab-${index}`}
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

function Reservations() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [filterSource, setFilterSource] = React.useState('all');
  const [newReservationDialog, setNewReservationDialog] = React.useState(false);
  const [selectedDateRange, setSelectedDateRange] = React.useState<[Date | null, Date | null]>([null, null]);
  const [selectedReservation, setSelectedReservation] = React.useState<Reservation | null>(null);
  const [viewDetailsDialog, setViewDetailsDialog] = React.useState(false);

  // Helper to get guest details
  const getGuestDetails = (guestId: string) => {
    return MOCK_GUESTS.find((g) => g.id === guestId);
  }

  const handleTabChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setViewDetailsDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'no-show': return 'error';
      case 'checked-in': return 'info';
      case 'checked-out': return 'default';
      default: return 'default';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'authorized': return 'info';
      case 'pending': return 'warning';
      case 'refunded': return 'error';
      default: return 'default';
    }
  };

  const filteredReservations = React.useMemo(() => {
    return MOCK_RESERVATIONS.filter((reservation) => {
      const guest = getGuestDetails(reservation.guestId);
      const guestName = guest ? `${guest.firstName} ${guest.lastName}` : '';

      const matchesSearch = guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reservation.confirmationNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
      const matchesSource = filterSource === 'all' || reservation.source === filterSource;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [searchQuery, filterStatus, filterSource, getGuestDetails]);

  const reservationStats = React.useMemo(() => {
    const totalReservations = MOCK_RESERVATIONS.length;
    const confirmedReservations = MOCK_RESERVATIONS.filter((r) => r.status === 'confirmed').length;
    const checkedInReservations = MOCK_RESERVATIONS.filter((r) => r.status === 'checked-in').length;
    const totalRevenue = MOCK_RESERVATIONS.reduce((sum, r) => sum + r.totalAmount, 0);
    const avgRate = totalRevenue / totalReservations;

    return { total: totalReservations, confirmed: confirmedReservations, checkedIn: checkedInReservations, totalRevenue, avgRate };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h4" fontWeight={600} sx={{ 
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Enterprise Reservations Management
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<Analytics />} size="large">
                Revenue Analytics
              </Button>
              <Button variant="outlined" startIcon={<Download />} size="large">
                Export Data
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Add />} 
                size="large"
                onClick={() => setNewReservationDialog(true)}
              >
                New Reservation
              </Button>
            </Stack>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Advanced booking system with real-time availability and dynamic pricing
          </Typography>
        </Box>

        {/* Real-time Dashboard */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, mb: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {reservationStats.total}
                  </Typography>
                  <Typography color="white" variant="body2">Total Reservations</Typography>
                </Box>
                <CalendarToday sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {reservationStats.confirmed}
                  </Typography>
                  <Typography color="white" variant="body2">Confirmed</Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {reservationStats.checkedIn}
                  </Typography>
                  <Typography color="white" variant="body2">In-House</Typography>
                </Box>
                <Hotel sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    ${reservationStats.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography color="white" variant="body2">Total Revenue</Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    ${reservationStats.avgRate.toFixed(0)}
                  </Typography>
                  <Typography color="white" variant="body2">Average Daily Rate</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Search and Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Autocomplete
              freeSolo
              options={MOCK_GUESTS.map((option) => option.firstName)}
              renderInput={(params) => <TextField {...params} label="Search Guests & Reservations" />}
              sx={{ minWidth: 300 }}
              onInputChange={(event, newInputValue) => {
                setSearchQuery(newInputValue || '');
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="checked-in">Checked In</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Source</InputLabel>
              <Select
                value={filterSource}
                label="Source"
                onChange={(e) => setFilterSource(e.target.value)}
              >
                <MenuItem value="all">All Sources</MenuItem>
                <MenuItem value="Direct Website">Direct Website</MenuItem>
                <MenuItem value="Booking.com">Booking.com</MenuItem>
                <MenuItem value="Expedia">Expedia</MenuItem>
                <MenuItem value="Corporate Portal">Corporate Portal</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<FilterList />} size="small">
                Advanced Filters
              </Button>
              <Button variant="outlined" startIcon={<Refresh />} size="small">
                Refresh
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Main Reservations Table */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
              <Tab 
                icon={<CalendarToday />} 
                label="All Reservations" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Schedule />} 
                label="Arrivals Today" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Group />} 
                label="Group Bookings" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Analytics />} 
                label="Revenue Analysis" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography fontWeight={600}>Guest & Confirmation</Typography></TableCell>
                    <TableCell><Typography fontWeight={600}>Stay Details</Typography></TableCell>
                    <TableCell><Typography fontWeight={600}>Room & Rate</Typography></TableCell>
                    <TableCell><Typography fontWeight={600}>Status & Payment</Typography></TableCell>
                    <TableCell><Typography fontWeight={600}>Source & VIP</Typography></TableCell>
                    <TableCell><Typography fontWeight={600}>Actions</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredReservations.map((reservation) => {
                    const guest = getGuestDetails(reservation.guestId);
                    return (
                    <TableRow key={reservation.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell>
                        <Stack spacing={1}>
                          <Typography variant="h6" fontWeight={600}>
                            {guest ? `${guest.firstName} ${guest.lastName}` : 'Guest Not Found'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {reservation.confirmationNumber}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          Check-in: {format(new Date(reservation.checkInDate), 'PP')}
                        </Typography>
                        <Typography variant="body2">
                          Check-out: {format(new Date(reservation.checkOutDate), 'PP')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{reservation.roomTypeId}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${reservation.rateAmount.toFixed(2)}/night
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={reservation.status}
                          color={getStatusColor(reservation.status)}
                          size="small"
                        />
                        <Chip
                          label={reservation.paymentStatus}
                          color={getPaymentColor(reservation.paymentStatus)}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{reservation.source}</Typography>
                        {guest && guest.loyaltyTier !== 'None' && (
                           <Chip icon={<Star />} label={guest.loyaltyTier} size="small" color="warning"/>
                        )}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="View Details">
                            <IconButton size="small" onClick={() => handleViewDetails(reservation)}>
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton size="small" color="error">
                              <Block />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Card>

        {/* Add New Reservation Dialog */}
        <Dialog open={newReservationDialog} onClose={() => setNewReservationDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Create New Reservation</DialogTitle>
          <DialogContent>
            {/* Add form fields for new reservation here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewReservationDialog(false)}>Cancel</Button>
            <Button variant="contained">Create Reservation</Button>
          </DialogActions>
        </Dialog>

        {/* View Reservation Details Dialog */}
        <Dialog open={viewDetailsDialog} onClose={() => setViewDetailsDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Reservation Details - {selectedReservation?.confirmationNumber}</DialogTitle>
          <DialogContent>
            {selectedReservation && (
              <Box>
                <Typography>Guest: {getGuestDetails(selectedReservation.guestId)?.firstName}</Typography>
                {/* Add more details here */}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDetailsDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Reservations; 