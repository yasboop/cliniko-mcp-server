import React, { useState, ReactNode, SyntheticEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`reservation-tabpanel-${index}`}
      aria-labelledby={`reservation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
}

function ReservationDialog({ open, onClose }: ReservationDialogProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(new Date());
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomType: '',
    adults: 1,
    children: 0,
    rateCode: '',
    paymentMethod: '',
    ccNumber: '',
    ccExpiry: '',
    ccCvv: '',
    preferences: {
      highFloor: false,
      nearElevator: false,
      quietRoom: false,
    },
    smoking: 'non-smoking',
    notes: '',
  });

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (name in formData.preferences) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked,
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name as string]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>New Reservation</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Guest & Stay" />
              <Tab label="Rates & Payment" />
              <Tab label="Preferences" />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="phone" label="Phone" value={formData.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Arrival Date"
                    value={arrivalDate}
                    onChange={(newValue) => setArrivalDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Departure Date"
                    value={departureDate}
                    onChange={(newValue) => setDepartureDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField fullWidth name="roomType" label="Room Type" value={formData.roomType} onChange={handleChange} />
                </Grid>
                <Grid item xs={3} sm={4}>
                  <TextField fullWidth name="adults" label="Adults" type="number" value={formData.adults} onChange={handleChange} />
                </Grid>
                <Grid item xs={3} sm={4}>
                  <TextField fullWidth name="children" label="Children" type="number" value={formData.children} onChange={handleChange} />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="rateCode" label="Rate Code" value={formData.rateCode} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth disabled label="Total Price" value={"$0.00"} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="payment-method-label">Payment Method</InputLabel>
                    <Select
                      labelId="payment-method-label"
                      name="paymentMethod"
                      label="Payment Method"
                      value={formData.paymentMethod}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="credit_card">Credit Card</MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="direct_bill">Direct Bill</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {formData.paymentMethod === 'credit_card' && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth name="ccNumber" label="Credit Card Number" value={formData.ccNumber} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField fullWidth name="ccExpiry" label="MM/YY" value={formData.ccExpiry} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField fullWidth name="ccCvv" label="CVV" value={formData.ccCvv} onChange={handleChange} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Room Preferences</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={formData.preferences.highFloor} onChange={handleChange} name="highFloor" />}
                        label="High Floor"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formData.preferences.nearElevator} onChange={handleChange} name="nearElevator" />}
                        label="Near Elevator"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={formData.preferences.quietRoom} onChange={handleChange} name="quietRoom" />}
                        label="Quiet Room"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Smoking Preference</FormLabel>
                    <RadioGroup
                      row
                      name="smoking"
                      value={formData.smoking}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="non-smoking" control={<Radio />} label="Non-Smoking" />
                      <FormControlLabel value="smoking" control={<Radio />} label="Smoking" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="notes"
                    label="Notes / Special Requests"
                    multiline
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </DialogContent>
      </LocalizationProvider>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">Create Reservation</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationDialog; 