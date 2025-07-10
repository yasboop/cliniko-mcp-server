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
  Switch,
  FormControlLabel,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  CloudSync as CloudSyncIcon,
  Add,
  Edit,
  Delete,
  Refresh,
  CheckCircle,
  Error,
  Warning,
  BookOnline,
  AttachMoney,
  TrendingUp,
} from '@mui/icons-material';
import { MOCK_CHANNELS, ChannelData } from '../data/mockData';

const ChannelManager: React.FC = () => {
  const [channels, setChannels] = useState<ChannelData[]>(MOCK_CHANNELS);
  const [newChannelDialog, setNewChannelDialog] = useState(false);

  const channelStats = useMemo(() => {
    const connected = channels.filter(c => c.status === 'connected').length;
    const withErrors = channels.filter(c => c.status === 'error').length;
    const totalBookings = channels.reduce((sum, c) => sum + c.bookingsToday, 0);
    const totalRevenue = channels.reduce((sum, c) => sum + c.revenueToday, 0);
    return { connected, withErrors, totalBookings, totalRevenue };
  }, [channels]);

  const getStatusChip = (status: 'connected' | 'disconnected' | 'error') => {
    switch (status) {
      case 'connected':
        return <Chip label="Connected" color="success" icon={<CheckCircle />} size="small" />;
      case 'disconnected':
        return <Chip label="Disconnected" color="default" icon={<LinkOffIcon />} size="small" />;
      case 'error':
        return <Chip label="Error" color="error" icon={<Error />} size="small" />;
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
            Channel Manager
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage online distribution channels and OTA connections
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<Refresh />} size="large">
            Sync All Channels
          </Button>
          <Button variant="contained" startIcon={<Add />} size="large" onClick={() => setNewChannelDialog(true)}>
            New Channel
          </Button>
        </Stack>
      </Stack>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" fontWeight={600}>{channels.length}</Typography>
              <Typography color="text.secondary">Total Channels</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" fontWeight={600} color="success.main">{channelStats.connected}</Typography>
              <Typography color="text.secondary">Connected Channels</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" fontWeight={600}>{channelStats.totalBookings}</Typography>
              <Typography color="text.secondary">Total Bookings Today</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" fontWeight={600}>${channelStats.totalRevenue.toLocaleString()}</Typography>
              <Typography color="text.secondary">Total Revenue Today</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Channel List */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Channel Connections
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Channel</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Sync</TableCell>
                  <TableCell>Bookings Today</TableCell>
                  <TableCell>Revenue Today</TableCell>
                  <TableCell>Commission</TableCell>
                  <TableCell>Connection Health</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {channels.map((channel) => (
                  <TableRow key={channel.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight={600}>{channel.name}</Typography>
                    </TableCell>
                    <TableCell>{channel.type}</TableCell>
                    <TableCell>{getStatusChip(channel.status)}</TableCell>
                    <TableCell>{new Date(channel.lastSync).toLocaleString()}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{channel.bookingsToday}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>${channel.revenueToday.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell>{channel.commission * 100}%</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LinearProgress 
                          variant="determinate" 
                          value={channel.connectionHealth} 
                          color={channel.connectionHealth > 80 ? 'success' : 'warning'} 
                          sx={{ width: 100, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2">{channel.connectionHealth}%</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small"><CloudSyncIcon /></IconButton>
                      <IconButton size="small"><Edit /></IconButton>
                      <IconButton size="small" color="error"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      
      {/* New Channel Dialog */}
      <Dialog open={newChannelDialog} onClose={() => setNewChannelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Channel</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Channel Name" fullWidth />
            <FormControl fullWidth>
              <InputLabel>Channel Type</InputLabel>
              <Select label="Channel Type">
                <MenuItem value="OTA">OTA</MenuItem>
                <MenuItem value="GDS">GDS</MenuItem>
                <MenuItem value="Direct">Direct</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Commission Rate (%)" type="number" fullWidth />
            <FormControlLabel control={<Switch defaultChecked />} label="Enable Channel" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewChannelDialog(false)}>Cancel</Button>
          <Button variant="contained">Add Channel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChannelManager; 