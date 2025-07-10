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
  Tabs,
  Tab,
  Alert,
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Tooltip,
  Switch,
  FormControlLabel,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  CleaningServices,
  Assignment,
  Person,
  Schedule,
  CheckCircle,
  Warning,
  Error,
  Refresh,
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Print,
  PlayArrow,
  Pause,
  Stop,
  AccessTime,
  Hotel,
  Build,
  Inventory,
  Phone,
  Camera,
  CheckBox,
  CheckBoxOutlineBlank,
  ExpandMore,
  PriorityHigh,
  Speed,
  TrendingUp,
  Analytics,
  Group,
} from '@mui/icons-material';
import { 
  MOCK_ROOMS, 
  MOCK_HOUSEKEEPING_TASKS, 
  MOCK_ROOM_TYPES,
  HousekeepingTask,
  MOCK_HOUSEKEEPING_STAFF,
  HousekeepingStaff
} from '../data/mockData';

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
      id={`housekeeping-tabpanel-${index}`}
      aria-labelledby={`housekeeping-tab-${index}`}
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

const Housekeeping: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [taskDialog, setTaskDialog] = useState(false);
  const [roomDetailDialog, setRoomDetailDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFloor, setFilterFloor] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const getHousekeepingStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'success';
      case 'dirty': return 'warning';
      case 'inspected': return 'info';
      case 'maintenance': return 'error';
      default: return 'default';
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'normal': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'info';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      const statusMatch = filterStatus === 'all' || room.housekeepingStatus === filterStatus;
      const floorMatch = filterFloor === 'all' || room.floor.toString() === filterFloor;
      return statusMatch && floorMatch;
    });
  }, [filterStatus, filterFloor]);

  const housekeepingStats = useMemo(() => {
    const totalRooms = MOCK_ROOMS.length;
    const cleanRooms = MOCK_ROOMS.filter(r => r.housekeepingStatus === 'clean').length;
    const dirtyRooms = MOCK_ROOMS.filter(r => r.housekeepingStatus === 'dirty').length;
    const inspectedRooms = MOCK_ROOMS.filter(r => r.housekeepingStatus === 'inspected').length;
    const maintenanceRooms = MOCK_ROOMS.filter(r => r.housekeepingStatus === 'maintenance').length;
    const totalTasks = MOCK_HOUSEKEEPING_TASKS.length;
    const completedTasks = MOCK_HOUSEKEEPING_TASKS.filter(t => t.status === 'completed').length;
    const inProgressTasks = MOCK_HOUSEKEEPING_TASKS.filter(t => t.status === 'in_progress').length;
    const pendingTasks = MOCK_HOUSEKEEPING_TASKS.filter(t => t.status === 'pending').length;

    return {
      totalRooms,
      cleanRooms,
      dirtyRooms,
      inspectedRooms,
      maintenanceRooms,
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks
    };
  }, []);

  const handleRoomClick = (roomId: string) => {
    setSelectedRoom(roomId);
    setRoomDetailDialog(true);
  };

  const selectedRoomData = selectedRoom ? MOCK_ROOMS.find(r => r.id === selectedRoom) : null;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} sx={{ 
            background: 'linear-gradient(45deg, #2e7d32, #66bb6a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Housekeeping Management Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time room status • Task management • Staff coordination
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<Analytics />} size="large">
            Performance Reports
          </Button>
          <Button variant="outlined" startIcon={<Assignment />} size="large">
            Create Task
          </Button>
          <Button variant="contained" startIcon={<Refresh />} size="large">
            Refresh All
          </Button>
        </Stack>
      </Stack>

      {/* Real-time Dashboard */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {housekeepingStats.cleanRooms}
                  </Typography>
                  <Typography color="white" variant="body2">Clean Rooms</Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {housekeepingStats.dirtyRooms}
                  </Typography>
                  <Typography color="white" variant="body2">Dirty Rooms</Typography>
                </Box>
                <CleaningServices sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {housekeepingStats.inspectedRooms}
                  </Typography>
                  <Typography color="white" variant="body2">Inspected</Typography>
                </Box>
                <CheckBox sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {housekeepingStats.maintenanceRooms}
                  </Typography>
                  <Typography color="white" variant="body2">Maintenance</Typography>
                </Box>
                <Build sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="white" variant="h3" fontWeight={700}>
                    {housekeepingStats.completedTasks}/{housekeepingStats.totalTasks}
                  </Typography>
                  <Typography color="white" variant="body2">Tasks Complete</Typography>
                </Box>
                <Assignment sx={{ fontSize: 40, color: 'white' }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
            <Tab 
              icon={<Hotel />} 
              label="Room Status Board" 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
            <Tab 
              icon={<Assignment />} 
              label="Task Management" 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
            <Tab 
              icon={<Group />} 
              label="Staff Management" 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
            <Tab 
              icon={<Analytics />} 
              label="Performance Analytics" 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
          </Tabs>
        </Box>

        {/* Room Status Board */}
        <TabPanel value={activeTab} index={0}>
          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="clean">Clean</MenuItem>
                  <MenuItem value="dirty">Dirty</MenuItem>
                  <MenuItem value="inspected">Inspected</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Floor</InputLabel>
                <Select
                  value={filterFloor}
                  label="Floor"
                  onChange={(e) => setFilterFloor(e.target.value)}
                >
                  <MenuItem value="all">All Floors</MenuItem>
                  <MenuItem value="1">Floor 1</MenuItem>
                  <MenuItem value="2">Floor 2</MenuItem>
                  <MenuItem value="30">Floor 30</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch 
                    checked={viewMode === 'grid'} 
                    onChange={(e) => setViewMode(e.target.checked ? 'grid' : 'list')}
                  />
                }
                label="Grid View"
              />
              <Button variant="outlined" startIcon={<Refresh />} size="small">
                Refresh Status
              </Button>
            </Stack>
          </Paper>

          {/* Room Grid */}
          {viewMode === 'grid' ? (
            <Grid container spacing={2}>
              {filteredRooms.map((room) => {
                const roomType = MOCK_ROOM_TYPES.find(rt => rt.id === room.roomTypeId);
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        border: 2,
                        borderColor: getRoomStatusColor(room.status),
                        '&:hover': { 
                          transform: 'translateY(-2px)',
                          boxShadow: 3 
                        },
                        transition: 'all 0.2s'
                      }}
                      onClick={() => handleRoomClick(room.id)}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          {/* Room Header */}
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" fontWeight={600} color="primary">
                              {room.number}
                            </Typography>
                            <Chip 
                              label={room.housekeepingStatus.toUpperCase()} 
                              color={getHousekeepingStatusColor(room.housekeepingStatus) as any}
                              size="small"
                            />
                          </Stack>

                          {/* Room Type */}
                          <Typography variant="body2" color="text.secondary">
                            {roomType?.name}
                          </Typography>

                          {/* Status Info */}
                          <Stack spacing={1}>
                            <Chip 
                              label={room.status.replace('-', ' ').toUpperCase()} 
                              sx={{ 
                                bgcolor: getRoomStatusColor(room.status),
                                color: 'white',
                                fontWeight: 600
                              }}
                              size="small"
                            />
                            
                            <Typography variant="caption" color="text.secondary">
                              Last cleaned: {room.lastCleaned.toLocaleDateString()}
                            </Typography>
                          </Stack>

                          {/* Maintenance Issues */}
                          {room.maintenanceIssues.length > 0 && (
                            <Alert severity="warning" sx={{ p: 1 }}>
                              <Typography variant="caption">
                                {room.maintenanceIssues.length} maintenance issue(s)
                              </Typography>
                            </Alert>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          ) : (
            <Alert severity="info">List view implementation coming soon.</Alert>
          )}
        </TabPanel>

        {/* Task Management */}
        <TabPanel value={activeTab} index={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_HOUSEKEEPING_TASKS.map((task: HousekeepingTask) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.roomNumber}</TableCell>
                    <TableCell>{task.taskType.replace('_', ' ')}</TableCell>
                    <TableCell>
                      <Chip label={task.priority} color={getTaskPriorityColor(task.priority) as any} size="small" />
                    </TableCell>
                    <TableCell>{task.assignedTo}</TableCell>
                    <TableCell>
                      <Chip label={task.status.replace('_', ' ')} color={getTaskStatusColor(task.status) as any} size="small" />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small"><PlayArrow /></IconButton>
                      <IconButton size="small"><Edit /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Staff Management */}
        <TabPanel value={activeTab} index={2}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Housekeeping Team Overview
            </Typography>
            <Grid container spacing={3}>
              {MOCK_HOUSEKEEPING_STAFF.map((staff: HousekeepingStaff) => (
                <Grid item xs={12} md={6} lg={4} key={staff.id}>
                  <Card>
                    <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 56, height: 56 }}>{staff.name.split(' ').map((n: string) => n[0]).join('')}</Avatar>
                        <Box>
                          <Typography variant="h6">{staff.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{staff.role}</Typography>
                        </Box>
                        </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack spacing={1}>
                        <Typography variant="body2">Shift: {staff.shift}</Typography>
                        <Typography variant="body2">Status: <Chip label={staff.status} color={staff.status === 'active' ? 'success' : 'default'} size="small"/></Typography>
                        <Typography variant="body2">Tasks: {staff.tasksCompleted} / {staff.tasksAssigned}</Typography>
                        <LinearProgress variant="determinate" value={(staff.tasksCompleted / staff.tasksAssigned) * 100} />
                        <Typography variant="body2">Efficiency: {staff.efficiency}%</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Alert severity="info">Performance analytics dashboard coming soon.</Alert>
        </TabPanel>
      </Card>

      <Dialog open={roomDetailDialog} onClose={() => setRoomDetailDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Room Details: {selectedRoomData?.number}</DialogTitle>
        <DialogContent>
          {selectedRoomData && (
            <Stack spacing={2}>
              <Typography>Status: {selectedRoomData.status}</Typography>
              <Typography>Housekeeping: {selectedRoomData.housekeepingStatus}</Typography>
              <Typography>Last Cleaned: {selectedRoomData.lastCleaned.toLocaleString()}</Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoomDetailDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Housekeeping; 