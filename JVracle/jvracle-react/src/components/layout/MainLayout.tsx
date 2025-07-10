import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Select,
  FormControl,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Hotel as HotelIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  BedroomParent as RoomIcon,
  TrendingUp as RevenueIcon,
  Language as ChannelIcon,
  CleaningServices as HousekeepingIcon,
  Assessment as ReportsIcon,
  AccountCircle,
  Notifications,
  Settings,
  MenuOpen,
  Menu as MenuIcon,
  Psychology,
  Analytics,
  AutoAwesome,
  SmartToy,
  Speed,
  Engineering,
  Star,
  Insights,
  ViewModule,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const drawerWidth = 280;

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  path: string;
  badge?: number;
  category: string;
}

const navigationItems: NavigationItem[] = [
  // Dashboard
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', category: 'Command Center' },
  
  // Front Office
  { id: 'front-desk', label: 'Front Desk', icon: <HotelIcon />, path: '/front-desk', badge: 12, category: 'Front Office' },
  { id: 'reservations', label: 'Reservations', icon: <CalendarIcon />, path: '/reservations', badge: 45, category: 'Front Office' },
  { id: 'guest-profiles', label: 'Guest Profiles', icon: <PeopleIcon />, path: '/guest-profiles', category: 'Front Office' },
  
  // Room Operations  
  { id: 'room-rack', label: 'Room Rack', icon: <ViewModule />, path: '/room-rack', category: 'Room Operations' },
  { id: 'room-management', label: 'Room Management', icon: <RoomIcon />, path: '/rooms', category: 'Room Operations' },
  { id: 'housekeeping', label: 'Housekeeping', icon: <HousekeepingIcon />, path: '/housekeeping', badge: 8, category: 'Room Operations' },
  
  // Revenue Management
  { id: 'revenue-management', label: 'Revenue Management', icon: <RevenueIcon />, path: '/revenue-management', category: 'Revenue Management' },
  { id: 'rate-calendar', label: 'Rate Calendar', icon: <CalendarIcon />, path: '/rate-calendar', category: 'Revenue Management' },
  { id: 'channel-manager', label: 'Channel Manager', icon: <ChannelIcon />, path: '/channel-manager', category: 'Revenue Management' },
  
  // Financial & POS
  { id: 'financial', label: 'Financial Accounting', icon: <ReportsIcon />, path: '/financial', category: 'Financial & POS' },
  { id: 'pos', label: 'Point of Sale', icon: <Settings />, path: '/pos', category: 'Financial & POS' },
  
  // Events & Catering
  { id: 'event-management', label: 'Event Management', icon: <CalendarIcon />, path: '/event-management', category: 'Events & Catering' },
  
  // Night Audit & Administration
  { id: 'night-audit', label: 'Night Audit', icon: <ReportsIcon />, path: '/night-audit', category: 'Administration' },
  
  // Reports
  { id: 'reports', label: 'Reports', icon: <ReportsIcon />, path: '/reports', category: 'Reports' },
  { id: 'manager-flash', label: 'Manager Flash', icon: <ReportsIcon />, path: '/manager-flash', category: 'Reports' },
];

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Mock data for now - will connect to Redux later
  const user = {
    name: 'Hotel Manager',
    role: 'Front Desk Supervisor',
    email: 'manager@jvracle.com'
  };
  const currentProperty = {
    id: '1',
    name: 'Grand Luxury Resort',
    location: 'Miami Beach, FL',
    rooms: 305
  };
  const properties = [
    { id: '1', name: 'Grand Luxury Resort', location: 'Miami Beach, FL', rooms: 305 },
    { id: '2', name: 'Business Hotel Downtown', location: 'New York, NY', rooms: 180 }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const groupedNavigation = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #34495e' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HotelIcon sx={{ fontSize: 32, color: '#3498db' }} />
          <Box>
            <Typography variant="h6" sx={{ color: '#ecf0f1', fontWeight: 700 }}>
              JVracle
            </Typography>
            <Chip 
              label="Oracle OPERA Core" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(52, 152, 219, 0.2)', 
                color: '#3498db',
                fontSize: '0.7rem',
                height: 20
              }} 
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {Object.entries(groupedNavigation).map(([category, items]) => (
          <Box key={category}>
            <Typography 
              variant="overline" 
              sx={{ 
                px: 3, 
                py: 2, 
                display: 'block',
                color: '#bdc3c7',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: 1
              }}
            >
              {category}
            </Typography>
            <List disablePadding>
              {items.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate(item.path)}
                    selected={location.pathname === item.path}
                    sx={{
                      mx: 1,
                      borderRadius: 2,
                      '&.Mui-selected': {
                        backgroundColor: '#34495e',
                        borderLeft: '3px solid #e74c3c',
                        '&:hover': {
                          backgroundColor: '#34495e',
                        },
                      },
                      '&:hover': {
                        backgroundColor: '#34495e',
                        borderLeft: '3px solid #3498db',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: location.pathname === item.path ? 600 : 400
                      }}
                    />
                    {item.badge && (
                      <Badge 
                        badgeContent={item.badge} 
                        color="error" 
                        sx={{
                          '& .MuiBadge-badge': {
                            fontSize: '0.7rem',
                            height: 18,
                            minWidth: 18
                          }
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ borderColor: '#34495e', my: 1 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` }, 
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <FormControl size="small" sx={{ minWidth: 200, mr: 3 }}>
              <Select
                value={currentProperty?.id || ''}
                displayEmpty
                sx={{
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 2,
                  '& .MuiSelect-icon': { color: 'white' },
                  '&:before, &:after': { display: 'none' }
                }}
              >
                {properties.map((property) => (
                  <MenuItem key={property.id} value={property.id}>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {property.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {property.location} • {property.rooms} rooms
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton color="inherit">
              <Settings />
            </IconButton>
            
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{ 
                ml: 1,
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                px: 2
              }}
            >
              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <AccountCircle />
              </Avatar>
              <Box sx={{ textAlign: 'left', color: 'white' }}>
                <Typography variant="body2" fontWeight={600}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {user?.role}
                </Typography>
              </Box>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#2c3e50',
              color: '#ecf0f1'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#2c3e50',
              color: '#ecf0f1'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 