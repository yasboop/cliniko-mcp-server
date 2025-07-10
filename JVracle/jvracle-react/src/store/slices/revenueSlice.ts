import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RevenueData {
  date: string;
  revenue: number;
  rooms: number;
  adr: number;
  occupancy: number;
  revpar: number;
}

interface ChannelPerformance {
  channel: string;
  bookings: number;
  revenue: number;
  commission: number;
}

interface RevenueState {
  dailyRevenue: RevenueData[];
  channelPerformance: ChannelPerformance[];
  forecastData: RevenueData[];
  totalRevenueMTD: number;
  totalRevenueYTD: number;
  loading: boolean;
  error: string | null;
}

const initialState: RevenueState = {
  dailyRevenue: [
    { date: '2025-01-01', revenue: 42000, rooms: 250, adr: 168, occupancy: 82, revpar: 137.76 },
    { date: '2025-01-02', revenue: 45230, rooms: 267, adr: 169.5, occupancy: 87.5, revpar: 148.31 },
  ],
  channelPerformance: [
    { channel: 'Direct', bookings: 125, revenue: 21000, commission: 0 },
    { channel: 'Booking.com', bookings: 89, revenue: 15500, commission: 2325 },
  ],
  forecastData: [],
  totalRevenueMTD: 1250000,
  totalRevenueYTD: 1250000,
  loading: false,
  error: null,
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    updateDailyRevenue: (state, action: PayloadAction<RevenueData[]>) => {
      state.dailyRevenue = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateDailyRevenue, setLoading, setError } = revenueSlice.actions;
export default revenueSlice.reducer; 