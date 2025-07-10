import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vipStatus: 'None' | 'Silver' | 'Gold' | 'Platinum';
  preferences: string[];
  totalStays: number;
  totalSpent: number;
  lastVisit?: string;
  notes?: string;
}

interface GuestState {
  guests: Guest[];
  currentGuest: Guest | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuestState = {
  guests: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-123-4567',
      vipStatus: 'Gold',
      preferences: ['High Floor', 'Late Checkout', 'Extra Pillows'],
      totalStays: 15,
      totalSpent: 12450.00,
      lastVisit: '2024-11-15',
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1-555-987-6543',
      vipStatus: 'Platinum',
      preferences: ['Ocean View', 'Executive Lounge Access'],
      totalStays: 28,
      totalSpent: 35200.00,
      lastVisit: '2024-12-20',
    }
  ],
  currentGuest: null,
  loading: false,
  error: null,
};

const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    addGuest: (state, action: PayloadAction<Guest>) => {
      state.guests.push(action.payload);
    },
    updateGuest: (state, action: PayloadAction<Guest>) => {
      const index = state.guests.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.guests[index] = action.payload;
      }
    },
    setCurrentGuest: (state, action: PayloadAction<Guest | null>) => {
      state.currentGuest = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addGuest, updateGuest, setCurrentGuest, setLoading, setError } = guestSlice.actions;
export default guestSlice.reducer; 