import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import hotelSlice from './slices/hotelSlice';
import reservationSlice from './slices/reservationSlice';
import roomSlice from './slices/roomSlice';
import guestSlice from './slices/guestSlice';
import revenueSlice from './slices/revenueSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    hotel: hotelSlice,
    reservations: reservationSlice,
    rooms: roomSlice,
    guests: guestSlice,
    revenue: revenueSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 