import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HotelMetrics {
  occupancyRate: number;
  dailyRevenue: number;
  availableRooms: number;
  totalRooms: number;
  guestsInHouse: number;
  averageDailyRate: number;
  revPAR: number;
  arrivalsToday: number;
  departureToday: number;
}

interface Property {
  id: string;
  name: string;
  type: string;
  rooms: number;
  location: string;
}

interface HotelState {
  currentProperty: Property;
  properties: Property[];
  metrics: HotelMetrics;
  loading: boolean;
  error: string | null;
}

const initialState: HotelState = {
  currentProperty: {
    id: '1',
    name: 'Grand Luxury Resort',
    type: 'Resort',
    rooms: 305,
    location: 'Miami Beach, FL'
  },
  properties: [
    {
      id: '1',
      name: 'Grand Luxury Resort',
      type: 'Resort',
      rooms: 305,
      location: 'Miami Beach, FL'
    },
    {
      id: '2',
      name: 'Business Hotel Downtown',
      type: 'Business Hotel',
      rooms: 180,
      location: 'New York, NY'
    },
    {
      id: '3',
      name: 'Boutique Inn',
      type: 'Boutique',
      rooms: 85,
      location: 'San Francisco, CA'
    }
  ],
  metrics: {
    occupancyRate: 87.5,
    dailyRevenue: 45230,
    availableRooms: 38,
    totalRooms: 305,
    guestsInHouse: 523,
    averageDailyRate: 168.50,
    revPAR: 147.44,
    arrivalsToday: 45,
    departureToday: 32,
  },
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setCurrentProperty: (state, action: PayloadAction<Property>) => {
      state.currentProperty = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<Partial<HotelMetrics>>) => {
      state.metrics = { ...state.metrics, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentProperty, updateMetrics, setLoading, setError } = hotelSlice.actions;
export default hotelSlice.reducer; 