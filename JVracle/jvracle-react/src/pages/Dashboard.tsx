import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Button,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Hotel,
  TrendingUp,
  AttachMoney,
  MeetingRoom,
  DepartureBoard,
  CleaningServices,
  VpnKey,
  Report,
  Notifications,
  Settings,
  Refresh,
  Error,
  Warning,
  Info,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_ROOMS, MOCK_RESERVATIONS, Reservation, Room } from '../data/mockData';
import { isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);


const StatCard = ({ icon, title, value, change, changeColor, onClick }: any) => (
  <Paper 
    variant="outlined" 
    sx={{ 
      p: 2, 
      display: 'flex', 
      alignItems: 'center', 
      height: '100%', 
      cursor: onClick ? 'pointer' : 'default',
      '&:hover': {
        boxShadow: onClick ? 4 : 1,
      }
    }}
    onClick={onClick}
  >
    <Box sx={{ mr: 2, color: 'primary.main' }}>{icon}</Box>
    <Box>
      <Typography variant="h6" fontWeight="bold">{value}</Typography>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      {change && changeColor && (
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: changeColor, mt: 0.5 }}>
        <TrendingUp sx={{ fontSize: '1rem' }} />
        <Typography variant="caption">{change}</Typography>
      </Stack>
      )}
    </Box>
  </Paper>
);

const RealtimeOperationsMonitor = () => {
    const arrivalsToday = MOCK_RESERVATIONS.filter((r: Reservation) => r.status === 'confirmed' && isToday(new Date(r.checkInDate))).length;
    const checkedInToday = MOCK_RESERVATIONS.filter((r: Reservation) => r.status === 'checked-in' && isToday(new Date(r.checkInDate))).length;
    const roomsToClean = MOCK_ROOMS.filter((r: Room) => r.housekeepingStatus === 'dirty').length;
    const roomsInProgress = MOCK_ROOMS.filter((r: Room) => r.housekeepingStatus === 'clean' && r.status === 'vacant-dirty').length; // Assumption

    return (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Real-time Operations Monitor</Typography>
    <Stack spacing={3}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Today's Arrivals</Typography>
                <Chip label={`${checkedInToday}/${arrivalsToday} guests`} color="primary" size="small" />
        </Stack>
                <Typography variant="body2" color="text.secondary">Checked-in: {checkedInToday} | Pending: {arrivalsToday - checkedInToday}</Typography>
                <LinearProgress variant="determinate" value={(checkedInToday / arrivalsToday) * 100} sx={{ mt: 1 }} />
      </Box>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Housekeeping Queue</Typography>
                <Chip label={`${roomsToClean} tasks`} color="warning" size="small" />
        </Stack>
                <Typography variant="body2" color="text.secondary">In progress: {roomsInProgress}</Typography>
                <LinearProgress variant="determinate" value={(roomsInProgress / roomsToClean) * 100} color="warning" sx={{ mt: 1 }} />
      </Box>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">System Health</Typography>
          <Chip label="All systems operational" color="success" size="small" />
        </Stack>
                <Typography variant="body2" color="text.secondary">Uptime: 99.98% | Last check: 1 min ago</Typography>
      </Box>
    </Stack>
  </Paper>
);
};

const QuickActions = () => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
    <Stack spacing={1}>
      <Button variant="contained" startIcon={<VpnKey />}>New Walk-In</Button>
      <Button variant="outlined" startIcon={<Report />}>Run Manager's Report</Button>
      <Button variant="outlined" startIcon={<Settings />}>Go to System Config</Button>
    </Stack>
  </Paper>
);

const RoomStatusChart = () => {
    const roomStatusData = MOCK_ROOMS.reduce((acc: Record<string, number>, room: Room) => {
        const status = room.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const data = Object.keys(roomStatusData).map(key => ({ name: key, value: roomStatusData[key] }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Room Status</Typography>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }: { name: string, percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
}

const RevenueChart = () => {
    const data = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 2000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 2390 },
        { name: 'Sun', revenue: 3490 },
    ];
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Weekly Revenue</Typography>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    )
}

const PaceChart = () => {
    const data = [
        { name: 'Jan', thisYear: 4000, lastYear: 2400 },
        { name: 'Feb', thisYear: 3000, lastYear: 1398 },
        { name: 'Mar', thisYear: 2000, lastYear: 9800 },
        { name: 'Apr', thisYear: 2780, lastYear: 3908 },
        { name: 'May', thisYear: 1890, lastYear: 4800 },
        { name: 'Jun', thisYear: 2390, lastYear: 3800 },
        { name: 'Jul', thisYear: 3490, lastYear: 4300 },
    ];
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Booking Pace</Typography>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="thisYear" stroke="#8884d8" name="This Year" />
                    <Line type="monotone" dataKey="lastYear" stroke="#82ca9d" name="Last Year" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    )
}

