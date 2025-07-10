import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './components/layout/MainLayout';

// Import Oracle OPERA standard pages
import Dashboard from './pages/Dashboard';
import FrontDesk from './pages/FrontDesk';
import Reservations from './pages/Reservations';
import RoomManagement from './pages/RoomManagement';
import RevenueManagement from './pages/RevenueManagement';
import ChannelManager from './pages/ChannelManager';
import Housekeeping from './pages/Housekeeping';
import Reports from './pages/Reports';
import GuestProfiles from './pages/GuestProfiles';

// Oracle Opera Core Features
import EventManagement from './pages/EventManagement';
import FinancialAccounting from './pages/FinancialAccounting';
import POS from './pages/POS';
import NightAudit from './pages/NightAudit';
import RateCalendar from './pages/RateCalendar';
import ManagerFlash from './pages/ManagerFlash';
import RoomRack from './pages/RoomRack';

// Oracle Opera professional theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Main Dashboard */}
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Front Office Operations */}
              <Route path="front-desk" element={<FrontDesk />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="guest-profiles" element={<GuestProfiles />} />
              
              {/* Room Operations */}
              <Route path="room-rack" element={<RoomRack />} />
              <Route path="rooms" element={<RoomManagement />} />
              <Route path="housekeeping" element={<Housekeeping />} />
              
              {/* Revenue Management */}
              <Route path="revenue-management" element={<RevenueManagement />} />
              <Route path="channel-manager" element={<ChannelManager />} />
              <Route path="rate-calendar" element={<RateCalendar />} />
              
              {/* Financial & POS */}
              <Route path="financial" element={<FinancialAccounting />} />
              <Route path="pos" element={<POS />} />
              
              {/* Events & Catering */}
              <Route path="event-management" element={<EventManagement />} />
              
              {/* Night Audit */}
              <Route path="night-audit" element={<NightAudit />} />
              
              {/* System Configuration */}
              
              {/* Reports */}
              <Route path="reports" element={<Reports />} />
              <Route path="manager-flash" element={<ManagerFlash />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
