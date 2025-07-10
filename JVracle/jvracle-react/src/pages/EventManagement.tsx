import React, { useState } from 'react';
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
  Tabs,
  Tab,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Event,
  Restaurant,
  Room,
  Schedule,
  AttachMoney,
  People,
  Add,
  Edit,
  Delete,
  Search,
  Print,
  Visibility,
  Assessment,
} from '@mui/icons-material';
import { MOCK_EVENT_BOOKINGS, MOCK_FUNCTION_SPACES, MOCK_CATERING_MENUS, EventBooking } from '../data/mockData';

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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const EventManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Sample data
  const eventStatistics = {
    totalEvents: MOCK_EVENT_BOOKINGS.length,
    totalRevenue: MOCK_EVENT_BOOKINGS.reduce((sum, event) => sum + event.totalRevenue, 0),
    roomUtilization: 78, // This would be calculated in a real app
    averageEventSize: MOCK_EVENT_BOOKINGS.reduce((sum, event) => sum + event.attendeeCount, 0) / MOCK_EVENT_BOOKINGS.length,
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Tentative':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Event Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Oracle OPERA Event & Catering Management System
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<Add />}>
            New Event
          </Button>
          <Button variant="outlined" startIcon={<Search />}>
            Search Events
          </Button>
        </Stack>
      </Stack>

      {/* Event Statistics */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Total Events
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  {eventStatistics.totalEvents}
                </Typography>
              </Box>
              <Event sx={{ fontSize: 40, color: 'primary.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Event Revenue
                </Typography>
                <Typography variant="h5" fontWeight={600} color="success.main">
                  ${eventStatistics.totalRevenue.toLocaleString()}
                </Typography>
              </Box>
              <AttachMoney sx={{ fontSize: 40, color: 'success.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Room Utilization
                </Typography>
                <Typography variant="h5" fontWeight={600} color="info.main">
                  {eventStatistics.roomUtilization}%
                </Typography>
              </Box>
              <Room sx={{ fontSize: 40, color: 'info.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Avg Event Size
                </Typography>
                <Typography variant="h5" fontWeight={600} color="warning.main">
                  {Math.round(eventStatistics.averageEventSize)}
                </Typography>
              </Box>
              <People sx={{ fontSize: 40, color: 'warning.main' }} />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
            <Tab icon={<Event />} label="Event Bookings" />
            <Tab icon={<Room />} label="Function Spaces" />
            <Tab icon={<Restaurant />} label="Catering Menus" />
            <Tab icon={<Schedule />} label="Event Calendar" />
            <Tab icon={<Assessment />} label="Reports" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          {/* Event Bookings */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Event Bookings Management
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Attendees</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_EVENT_BOOKINGS.map((event: EventBooking) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.eventName}</TableCell>
                      <TableCell>
                        <Chip label={event.eventType} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>{event.clientName}</TableCell>
                      <TableCell>{event.eventDate.toLocaleDateString()}</TableCell>
                      <TableCell>{event.attendeeCount}</TableCell>
                      <TableCell>${event.totalRevenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={event.status}
                          size="small"
                          color={getEventStatusColor(event.status) as any}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                          <IconButton size="small">
                            <Print />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* Function Spaces */}
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Function Spaces & Availability
              </Typography>
              <Button variant="outlined" startIcon={<Add />}>
                Add Function Space
              </Button>
            </Stack>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {MOCK_FUNCTION_SPACES.map((space) => (
                <Card key={space.id}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={600}>
                          {space.name}
                        </Typography>
                        <Chip 
                          label={space.available ? 'Available' : 'Booked'}
                          size="small"
                          color={space.available ? 'success' : 'error'}
                        />
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        {space.type} • ${space.hourlyRate}/hour
                      </Typography>

                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                          Capacity by Setup:
                        </Typography>
                        <Stack direction="row" spacing={3}>
                          <Typography variant="caption">
                            Theater: {space.capacity.theater}
                          </Typography>
                          <Typography variant="caption">
                            Banquet: {space.capacity.banquet}
                          </Typography>
                          <Typography variant="caption">
                            Reception: {space.capacity.reception}
                          </Typography>
                        </Stack>
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small">
                          View Calendar
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small"
                          disabled={!space.available}
                        >
                          Book Space
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* Catering Menus */}
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Catering Menus & Packages
              </Typography>
              <Button variant="outlined" startIcon={<Add />}>
                Create Menu
              </Button>
            </Stack>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {MOCK_CATERING_MENUS.map((menu) => (
                <Card key={menu.id}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={600}>
                          {menu.name}
                        </Typography>
                        <Chip label={menu.category} size="small" color="primary" />
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        {menu.description}
                      </Typography>

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" color="primary.main">
                          ${menu.pricePerPerson}/person
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Min: {menu.minimumGuests} guests
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small">
                          Edit Menu
                        </Button>
                        <Button variant="contained" size="small">
                          Add to Event
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {/* Event Calendar */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Event Calendar & Scheduling
            </Typography>

            <Alert severity="info">
              Calendar view showing all events, room bookings, and setup schedules. 
              Integration with Oracle OPERA Room Management system.
            </Alert>

            <Paper sx={{ p: 3, minHeight: 400 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Calendar View - {new Date().toLocaleDateString()}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 10 }}>
                Interactive calendar component showing events, room availability, and scheduling conflicts
              </Typography>
            </Paper>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          {/* Reports */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Event & Catering Reports
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Card sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Standard Reports
                  </Typography>
                  <Stack spacing={2}>
                    <Button variant="outlined" fullWidth startIcon={<Assessment />}>
                      Event Listing
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Assessment />}>
                      Catering Analysis
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Assessment />}>
                      Function Space Utilization
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Assessment />}>
                      Revenue by Event Type
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Custom Reports
                  </Typography>
                  <Stack spacing={2}>
                    <Button variant="outlined" fullWidth startIcon={<Add />}>
                      Create New Report
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Edit />}>
                      Edit Saved Report
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default EventManagement; 