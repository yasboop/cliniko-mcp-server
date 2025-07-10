import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reservation {
  id: string;
  confirmationNumber: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  roomNumber?: string;
  rate: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';
  guests: number;
  totalAmount: number;
  source: string;
  specialRequests?: string;
}

interface ReservationState {
  reservations: Reservation[];
  todayArrivals: Reservation[];
  todayDepartures: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [
    {
      id: '1',
      confirmationNumber: 'JV2025001',
      guestName: 'John Smith',
      checkIn: '2025-01-15',
      checkOut: '2025-01-18',
      roomType: 'Deluxe King',
      roomNumber: '201',
      rate: 168.50,
      status: 'confirmed',
      guests: 2,
      totalAmount: 505.50,
      source: 'Direct',
    },
    {
      id: '2',
      confirmationNumber: 'JV2025002',
      guestName: 'Sarah Wilson',
      checkIn: '2025-01-15',
      checkOut: '2025-01-20',
      roomType: 'Executive Suite',
      rate: 450.00,
      status: 'confirmed',
      guests: 2,
      totalAmount: 2250.00,
      source: 'Booking.com',
    }
  ],
  todayArrivals: [],
  todayDepartures: [],
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    },
    updateReservation: (state, action: PayloadAction<Reservation>) => {
      const index = state.reservations.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    },
    deleteReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(r => r.id !== action.payload);
    },
    setTodayArrivals: (state, action: PayloadAction<Reservation[]>) => {
      state.todayArrivals = action.payload;
    },
    setTodayDepartures: (state, action: PayloadAction<Reservation[]>) => {
      state.todayDepartures = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addReservation,
  updateReservation,
  deleteReservation,
  setTodayArrivals,
  setTodayDepartures,
  setLoading,
  setError
} = reservationSlice.actions;
export default reservationSlice.reducer; 