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
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Avatar,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  AttachMoney,
  People,
  Hotel,
  CalendarToday,
  Schedule,
  Print,
  Download,
  Email,
  Refresh,
  Visibility,
  BarChart,
  PieChart,
  ShowChart,
  TableChart,
  FilterList,
  Search,
  Settings,
  Star,
  Business,
  CreditCard,
  Analytics,
  Assignment,
  InsertChart,
  DataUsage,
  Timeline,
  ExpandMore,
  PlayArrow,
  FileDownload,
  Share,
  DateRange,
  Today,
  Group,
  Room,
  CleaningServices,
  Restaurant,
  LocalParking,
  Spa,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BarChart as RechartsBarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  MOCK_REVENUE_DATA, 
  MOCK_RESERVATIONS, 
  MOCK_GUESTS, 
  MOCK_ROOMS,
  MOCK_PROPERTY,
  MOCK_DAILY_REPORTS,
  MOCK_FINANCIAL_REPORTS,
  MOCK_OPERATIONAL_REPORTS,
  MOCK_ANALYTICS_REPORTS,
  Report
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
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
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

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    new Date()
  ]);
  const [reportDialog, setReportDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Sample data for charts
  const revenueChartData = [
    { month: 'Jan', room: 450000, fb: 85000, other: 25000 },
    { month: 'Feb', room: 520000, fb: 92000, other: 28000 },
    { month: 'Mar', room: 580000, fb: 105000, other: 32000 },
    { month: 'Apr', room: 620000, fb: 110000, other: 35000 },
    { month: 'May', room: 680000, fb: 125000, other: 40000 },
    { month: 'Jun', room: 720000, fb: 135000, other: 45000 },
  ];

  const occupancyChartData = [
    { date: '1/1', occupancy: 85.2, adr: 325 },
    { date: '1/2', occupancy: 78.4, adr: 298 },
    { date: '1/3', occupancy: 92.1, adr: 356 },
    { date: '1/4', occupancy: 88.7, adr: 342 },
    { date: '1/5', occupancy: 95.3, adr: 378 },
    { date: '1/6', occupancy: 89.2, adr: 365 },
    { date: '1/7', occupancy: 86.8, adr: 335 },
  ];

  const segmentData = [
    { name: 'Corporate', value: 35, color: '#8884d8' },
    { name: 'Leisure', value: 45, color: '#82ca9d' },
    { name: 'Group', value: 15, color: '#ffc658' },
    { name: 'Other', value: 5, color: '#ff7300' },
  ];

  const handleRunReport = (reportId: string) => {
    setSelectedReport(reportId);
    setReportDialog(true);
  };

  const handleExportReport = (format: string) => {
    // In real app, this would generate and download the report
    console.log(`Exporting ${selectedReport} as ${format}`);
    setReportDialog(false);
  };

  const ReportCard: React.FC<{ report: Report, icon: React.ReactElement }> = ({ report, icon }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {icon}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {report.name}
              </Typography>
              <Chip label={report.category} size="small" variant="outlined" />
            </Box>
          </Stack>
          
          <Typography variant="body2" color="text.secondary">
            {report.description}
          </Typography>
          
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Format: {report.format}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Last run: {report.lastRun.toLocaleDateString()}
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={1}>
            <Button 
              variant="contained" 
              size="small" 
              startIcon={<PlayArrow />}
              onClick={() => handleRunReport(report.id)}
            >
              Run Report
            </Button>
            <IconButton size="small" color="primary">
              <Visibility />
            </IconButton>
            <IconButton size="small" color="primary">
              <Settings />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={600} sx={{ 
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Enterprise Reporting Center
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive analytics • Financial reports • Operational insights
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<Schedule />} size="large">
              Scheduled Reports
            </Button>
            <Button variant="outlined" startIcon={<Settings />} size="large">
              Report Builder
            </Button>
            <Button variant="contained" startIcon={<Analytics />} size="large">
              Live Dashboard
            </Button>
          </Stack>
        </Stack>

        {/* Quick Stats Dashboard */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="white" variant="h4" fontWeight={700}>
                      86.2%
                    </Typography>
                    <Typography color="white" variant="body2">Current Occupancy</Typography>
                  </Box>
                  <Hotel sx={{ fontSize: 40, color: 'white' }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="white" variant="h4" fontWeight={700}>
                      $325
                    </Typography>
                    <Typography color="white" variant="body2">Average Daily Rate</Typography>
                  </Box>
                  <AttachMoney sx={{ fontSize: 40, color: 'white' }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="white" variant="h4" fontWeight={700}>
                      $280
                    </Typography>
                    <Typography color="white" variant="body2">Revenue Per Room</Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 40, color: 'white' }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="white" variant="h4" fontWeight={700}>
                      4.2
                    </Typography>
                    <Typography color="white" variant="body2">Guest Satisfaction</Typography>
                  </Box>
                  <Star sx={{ fontSize: 40, color: 'white' }} />
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
                icon={<Today />} 
                label="Daily Reports" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<AttachMoney />} 
                label="Financial Reports" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Settings />} 
                label="Operational Reports" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Analytics />} 
                label="Analytics Dashboard" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={2}>
              {MOCK_DAILY_REPORTS.map((report) => (
                <Grid item xs={12} sm={6} md={4} key={report.id}>
                  <ReportCard report={report} icon={<Hotel />} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={2}>
              {MOCK_FINANCIAL_REPORTS.map((report) => (
                <Grid item xs={12} sm={6} md={4} key={report.id}>
                  <ReportCard report={report} icon={<AttachMoney />} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={2}>
              {MOCK_OPERATIONAL_REPORTS.map((report) => (
                <Grid item xs={12} sm={6} md={4} key={report.id}>
                  <ReportCard report={report} icon={<Settings />} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          
          <TabPanel value={activeTab} index={3}>
            {/* Analytics Dashboard */}
            <Typography variant="h6" sx={{mb: 2}}>Analytics Dashboard</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper sx={{height: 300, p: 2}}>
                  <Typography variant="h6">Monthly Revenue</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={revenueChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="room" stackId="a" fill="#8884d8" name="Room" />
                          <Bar dataKey="fb" stackId="a" fill="#82ca9d" name="F&B" />
                          <Bar dataKey="other" stackId="a" fill="#ffc658" name="Other" />
                      </RechartsBarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{height: 300, p: 2}}>
                  <Typography variant="h6">Revenue by Segment</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie data={segmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                            {segmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{height: 300, p: 2}}>
                  <Typography variant="h6">Occupancy & ADR Trend</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={occupancyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#8884d8" name="Occupancy (%)" />
                      <Line yAxisId="right" type="monotone" dataKey="adr" stroke="#82ca9d" name="ADR ($)" />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>

        <Dialog open={reportDialog} onClose={() => setReportDialog(false)}>
          <DialogTitle>Run Report: {selectedReport}</DialogTitle>
          <DialogContent>
            <Typography>Select export format:</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleExportReport('PDF')}>PDF</Button>
            <Button onClick={() => handleExportReport('Excel')}>Excel</Button>
            <Button onClick={() => setReportDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports; 