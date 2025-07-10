import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Stack,
  Alert,
  LinearProgress,
  Tooltip,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Hotel as HotelIcon,
  People as PeopleIcon,
  CleaningServices as CleaningIcon,
  Settings as SettingsIcon,
  AttachMoney as MoneyIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { MOCK_ROOMS, MOCK_GUESTS, Room, Guest } from '../data/mockData';


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
      id={`room-tabpanel-${index}`}
      aria-labelledby={`room-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RoomManagement: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedTab, setSelectedTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [floorFilter, setFloorFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setRoomDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'primary';
      case 'vacant-clean': return 'success';
      case 'vacant-dirty': return 'warning';
      case 'out-of-order': return 'error';
      case 'maintenance': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'occupied': return <PeopleIcon />;
      case 'vacant-clean': return <CheckCircleIcon />;
      case 'vacant-dirty': return <WarningIcon />;
      case 'out-of-order': return <ErrorIcon />;
      case 'maintenance': return <SettingsIcon />;
      default: return <HotelIcon />;
    }
  };

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      const guest = room.currentGuestId ? MOCK_GUESTS.find(g => g.id === room.currentGuestId) : null;
      const guestName = guest ? `${guest.firstName} ${guest.lastName}` : '';

      const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
      const matchesFloor = floorFilter === 'all' || room.floor.toString() === floorFilter;
      const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (room.roomTypeId && room.roomTypeId.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           guestName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesFloor && matchesSearch;
    });
  }, [statusFilter, floorFilter, searchTerm]);

  const refreshRooms = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight={600} sx={{ 
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Room Management Center
          </Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Refresh Data">
              <IconButton onClick={refreshRooms} disabled={isLoading}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <FormControlLabel
              control={
                <Switch
                  checked={viewMode === 'grid'}
                  onChange={(e) => setViewMode(e.target.checked ? 'grid' : 'table')}
                />
              }
              label={viewMode === 'grid' ? <GridViewIcon /> : <ViewListIcon />}
            />
          </Stack>
        </Stack>

        {isLoading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Search rooms, guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
              sx={{ minWidth: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="occupied">Occupied</MenuItem>
                <MenuItem value="vacant-clean">Vacant Clean</MenuItem>
                <MenuItem value="vacant-dirty">Vacant Dirty</MenuItem>
                <MenuItem value="out-of-order">Out of Order</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Floor</InputLabel>
              <Select
                value={floorFilter}
                label="Floor"
                onChange={(e) => setFloorFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {/* Dynamically generate floor numbers */}
                {[...Array(15).keys()].map(i => (
                  <MenuItem key={i + 1} value={i + 1}>Floor {i + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Summary Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, mb: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h4" fontWeight={600}>
                    {MOCK_ROOMS.length}
                  </Typography>
                  <Typography color="white" variant="body2">Total Rooms</Typography>
                </Box>
                <HotelIcon sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h4" fontWeight={600}>
                    {MOCK_ROOMS.filter(r => r.status === 'occupied').length}
                  </Typography>
                  <Typography color="white" variant="body2">Occupied</Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h4" fontWeight={600}>
                    {MOCK_ROOMS.filter(r => r.status === 'vacant-clean').length}
                  </Typography>
                  <Typography color="white" variant="body2">Ready to Sell</Typography>
                </Box>
                <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h4" fontWeight={600}>
                    {Math.round((MOCK_ROOMS.filter(r => r.status === 'occupied').length / MOCK_ROOMS.length) * 100)}%
                  </Typography>
                  <Typography color="white" variant="body2">Occupancy Rate</Typography>
                </Box>
                <TimelineIcon sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Room Grid/Table */}
      {viewMode === 'grid' ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
          {filteredRooms.map((room) => {
            const guest = room.currentGuestId ? MOCK_GUESTS.find(g => g.id === room.currentGuestId) : null;
            return (
              <Card 
                key={room.id}
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)', 
                    boxShadow: 4,
                  },
                  border: room.status === 'out-of-order' ? 2 : 1,
                  borderColor: room.status === 'out-of-order' ? 'error.main' : 'divider',
                }}
                onClick={() => handleRoomClick(room)}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Room {room.number}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(room.status)}
                      label={room.status.replace('-', ' ').toUpperCase()}
                      color={getStatusColor(room.status)}
                      size="small"
                    />
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {room.roomTypeId} • Floor {room.floor}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MoneyIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body1" fontWeight={600}>
                      {/* Rate would be dynamic */}
                    </Typography>
                  </Box>

                  {guest && (
                    <Box sx={{ mt: 2, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {guest.firstName} {guest.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {guest.loyaltyTier}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={`Housekeeping: ${room.housekeepingStatus}`}
                      color={room.housekeepingStatus === 'clean' || room.housekeepingStatus === 'inspected' ? 'success' : 'warning'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Room Status Table</Typography>
            {/* Table implementation would go here */}
            <Alert severity="info">Table view implementation in progress</Alert>
          </Box>
        </Paper>
      )}

      {/* Room Detail Dialog */}
      <Dialog open={roomDialogOpen} onClose={() => setRoomDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedRoom && (
          <>
            <DialogTitle>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight={600}>
                  Room {selectedRoom.number} Details
                </Typography>
                <Chip
                  icon={getStatusIcon(selectedRoom.status)}
                  label={selectedRoom.status.replace('-', ' ').toUpperCase()}
                  color={getStatusColor(selectedRoom.status)}
                />
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                <Tab label="Overview" />
                <Tab label="Guest Info" />
                <Tab label="Housekeeping" />
                <Tab label="Maintenance" />
              </Tabs>

              <TabPanel value={selectedTab} index={0}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Room Type</Typography>
                      <Typography variant="body1" fontWeight={600}>{selectedRoom.roomTypeId}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Floor</Typography>
                      <Typography variant="body1">{selectedRoom.floor}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Rate</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {/* Rate would be dynamic */}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Features</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {selectedRoom.features.map((feature) => (
                          <Chip key={feature} label={feature} size="small" />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  {selectedRoom.notes && selectedRoom.notes.length > 0 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">Notes</Typography>
                      <Typography variant="body1">{selectedRoom.notes.join(', ')}</Typography>
                    </Box>
                  )}
                </Stack>
              </TabPanel>

              {/* Other TabPanels would go here */}

            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRoomDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default RoomManagement; 