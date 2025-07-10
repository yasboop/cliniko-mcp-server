import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
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
  Chip,
  Grid,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  CalendarToday,
  TrendingUp,
  AttachMoney,
  Add,
  Edit,
  Delete,
  Save,
  Cancel,
  Warning,
  CheckCircle,
  Block,
  Hotel,
  People,
  DateRange,
  EventAvailable,
  EventBusy,
} from '@mui/icons-material';
import { MOCK_RATE_PLANS, RatePlan, MOCK_ROOMS } from '../data/mockData';
import { addDays, startOfDay } from 'date-fns';

interface RateCalendarDay {
  date: Date;
  rates: { [rateCode: string]: number };
  availability: number;
  restrictions: {
    cta: boolean; // Closed to Arrival
    ctd: boolean; // Closed to Departure  
    minLOS: number; // Minimum Length of Stay
    maxLOS: number; // Maximum Length of Stay
  };
  overbooking: number;
}

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

const RateCalendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rateDialog, setRateDialog] = useState(false);
  const [restrictionDialog, setRestrictionDialog] = useState(false);
  const [viewType, setViewType] = useState<'month' | 'year'>('month');

  // Generate sample calendar data for next 365 days
  const generateCalendarData = (): RateCalendarDay[] => {
    const data: RateCalendarDay[] = [];
    const today = startOfDay(new Date());
    
    for (let i = 0; i < 365; i++) {
      const date = addDays(today, i);
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      const rates: { [key: string]: number } = {};
      MOCK_RATE_PLANS.forEach(rate => {
        let multiplier = 1;
        if (isWeekend) multiplier = 1.3;
        rates[rate.code] = Math.round(rate.baseRate * multiplier);
      });

      const availability = MOCK_ROOMS.filter(r => r.status === 'vacant-clean' || r.status === 'vacant-dirty').length;

      data.push({
        date,
        rates,
        availability: availability - Math.floor(Math.random() * 20), // Simulate some bookings
        restrictions: {
          cta: Math.random() > 0.9,
          ctd: Math.random() > 0.95,
          minLOS: Math.random() > 0.8 ? 2 : 1,
          maxLOS: Math.random() > 0.9 ? 7 : 0,
        },
        overbooking: Math.floor(Math.random() * 10),
      });
    }
    
    return data;
  };

  const [calendarData] = useState(generateCalendarData());

  const getRateColor = (availability: number): string => {
    if (availability <= 5) return '#f44336'; // Red - Low availability
    if (availability <= 15) return '#ff9800'; // Orange - Medium availability  
    return '#4caf50'; // Green - High availability
  };

  const getRestrictionChip = (day: RateCalendarDay) => {
    const restrictions = [];
    if (day.restrictions.cta) restrictions.push('CTA');
    if (day.restrictions.ctd) restrictions.push('CTD');
    if (day.restrictions.minLOS > 1) restrictions.push(`MinLOS ${day.restrictions.minLOS}`);
    if (day.restrictions.maxLOS > 0) restrictions.push(`MaxLOS ${day.restrictions.maxLOS}`);
    
    return restrictions.length > 0 ? restrictions.join(', ') : '';
  };

  const renderCalendarGrid = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    
    const monthData = calendarData.filter(day => 
      day.date.getMonth() === currentMonth && day.date.getFullYear() === currentYear
    );

    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="center">Avail</TableCell>
              {MOCK_RATE_PLANS.map(rate => (
                <TableCell key={rate.code} align="center">{rate.code}</TableCell>
              ))}
              <TableCell align="center">Restrictions</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthData.map((day) => (
              <TableRow 
                key={day.date.toISOString()} 
                sx={{ 
                  backgroundColor: day.date.getDay() === 0 || day.date.getDay() === 6 
                    ? '#f5f5f5' : 'inherit'
                }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2">
                      {day.date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    size="small"
                    label={day.availability}
                    sx={{ 
                      backgroundColor: getRateColor(day.availability),
                      color: 'white',
                      minWidth: 40
                    }}
                  />
                </TableCell>
                {MOCK_RATE_PLANS.map(rate => (
                  <TableCell key={rate.code} align="center">
                    <Typography variant="body2" fontWeight={600}>
                      ${day.rates[rate.code]}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell align="center">
                  {getRestrictionChip(day) && (
                    <Tooltip title={getRestrictionChip(day)}>
                      <Chip 
                        size="small" 
                        label={getRestrictionChip(day).split(',').length} 
                        color="warning"
                        icon={<Warning />}
                      />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => setRateDialog(true)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => setRestrictionDialog(true)}>
                    <Block />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(selectedDate.getFullYear(), i, 1);
      return date;
    });

    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
        {months.map((month) => (
          <Box key={month.getMonth()}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {month.toLocaleDateString('en-US', { month: 'long' })}
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Avg BAR:</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${Math.round(MOCK_RATE_PLANS.find(r => r.code === 'BAR')?.baseRate || 0)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Avg Avail:</Typography>
                    <Typography variant="body2" fontWeight={600}>25</Typography>
                  </Stack>
                  <Button 
                    size="small" 
                    onClick={() => {
                      setSelectedDate(month);
                      setViewType('month');
                    }}
                  >
                    View Details
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Rate Calendar
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Oracle OPERA Rate & Inventory Management
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <FormControl size="small">
            <InputLabel>View</InputLabel>
            <Select value={viewType} onChange={(e) => setViewType(e.target.value as 'month' | 'year')}>
              <MenuItem value="month">Month View</MenuItem>
              <MenuItem value="year">Year View</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Add />}>
            Bulk Update
          </Button>
          <Button variant="contained" startIcon={<CalendarToday />}>
            Export
          </Button>
        </Stack>
      </Stack>

      {/* Date Navigation */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setSelectedDate(newDate);
            }}>
              ←
            </IconButton>
            <Typography variant="h6">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </Typography>
            <IconButton onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setSelectedDate(newDate);
            }}>
              →
            </IconButton>
          </Stack>
          
          <Stack direction="row" spacing={1}>
            <Chip size="small" icon={<CheckCircle />} label="Available" color="success" />
            <Chip size="small" icon={<Warning />} label="Low Availability" color="warning" />
            <Chip size="small" icon={<Block />} label="Closed" color="error" />
          </Stack>
        </Stack>
      </Paper>

      {/* Main Content */}
      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Calendar View" icon={<CalendarToday />} />
            <Tab label="Rate Codes" icon={<AttachMoney />} />
            <Tab label="Restrictions Matrix" icon={<Block />} />
          </Tabs>
        </Box>

        {/* Calendar View Tab */}
        <TabPanel value={activeTab} index={0}>
          {viewType === 'month' ? renderCalendarGrid() : renderYearView()}
        </TabPanel>

        {/* Rate Codes Tab */}
        <TabPanel value={activeTab} index={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Rate Code Management</Typography>
            <Button variant="contained" startIcon={<Add />}>
              Add Rate Code
            </Button>
          </Stack>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Base Rate</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_RATE_PLANS.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {rate.code}
                      </Typography>
                    </TableCell>
                    <TableCell>{rate.name}</TableCell>
                    <TableCell>
                      <Chip size="small" label={rate.category} />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600}>
                        ${rate.baseRate}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        size="small"
                        label={rate.isActive ? 'Active' : 'Inactive'}
                        color={rate.isActive ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Restrictions Matrix Tab */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>Booking Restrictions Matrix</Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            Set booking restrictions by date range. CTA = Closed to Arrival, CTD = Closed to Departure
          </Alert>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date Range</TableCell>
                  <TableCell align="center">CTA</TableCell>
                  <TableCell align="center">CTD</TableCell>
                  <TableCell align="center">Min LOS</TableCell>
                  <TableCell align="center">Max LOS</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Jul 15-17, 2025 (Weekend)</TableCell>
                  <TableCell align="center">
                    <Switch size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Switch size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <TextField size="small" type="number" defaultValue="2" sx={{ width: 60 }} />
                  </TableCell>
                  <TableCell align="center">
                    <TextField size="small" type="number" defaultValue="7" sx={{ width: 60 }} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <Save />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dec 24-26, 2025 (Holiday)</TableCell>
                  <TableCell align="center">
                    <Switch size="small" defaultChecked />
                  </TableCell>
                  <TableCell align="center">
                    <Switch size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <TextField size="small" type="number" defaultValue="3" sx={{ width: 60 }} />
                  </TableCell>
                  <TableCell align="center">
                    <TextField size="small" type="number" defaultValue="0" sx={{ width: 60 }} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <Save />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Rate Change Dialog */}
        <Dialog open={rateDialog} onClose={() => setRateDialog(false)}>
          <DialogTitle>Update Rates</DialogTitle>
          <DialogContent>
            <Typography>Update rates for selected date.</Typography>
            <TextField label="New Rate" type="number" sx={{ mt: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRateDialog(false)}>Cancel</Button>
            <Button onClick={() => setRateDialog(false)} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Restriction Change Dialog */}
        <Dialog open={restrictionDialog} onClose={() => setRestrictionDialog(false)}>
          <DialogTitle>Update Restrictions</DialogTitle>
          <DialogContent>
            <FormControlLabel control={<Switch />} label="Close to Arrival (CTA)" />
            <FormControlLabel control={<Switch />} label="Close to Departure (CTD)" />
            <TextField label="Min Length of Stay" type="number" fullWidth sx={{ mt: 2 }}/>
            <TextField label="Max Length of Stay" type="number" fullWidth sx={{ mt: 1 }}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRestrictionDialog(false)}>Cancel</Button>
            <Button onClick={() => setRestrictionDialog(false)} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default RateCalendar; 