const MarketSegmentChart = () => {
    const data = [
        { name: 'Corporate', value: 400, color: '#0088FE' },
        { name: 'Leisure', value: 300, color: '#00C49F' },
        { name: 'Group', value: 300, color: '#FFBB28' },
        { name: 'Other', value: 200, color: '#FF8042' },
    ];
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Market Segments</Typography>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label={({ name, percent }: { name: string, percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    )
}

const ActionableAlerts = () => {
  const alerts = [
    { id: 1, severity: 'warning', message: "Group 'Innovate Corp' has unassigned rooms (5)", action: 'Assign Rooms', link: '/front-desk' },
    { id: 2, severity: 'error', message: "POS Interface: Connection timed out for 'Lobby Bar'", action: 'View System Health', link: '/settings' },
    { id: 3, severity: 'info', message: 'New corporate rate for "TechCorp" effective today', action: 'View Rates', link: '/rate-calendar' },
  ];

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Notifications color="primary" />
        <Typography variant="h6">Actionable Alerts</Typography>
      </Stack>
      <List dense>
        {alerts.map(alert => (
          <ListItem
            key={alert.id}
            secondaryAction={
              <Button size="small" variant="outlined" href={alert.link}>{alert.action}</Button>
            }
          >
            <ListItemIcon>
              {alert.severity === 'error' && <Error color="error" />}
              {alert.severity === 'warning' && <Warning color="warning" />}
              {alert.severity === 'info' && <Info color="info" />}
            </ListItemIcon>
            <ListItemText primary={alert.message} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

function Dashboard() {
    const navigate = useNavigate();
    const occupancy = (MOCK_ROOMS.filter((r: Room) => r.status === 'occupied').length / MOCK_ROOMS.length) * 100;
    const arrivals = MOCK_RESERVATIONS.filter((r: Reservation) => r.status !== 'cancelled' && isToday(new Date(r.checkInDate))).length;
    const departures = MOCK_RESERVATIONS.filter((r: Reservation) => r.status === 'checked-out' || (r.status === 'checked-in' && isToday(new Date(r.checkOutDate)))).length;
    const roomsToClean = MOCK_ROOMS.filter((r: Room) => r.housekeepingStatus === 'dirty').length;

    // Dummy data for ADR and RevPAR for now
    const adr = 250.75;
    const revpar = 215.50;

    const layout = [
        { i: 'a', x: 0, y: 0, w: 8, h: 10 },
        { i: 'b', x: 8, y: 0, w: 4, h: 10 },
        { i: 'c', x: 0, y: 10, w: 4, h: 10 },
        { i: 'd', x: 4, y: 10, w: 4, h: 10 },
        { i: 'e', x: 8, y: 10, w: 4, h: 10, minH: 10 },
        { i: 'f', x: 0, y: 20, w: 6, h: 10 },
        { i: 'g', x: 6, y: 20, w: 6, h: 10 }
    ];

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Manager's Dashboard</Typography>
          <Typography color="text.secondary">Real-time hotel performance for Grand Luxury Resort</Typography>
        </Box>
        <IconButton>
          <Refresh />
        </IconButton>
      </Stack>

      {/* Main Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={4} lg={2}>
                <StatCard icon={<Hotel />} title="Occupancy" value={`${occupancy.toFixed(1)}%`} onClick={() => navigate('/revenue-management')} />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <StatCard icon={<AttachMoney />} title="ADR" value={`$${adr.toFixed(2)}`} onClick={() => navigate('/revenue-management')} />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <StatCard icon={<TrendingUp />} title="RevPAR" value={`$${revpar.toFixed(2)}`} onClick={() => navigate('/revenue-management')} />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <StatCard icon={<MeetingRoom />} title="Arrivals" value={arrivals.toString()} onClick={() => navigate('/front-desk')} />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <StatCard icon={<DepartureBoard />} title="Departures" value={departures.toString()} onClick={() => navigate('/front-desk')} />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <StatCard icon={<CleaningServices />} title="Rooms to Clean" value={roomsToClean.toString()} onClick={() => navigate('/housekeeping')} />
            </Grid>
        </Grid>

      {/* Operations & Actions */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
      >
        <Paper key="a"><RealtimeOperationsMonitor /></Paper>
        <Paper key="b"><RevenueChart /></Paper>
        <Paper key="c"><QuickActions /></Paper>
        <Paper key="d"><RoomStatusChart /></Paper>
        <Paper key="e"><ActionableAlerts /></Paper>
        <Paper key="f"><PaceChart /></Paper>
        <Paper key="g"><MarketSegmentChart /></Paper>
      </ResponsiveGridLayout>
    </Box>
  );
};

export default Dashboard; 