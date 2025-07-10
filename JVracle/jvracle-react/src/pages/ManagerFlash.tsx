import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Print,
  Download,
  Refresh,
  CompareArrows,
} from '@mui/icons-material';

interface FlashMetric {
  label: string;
  value: number;
  format: 'currency' | 'percentage' | 'number';
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}

interface FlashPeriod {
  name: string;
  date: string;
  metrics: {
    occupancy: FlashMetric;
    adr: FlashMetric;
    revpar: FlashMetric;
    totalRevenue: FlashMetric;
    roomRevenue: FlashMetric;
    fbRevenue: FlashMetric;
    otherRevenue: FlashMetric;
    arrivals: FlashMetric;
    departures: FlashMetric;
    noShows: FlashMetric;
    cancellations: FlashMetric;
    avgLength: FlashMetric;
  };
}

const ManagerFlash: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('yesterday');

  // Sample data
  const flashData: { [key: string]: FlashPeriod } = {
    yesterday: {
      name: 'Yesterday',
      date: 'July 7, 2025',
      metrics: {
        occupancy: { label: 'Occupancy %', value: 87.5, format: 'percentage', change: 5.2, changeType: 'positive' },
        adr: { label: 'ADR', value: 299.50, format: 'currency', change: -2.1, changeType: 'negative' },
        revpar: { label: 'RevPAR', value: 262.06, format: 'currency', change: 3.8, changeType: 'positive' },
        totalRevenue: { label: 'Total Revenue', value: 145230, format: 'currency', change: 8.7, changeType: 'positive' },
        roomRevenue: { label: 'Room Revenue', value: 112450, format: 'currency', change: 6.2, changeType: 'positive' },
        fbRevenue: { label: 'F&B Revenue', value: 24780, format: 'currency', change: 15.3, changeType: 'positive' },
        otherRevenue: { label: 'Other Revenue', value: 8000, format: 'currency', change: 12.1, changeType: 'positive' },
        arrivals: { label: 'Arrivals', value: 89, format: 'number', change: 12, changeType: 'positive' },
        departures: { label: 'Departures', value: 76, format: 'number', change: -8, changeType: 'negative' },
        noShows: { label: 'No Shows', value: 3, format: 'number', change: -1, changeType: 'positive' },
        cancellations: { label: 'Cancellations', value: 5, format: 'number', change: 2, changeType: 'negative' },
        avgLength: { label: 'Avg LOS', value: 2.3, format: 'number', change: 0.2, changeType: 'positive' },
      },
    },
  };

  const currentData = flashData[selectedPeriod];

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp color="success" />;
      case 'negative':
        return <TrendingDown color="error" />;
      default:
        return <CompareArrows color="disabled" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'success.main';
      case 'negative':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };

  const renderMetricCard = (metric: FlashMetric) => (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {metric.label}
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {formatValue(metric.value, metric.format)}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {getChangeIcon(metric.changeType)}
            <Typography
              variant="caption"
              sx={{ color: getChangeColor(metric.changeType) }}
            >
              {metric.change > 0 ? '+' : ''}{formatValue(Math.abs(metric.change), metric.format)} vs prior
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Manager Flash Report
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Daily Performance Summary - {currentData.date}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} label="Period">
              <MenuItem value="yesterday">Yesterday</MenuItem>
              <MenuItem value="mtd" disabled>Month to Date</MenuItem>
              <MenuItem value="ytd" disabled>Year to Date</MenuItem>
            </Select>
          </FormControl>
          <IconButton><Refresh /></IconButton>
          <Button variant="outlined" startIcon={<Print />}>Print</Button>
          <Button variant="contained" startIcon={<Download />}>Export</Button>
        </Stack>
      </Stack>

      {/* Key Performance Indicators */}
      <Typography variant="h6" sx={{ mb: 2 }}>Key Performance Indicators</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, mb: 4 }}>
        {renderMetricCard(currentData.metrics.occupancy)}
        {renderMetricCard(currentData.metrics.adr)}
        {renderMetricCard(currentData.metrics.revpar)}
        {renderMetricCard(currentData.metrics.totalRevenue)}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Revenue & Guest Breakdown */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 4 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Revenue Breakdown</Typography>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
                {renderMetricCard(currentData.metrics.roomRevenue)}
                {renderMetricCard(currentData.metrics.fbRevenue)}
                {renderMetricCard(currentData.metrics.otherRevenue)}
            </Box>
        </Paper>
         <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Guest Activity</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
                {renderMetricCard(currentData.metrics.arrivals)}
                {renderMetricCard(currentData.metrics.departures)}
                {renderMetricCard(currentData.metrics.noShows)}
                {renderMetricCard(currentData.metrics.cancellations)}
            </Box>
        </Paper>
      </Box>
      
      {/* Additional Metrics Table */}
        <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Additional Performance Metrics
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell align="right">Current</TableCell>
                <TableCell align="right">Prior Period</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="center">Trend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Average Length of Stay</TableCell>
                <TableCell align="right">{currentData.metrics.avgLength.value} nights</TableCell>
                <TableCell align="right">{(currentData.metrics.avgLength.value - currentData.metrics.avgLength.change).toFixed(1)} nights</TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: getChangeColor(currentData.metrics.avgLength.changeType) }}>
                    {currentData.metrics.avgLength.change > 0 ? '+' : ''}{currentData.metrics.avgLength.change}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {getChangeIcon(currentData.metrics.avgLength.changeType)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
};

export default ManagerFlash; 