import React, { useState, useMemo } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  PriceChange,
  AutoGraph,
  Insights,
  CompareArrows,
  Refresh,
  Download,
  Visibility,
  Edit,
  ShowChart,
} from '@mui/icons-material';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { MOCK_REVENUE_DATA, MOCK_RATE_PLANS, RatePlan } from '../data/mockData';
import { format } from 'date-fns';

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
      id={`revenue-tabpanel-${index}`}
      aria-labelledby={`revenue-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StatCard = ({ title, value, change, changeColor }: { title: string, value: string, change: string, changeColor: string }) => (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        <Typography variant="h5" fontWeight="bold">{value}</Typography>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: changeColor }}>
            {change.startsWith('+') ? <TrendingUp sx={{ fontSize: '1rem' }} /> : <TrendingDown sx={{ fontSize: '1rem' }} />}
            <Typography variant="caption">{change}</Typography>
        </Stack>
    </Paper>
);

const RevenueManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const revenueStats = useMemo(() => {
    const today = MOCK_REVENUE_DATA[MOCK_REVENUE_DATA.length - 1];
    const yesterday = MOCK_REVENUE_DATA[MOCK_REVENUE_DATA.length - 2];
    
    const revenueChange = ((today.totalRevenue - yesterday.totalRevenue) / yesterday.totalRevenue) * 100;
    const revParChange = ((today.revpar - yesterday.revpar) / yesterday.revpar) * 100;
    const adrChange = ((today.adr - yesterday.adr) / yesterday.adr) * 100;
    const occupancyChange = ((today.occupancyRate - yesterday.occupancyRate) / yesterday.occupancyRate) * 100;

    return {
      totalRevenue: today.totalRevenue,
      revpar: today.revpar,
      adr: today.adr,
      occupancy: today.occupancyRate,
      revenueChange,
      revParChange,
      adrChange,
      occupancyChange,
    };
  }, []);
  
  const marketSegmentData = useMemo(() => [
    { name: 'Corporate', value: 400, color: '#0088FE' },
    { name: 'Leisure', value: 300, color: '#00C49F' },
    { name: 'Group', value: 300, color: '#FFBB28' },
    { name: 'Other', value: 200, color: '#FF8042' },
  ], []);

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Revenue Management</Typography>
          <Typography color="text.secondary">Analyze and manage hotel revenue performance.</Typography>
        </Box>
        <Button variant="contained" startIcon={<Refresh />}>Refresh Data</Button>
      </Stack>

      {/* Key Stats */}
       <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <StatCard title="Total Revenue (MTD)" value={`$${revenueStats.totalRevenue.toLocaleString()}`} change={`${revenueStats.revenueChange.toFixed(1)}%`} changeColor={revenueStats.revenueChange > 0 ? 'success.main' : 'error.main'} />
        <StatCard title="RevPAR" value={`$${revenueStats.revpar.toFixed(2)}`} change={`${revenueStats.revParChange.toFixed(1)}%`} changeColor={revenueStats.revParChange > 0 ? 'success.main' : 'error.main'} />
        <StatCard title="ADR" value={`$${revenueStats.adr.toFixed(2)}`} change={`${revenueStats.adrChange.toFixed(1)}%`} changeColor={revenueStats.adrChange > 0 ? 'success.main' : 'error.main'} />
        <StatCard title="Occupancy" value={`${revenueStats.occupancy.toFixed(1)}%`} change={`${revenueStats.occupancyChange.toFixed(1)}%`} changeColor={revenueStats.occupancyChange > 0 ? 'success.main' : 'error.main'} />
      </Box>
      
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="revenue management tabs">
            <Tab label="Performance Overview" />
            <Tab label="Market Segments" />
            <Tab label="Rate Plans" />
          </Tabs>
        </Box>
        
        <TabPanel value={activeTab} index={0}>
            <Typography variant="h6" sx={{mb: 2}}>Revenue Performance</Typography>
            <Paper sx={{height: 300, p: 2}}>
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={MOCK_REVENUE_DATA.slice(-30)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), 'MMM d')} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="roomRevenue" fill="#8884d8" name="Room Revenue" />
                        <Bar dataKey="totalRevenue" fill="#82ca9d" name="Total Revenue" />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" sx={{mb: 2}}>Revenue by Market Segment</Typography>
            <Paper sx={{height: 300, p: 2}}>
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie data={marketSegmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                            {marketSegmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
             <Typography variant="h6" sx={{mb: 2}}>Rate Plan Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rate Plan</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Base Rate</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {MOCK_RATE_PLANS.map((plan: RatePlan) => (
                          <TableRow key={plan.id}>
                              <TableCell>{plan.name}</TableCell>
                              <TableCell>{plan.code}</TableCell>
                              <TableCell>${plan.baseRate.toFixed(2)}</TableCell>
                              <TableCell>{plan.isActive ? 'Active' : 'Inactive'}</TableCell>
                              <TableCell><Button>Edit</Button></TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default RevenueManagement; 