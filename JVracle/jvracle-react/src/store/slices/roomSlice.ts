import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  status: 'clean' | 'dirty' | 'occupied' | 'maintenance' | 'out-of-order';
  bedType: string;
  maxOccupancy: number;
  amenities: string[];
  lastCleaned?: string;
  guestName?: string;
  checkOut?: string;
}

interface RoomState {
  rooms: Room[];
  roomTypes: string[];
  housekeepingTasks: any[];
  maintenanceIssues: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [
    {
      id: '1',
      number: '201',
      type: 'Deluxe',
      floor: 2,
      status: 'clean',
      bedType: 'King',
      maxOccupancy: 2,
      amenities: ['Ocean View', 'Balcony', 'WiFi'],
    },
    {
      id: '2',
      number: '305',
      type: 'Suite',
      floor: 3,
      status: 'dirty',
      bedType: 'King',
      maxOccupancy: 4,
      amenities: ['Ocean View', 'Living Room', 'Kitchenette'],
    },
    {
      id: '3',
      number: '423',
      type: 'Standard',
      floor: 4,
      status: 'maintenance',
      bedType: 'Twin',
      maxOccupancy: 2,
      amenities: ['WiFi'],
    }
  ],
  roomTypes: ['Standard', 'Deluxe', 'Suite', 'Presidential Suite'],
  housekeepingTasks: [],
  maintenanceIssues: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    updateRoomStatus: (state, action: PayloadAction<{ roomId: string; status: Room['status'] }>) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId);
      if (room) {
        room.status = action.payload.status;
      }
    },
    assignRoom: (state, action: PayloadAction<{ roomId: string; guestName: string }>) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId);
      if (room) {
        room.status = 'occupied';
        room.guestName = action.payload.guestName;
      }
    },
    checkoutRoom: (state, action: PayloadAction<string>) => {
      const room = state.rooms.find(r => r.id === action.payload);
      if (room) {
        room.status = 'dirty';
        room.guestName = undefined;
        room.checkOut = new Date().toISOString();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateRoomStatus, assignRoom, checkoutRoom, setLoading, setError } = roomSlice.actions;
export default roomSlice.reducer; 