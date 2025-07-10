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
  Badge,
  Avatar,
  Divider,
  Tooltip,
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  Menu,
  MenuList,
  MenuItem as MenuItemComponent,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ViewModule,
  Person,
  Hotel,
  CleaningServices,
  Build,
  Warning,
  CheckCircle,
  Refresh,
  SwapHoriz,
  Edit,
  Visibility,
  Phone,
  Email,
  Star,
  Schedule,
  LocationOn,
  Search,
  FilterList,
  Settings,
  Assignment,
  Business,
  Group,
  VpnKey,
  FlightLand,
  FlightTakeoff,
  AccessTime,
  CreditCard,
  Restaurant,
  Spa,
  LocalParking,
  Wifi,
  Pool,
  FitnessCenter,
  MoreVert,
  MoveUp,
  Block,
  Close,
} from '@mui/icons-material';
import { 
  MOCK_ROOMS, 
  MOCK_ROOM_TYPES, 
  MOCK_GUESTS, 
  MOCK_RESERVATIONS,
  MOCK_PROPERTY 
} from '../data/mockData';

interface RoomRackProps {}

const RoomRack: React.FC<RoomRackProps> = () => {
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'floor'>('grid');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [roomDetailDialog, setRoomDetailDialog] = useState(false);
  const [guestDetailDialog, setGuestDetailDialog] = useState(false);
  const [roomActionMenu, setRoomActionMenu] = useState<{
    anchorEl: HTMLElement | null;
    roomId: string | null;
  }>({ anchorEl: null, roomId: null });

  // Get unique floors from rooms
  const availableFloors = useMemo(() => {
    const floorsSet = new Set(MOCK_ROOMS.map(room => room.floor));
    const floors = Array.from(floorsSet).sort((a, b) => a - b);
    return floors;
  }, []);

  // Filter rooms based on selected criteria
  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      const floorMatch = selectedFloor === 'all' || room.floor === selectedFloor;
      const statusMatch = selectedStatus === 'all' || room.status === selectedStatus;
      const typeMatch = selectedRoomType === 'all' || room.roomTypeId === selectedRoomType;
      return floorMatch && statusMatch && typeMatch;
    });
  }, [selectedFloor, selectedStatus, selectedRoomType]);

  // Get room statistics
  const roomStats = useMemo(() => {
    const total = MOCK_ROOMS.length;
    const occupied = MOCK_ROOMS.filter(r => r.status === 'occupied').length;
    const vacantClean = MOCK_ROOMS.filter(r => r.status === 'vacant-clean').length;
    const vacantDirty = MOCK_ROOMS.filter(r => r.status === 'vacant-dirty').length;
    const outOfOrder = MOCK_ROOMS.filter(r => r.status === 'out-of-order').length;
    const maintenance = MOCK_ROOMS.filter(r => r.status === 'maintenance').length;
    const occupancyRate = ((occupied / total) * 100).toFixed(1);

    return {
      total,
      occupied,
      vacantClean,
      vacantDirty,
      outOfOrder,
      maintenance,
      occupancyRate
    };
  }, []);

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return '#1976d2';
      case 'vacant-clean': return '#2e7d32';
      case 'vacant-dirty': return '#ed6c02';
      case 'out-of-order': return '#d32f2f';
      case 'maintenance': return '#9c27b0';
      default: return '#757575';
    }
  };

  const getRoomStatusIcon = (status: string) => {
    switch (status) {
      case 'occupied': return <Person />;
      case 'vacant-clean': return <CheckCircle />;
      case 'vacant-dirty': return <CleaningServices />;
      case 'out-of-order': return <Block />;
      case 'maintenance': return <Build />;
      default: return <Hotel />;
    }
  };

  const handleRoomClick = (roomId: string) => {
    setSelectedRoom(roomId);
    setRoomDetailDialog(true);
  };

  const handleRoomRightClick = (event: React.MouseEvent, roomId: string) => {
    event.preventDefault();
    setRoomActionMenu({
      anchorEl: event.currentTarget as HTMLElement,
      roomId
    });
  };

  const handleMenuClose = () => {
    setRoomActionMenu({ anchorEl: null, roomId: null });
  };

  const getRoomData = (roomId: string) => {
    const room = MOCK_ROOMS.find(r => r.id === roomId);
    const roomType = room ? MOCK_ROOM_TYPES.find(rt => rt.id === room.roomTypeId) : null;
    const currentGuest = room?.currentGuestId ? MOCK_GUESTS.find(g => g.id === room.currentGuestId) : null;
    const currentReservation = room?.currentGuestId ? 
      MOCK_RESERVATIONS.find(r => r.guestId === room.currentGuestId && r.status === 'checked-in') : null;
    const nextReservation = room?.nextReservationId ? 
      MOCK_RESERVATIONS.find(r => r.id === room.nextReservationId) : null;
    const nextGuest = nextReservation ? MOCK_GUESTS.find(g => g.id === nextReservation.guestId) : null;

    return { room, roomType, currentGuest, currentReservation, nextReservation, nextGuest };
  };

  const selectedRoomData = selectedRoom ? getRoomData(selectedRoom) : null;

  const RoomCard: React.FC<{ roomId: string }> = ({ roomId }) => {
    const { room, roomType, currentGuest, currentReservation, nextGuest } = getRoomData(roomId);
    
    if (!room || !roomType) return null;

    return (
      <Card
        sx={{
          position: 'relative',
          cursor: 'pointer',
          border: 2,
          borderColor: getRoomStatusColor(room.status),
          backgroundColor: room.status === 'occupied' ? 'rgba(25, 118, 210, 0.05)' : 
                          room.status === 'vacant-clean' ? 'rgba(46, 125, 50, 0.05)' :
                          room.status === 'vacant-dirty' ? 'rgba(237, 108, 2, 0.05)' :
                          room.status === 'maintenance' ? 'rgba(156, 39, 176, 0.05)' :
                          'rgba(211, 47, 47, 0.05)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 4,
            borderColor: getRoomStatusColor(room.status)
          },
          transition: 'all 0.3s ease',
          minHeight: 180,
          maxHeight: 220
        }}
        onClick={() => handleRoomClick(roomId)}
        onContextMenu={(e) => handleRoomRightClick(e, roomId)}
      >
        {/* VIP Indicator */}
        {currentGuest?.loyaltyTier && currentGuest.loyaltyTier !== 'None' && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1
            }}
          >
            <Tooltip title={`${currentGuest.loyaltyTier} Member`}>
              <Star sx={{ color: '#ffd700', fontSize: 20 }} />
            </Tooltip>
          </Box>
        )}

        <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Room Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h5" fontWeight={700} color="primary">
              {room.number}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {getRoomStatusIcon(room.status)}
              <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleRoomRightClick(e, roomId); }}>
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
          </Stack>

          {/* Room Type */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {roomType.name} • Floor {room.floor}
          </Typography>

          {/* Status Chip */}
          <Chip
            label={room.status.replace('-', ' ').toUpperCase()}
            sx={{
              bgcolor: getRoomStatusColor(room.status),
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
              mb: 1,
              alignSelf: 'flex-start'
            }}
            size="small"
          />

          {/* Current Guest Info */}
          {currentGuest && (
            <Box sx={{ flexGrow: 1, mb: 1 }}>
              <Stack spacing={0.5}>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {currentGuest.firstName} {currentGuest.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentReservation ? 
                    `Until ${new Date(currentReservation.checkOutDate).toLocaleDateString()}` : 
                    'In-House'
                  }
                </Typography>
                {currentGuest.loyaltyTier !== 'None' && (
                  <Chip
                    label={currentGuest.loyaltyTier}
                    size="small"
                    sx={{
                      fontSize: '0.65rem',
                      height: 18,
                      bgcolor: currentGuest.loyaltyTier === 'Diamond' ? '#b19cd9' :
                               currentGuest.loyaltyTier === 'Platinum' ? '#e5e4e2' :
                               currentGuest.loyaltyTier === 'Gold' ? '#ffd700' :
                               '#c0c0c0',
                      color: 'black',
                      fontWeight: 600
                    }}
                  />
                )}
              </Stack>
            </Box>
          )}

          {/* Next Arrival Info */}
          {!currentGuest && nextGuest && (
            <Box sx={{ flexGrow: 1, mb: 1 }}>
              <Typography variant="caption" color="info.main" fontWeight={600}>
                Next Arrival:
              </Typography>
              <Typography variant="body2" fontWeight={600} noWrap>
                {nextGuest.firstName} {nextGuest.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {/* Maintenance Issues */}
          {room.maintenanceIssues.length > 0 && (
            <Alert severity="warning" sx={{ p: 0.5, fontSize: '0.7rem' }}>
              {room.maintenanceIssues.length} issue(s)
            </Alert>
          )}

          {/* Room Features (if vacant) */}
          {!currentGuest && room.status === 'vacant-clean' && (
            <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
              {roomType.amenities.slice(0, 3).map((amenity, index) => (
                <Tooltip key={index} title={amenity}>
                  <Box>
                    {amenity === 'WiFi' && <Wifi sx={{ fontSize: 14, color: 'text.secondary' }} />}
                    {amenity === 'Pool' && <Pool sx={{ fontSize: 14, color: 'text.secondary' }} />}
                    {amenity === 'Spa' && <Spa sx={{ fontSize: 14, color: 'text.secondary' }} />}
                    {amenity === 'Restaurant' && <Restaurant sx={{ fontSize: 14, color: 'text.secondary' }} />}
                    {amenity === 'Balcony' && <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />}
                  </Box>
                </Tooltip>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    );
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
            Room Rack - Visual Hotel Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time room status • Guest assignments • Drag & drop operations
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<Assignment />} size="large">
            Create Task
          </Button>
          <Button variant="outlined" startIcon={<SwapHoriz />} size="large">
            Room Moves
          </Button>
          <Button variant="contained" startIcon={<Refresh />} size="large">
            Refresh Status
          </Button>
        </Stack>
      </Stack>

      {/* Real-time Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
            <CardContent>
              <Stack alignItems="center" spacing={1}>
                <Typography color="white" variant="h3" fontWeight={700}>
                  {roomStats.occupied}
                </Typography>
                <Typography color="white" variant="body2" textAlign="center">
                  Occupied Rooms
                </Typography>
                <Typography color="white" variant="caption">
                  {roomStats.occupancyRate}% Occupancy
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)' }}>
            <CardContent>
              <Stack alignItems="center" spacing={1}>
                <Typography color="white" variant="h3" fontWeight={700}>
                  {roomStats.vacantClean}
                </Typography>
                <Typography color="white" variant="body2" textAlign="center">
                  Vacant Clean
                </Typography>
                <Typography color="white" variant="caption">
                  Ready for Sale
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)' }}>
            <CardContent>
              <Stack alignItems="center" spacing={1}>
                <Typography color="white" variant="h3" fontWeight={700}>
                  {roomStats.vacantDirty}
                </Typography>
                <Typography color="white" variant="body2" textAlign="center">
                  Vacant Dirty
                </Typography>
                <Typography color="white" variant="caption">
                  Needs Cleaning
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)' }}>
            <CardContent>
              <Stack alignItems="center" spacing={1}>
                <Typography color="white" variant="h3" fontWeight={700}>
                  {roomStats.maintenance}
                </Typography>
                <Typography color="white" variant="body2" textAlign="center">
                  Maintenance
                </Typography>
                <Typography color="white" variant="caption">
                  Under Repair
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)' }}>
            <CardContent>
              <Stack alignItems="center" spacing={1}>
                <Typography color="white" variant="h3" fontWeight={700}>
                  {roomStats.outOfOrder}
                </Typography>
                <Typography color="white" variant="body2" textAlign="center">
                  Out of Order
                </Typography>
                <Typography color="white" variant="caption">
                  Not Available
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ background: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)' }}>
            <CardContent>
              <Stack alignItems="center" spacing={1}>
                <Typography color="white" variant="h3" fontWeight={700}>
                  {roomStats.total}
                </Typography>
                <Typography color="white" variant="body2" textAlign="center">
                  Total Rooms
                </Typography>
                <Typography color="white" variant="caption">
                  Hotel Inventory
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Floor</InputLabel>
            <Select
              value={selectedFloor}
              label="Floor"
              onChange={(e) => setSelectedFloor(e.target.value as number | 'all')}
            >
              <MenuItem value="all">All Floors</MenuItem>
              {availableFloors.map(floor => (
                <MenuItem key={floor} value={floor}>Floor {floor}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              label="Status"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="occupied">Occupied</MenuItem>
              <MenuItem value="vacant-clean">Vacant Clean</MenuItem>
              <MenuItem value="vacant-dirty">Vacant Dirty</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="out-of-order">Out of Order</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Room Type</InputLabel>
            <Select
              value={selectedRoomType}
              label="Room Type"
              onChange={(e) => setSelectedRoomType(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              {MOCK_ROOM_TYPES.map(type => (
                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch 
                checked={viewMode === 'floor'} 
                onChange={(e) => setViewMode(e.target.checked ? 'floor' : 'grid')}
              />
            }
            label="Floor View"
          />

          <Button variant="outlined" startIcon={<Search />} size="small">
            Find Room
          </Button>
          <Button variant="outlined" startIcon={<FilterList />} size="small">
            Advanced Filters
          </Button>
        </Stack>
            </Paper>

      {/* Room Grid */}
      {viewMode === 'grid' ? (
        <Grid container spacing={2}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={room.id}>
              <RoomCard roomId={room.id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        /* Floor View */
        <Box>
          {availableFloors.map(floor => {
            const floorRooms = filteredRooms.filter(r => r.floor === floor);
            if (floorRooms.length === 0) return null;

            return (
              <Paper key={floor} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Floor {floor} ({floorRooms.length} rooms)
                </Typography>
                <Grid container spacing={2}>
                  {floorRooms.map((room) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={room.id}>
                      <RoomCard roomId={room.id} />
                    </Grid>
                  ))}
                </Grid>
                </Paper>
            );
          })}
              </Box>
      )}

      {/* Room Action Menu */}
      <Menu
        anchorEl={roomActionMenu.anchorEl}
        open={Boolean(roomActionMenu.anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemComponent onClick={() => { handleMenuClose(); /* Handle check-in */ }}>
          <ListItemIcon><VpnKey /></ListItemIcon>
          <ListItemText>Quick Check-In</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => { handleMenuClose(); /* Handle check-out */ }}>
          <ListItemIcon><FlightTakeoff /></ListItemIcon>
          <ListItemText>Quick Check-Out</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => { handleMenuClose(); /* Handle room move */ }}>
          <ListItemIcon><SwapHoriz /></ListItemIcon>
          <ListItemText>Move Guest</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => { handleMenuClose(); /* Handle maintenance */ }}>
          <ListItemIcon><Build /></ListItemIcon>
          <ListItemText>Set Maintenance</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => { handleMenuClose(); /* Handle block */ }}>
          <ListItemIcon><Block /></ListItemIcon>
          <ListItemText>Block Room</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => { handleMenuClose(); handleRoomClick(roomActionMenu.roomId!); }}>
          <ListItemIcon><Visibility /></ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItemComponent>
      </Menu>

      {/* Room Detail Dialog */}
      <Dialog open={roomDetailDialog} onClose={() => setRoomDetailDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Room {selectedRoomData?.room?.number} Details
            </Typography>
            <IconButton onClick={() => setRoomDetailDialog(false)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedRoomData && selectedRoomData.room ? (
            <Grid container spacing={3}>
              {/* Room Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Room Information
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Room Number</Typography>
                    <Typography variant="h5" fontWeight={600} color="primary">
                      {selectedRoomData.room.number}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Room Type</Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {selectedRoomData.roomType?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Floor</Typography>
                    <Typography variant="body1">{selectedRoomData.room.floor}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip 
                      label={selectedRoomData.room.status.replace('-', ' ').toUpperCase()}
                        sx={{
                        bgcolor: getRoomStatusColor(selectedRoomData.room.status),
                          color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Features</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                      {selectedRoomData.room.features.map((feature, index) => (
                        <Chip key={index} label={feature} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Grid>

              {/* Current Guest */}
              {selectedRoomData.currentGuest && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Current Guest
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                        {selectedRoomData.currentGuest.firstName[0]}{selectedRoomData.currentGuest.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {selectedRoomData.currentGuest.title} {selectedRoomData.currentGuest.firstName} {selectedRoomData.currentGuest.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedRoomData.currentGuest.loyaltyTier} Member
                        </Typography>
                      </Box>
                    </Stack>
                    
                    {selectedRoomData.currentReservation && (
                      <>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Confirmation</Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {selectedRoomData.currentReservation.confirmationNumber}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Check-out Date</Typography>
                          <Typography variant="body1">
                            {new Date(selectedRoomData.currentReservation.checkOutDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Rate</Typography>
                          <Typography variant="body1" fontWeight={600}>
                            ${selectedRoomData.currentReservation.rateAmount}/night
                          </Typography>
                        </Box>
                      </>
                    )}

                    <Box>
                      <Typography variant="body2" color="text.secondary">Contact</Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <IconButton size="small" color="primary">
                          <Phone />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <Email />
                        </IconButton>
                      </Stack>
                    </Box>

                    {selectedRoomData.currentGuest.vipNotes.length > 0 && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">VIP Notes</Typography>
                        {selectedRoomData.currentGuest.vipNotes.map((note, index) => (
                          <Alert key={index} severity="info" sx={{ mt: 0.5 }}>
                            {note}
                          </Alert>
                        ))}
                      </Box>
                    )}
                  </Stack>
                </Grid>
              )}

              {/* Next Guest */}
              {selectedRoomData.nextGuest && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Next Arrival
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 48, height: 48, bgcolor: 'secondary.main' }}>
                        {selectedRoomData.nextGuest.firstName[0]}{selectedRoomData.nextGuest.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {selectedRoomData.nextGuest.title} {selectedRoomData.nextGuest.firstName} {selectedRoomData.nextGuest.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Expected: {selectedRoomData.nextReservation ? 
                            new Date(selectedRoomData.nextReservation.checkInDate).toLocaleDateString() : 
                            'Today'
                          }
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
              )}

              {/* Maintenance Issues */}
              {selectedRoomData.room.maintenanceIssues.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={600} color="warning.main" sx={{ mb: 2 }}>
                    Maintenance Issues
                  </Typography>
                  <Stack spacing={1}>
                    {selectedRoomData.room.maintenanceIssues.map((issue, index) => (
                      <Alert key={index} severity="warning">
                        {issue}
                      </Alert>
                    ))}
                  </Stack>
                </Grid>
              )}
            </Grid>
          ) : (
            <Typography>No room details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoomDetailDialog(false)}>Close</Button>
          <Button variant="outlined" startIcon={<Edit />}>Edit Room</Button>
          <Button variant="contained" startIcon={<Assignment />}>Create Task</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomRack; 