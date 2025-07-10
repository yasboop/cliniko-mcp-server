import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Restaurant,
  LocalBar,
  RoomService,
  Spa,
  Store,
  Inventory,
  MonetizationOn,
  CreditCard,
  Payment,
  Room,
  Add,
  Edit,
  Delete,
  Search,
  Print,
  Receipt,
  ShoppingCart,
  AttachMoney,
  Calculate,
} from '@mui/icons-material';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  available: boolean;
}

interface Order {
  id: string;
  orderNumber: string;
  outlet: string;
  table?: string;
  room?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
  status: string;
  server: string;
  timestamp: Date;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  modifications: string[];
  itemTotal: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const POS: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [paymentDialog, setPaymentDialog] = useState(false);

  // Sample data for Oracle Simphony POS
  const menuItems: MenuItem[] = [
    {
      id: 'M001',
      name: 'Caesar Salad',
      price: 18.00,
      category: 'Appetizers',
      description: 'Fresh romaine lettuce, parmesan cheese, croutons',
      available: true,
    },
    {
      id: 'M002',
      name: 'Grilled Salmon',
      price: 32.00,
      category: 'Main Course',
      description: 'Atlantic salmon with seasonal vegetables',
      available: true,
    },
    {
      id: 'M003',
      name: 'Chocolate Cake',
      price: 12.00,
      category: 'Desserts',
      description: 'Rich chocolate cake with vanilla ice cream',
      available: true,
    },
    {
      id: 'B001',
      name: 'Red Wine',
      price: 45.00,
      category: 'Beverages',
      description: 'House red wine by the bottle',
      available: true,
    },
    {
      id: 'B002',
      name: 'Cocktail - Martini',
      price: 16.00,
      category: 'Beverages',
      description: 'Classic dry martini',
      available: true,
    },
  ];

  const recentOrders: Order[] = [
    {
      id: 'ORD001',
      orderNumber: 'T001-001',
      outlet: 'Main Restaurant',
      table: 'Table 5',
      items: [],
      subtotal: 65.00,
      tax: 6.50,
      serviceCharge: 9.75,
      total: 81.25,
      status: 'Completed',
      server: 'John Smith',
      timestamp: new Date('2025-07-08 19:30'),
    },
    {
      id: 'ORD002',
      orderNumber: 'R201-001',
      outlet: 'Room Service',
      room: 'Room 201',
      items: [],
      subtotal: 42.00,
      tax: 4.20,
      serviceCharge: 6.30,
      total: 52.50,
      status: 'In Progress',
      server: 'Sarah Johnson',
      timestamp: new Date('2025-07-08 20:15'),
    },
    {
      id: 'ORD003',
      orderNumber: 'BAR-015',
      outlet: 'Lobby Bar',
      table: 'Bar Seat 3',
      items: [],
      subtotal: 38.00,
      tax: 3.80,
      serviceCharge: 5.70,
      total: 47.50,
      status: 'Completed',
      server: 'Mike Davis',
      timestamp: new Date('2025-07-08 21:00'),
    },
  ];

  const outlets = [
    { id: 'restaurant', name: 'Main Restaurant', type: 'Restaurant' },
    { id: 'bar', name: 'Lobby Bar', type: 'Bar' },
    { id: 'roomservice', name: 'Room Service', type: 'Room Service' },
    { id: 'spa', name: 'Spa Café', type: 'Spa' },
    { id: 'retail', name: 'Gift Shop', type: 'Retail' },
    { id: 'minibar', name: 'Mini Bar', type: 'Mini Bar' },
  ];

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Spa Services', 'Retail Items'];

  const addToOrder = (menuItem: MenuItem) => {
    const existingItem = currentOrder.find(item => item.menuItem.id === menuItem.id);
    
    if (existingItem) {
      setCurrentOrder(currentOrder.map(item =>
        item.menuItem.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1, itemTotal: (item.quantity + 1) * menuItem.price }
          : item
      ));
    } else {
      setCurrentOrder([...currentOrder, {
        menuItem,
        quantity: 1,
        modifications: [],
        itemTotal: menuItem.price,
      }]);
    }
  };

  const removeFromOrder = (menuItemId: string) => {
    setCurrentOrder(currentOrder.filter(item => item.menuItem.id !== menuItemId));
  };

  const getOrderSubtotal = () => {
    return currentOrder.reduce((sum, item) => sum + item.itemTotal, 0);
  };

  const getOrderTax = () => {
    return getOrderSubtotal() * 0.10; // 10% tax
  };

  const getServiceCharge = () => {
    return getOrderSubtotal() * 0.15; // 15% service charge
  };

  const getOrderTotal = () => {
    return getOrderSubtotal() + getOrderTax() + getServiceCharge();
  };

  const processPayment = (paymentType: string) => {
    // Process payment logic
    setPaymentDialog(false);
    setCurrentOrder([]);
    alert(`Payment processed via ${paymentType}`);
  };

  const filteredMenuItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Oracle Simphony POS
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Point of Sale System - Restaurant, Bar, Room Service & Retail
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<Receipt />}>
            Reports
          </Button>
          <Button variant="outlined" startIcon={<Calculate />}>
            End of Day
          </Button>
        </Stack>
      </Stack>

      {/* POS Statistics */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Today's Sales
                </Typography>
                <Typography variant="h5" fontWeight={600} color="success.main">
                  $8,450
                </Typography>
              </Box>
              <AttachMoney sx={{ fontSize: 40, color: 'success.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Orders Today
                </Typography>
                <Typography variant="h5" fontWeight={600} color="primary.main">
                  127
                </Typography>
              </Box>
              <ShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Average Check
                </Typography>
                <Typography variant="h5" fontWeight={600} color="info.main">
                  $66.54
                </Typography>
              </Box>
              <Receipt sx={{ fontSize: 40, color: 'info.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Active Tables
                </Typography>
                <Typography variant="h5" fontWeight={600} color="warning.main">
                  18
                </Typography>
              </Box>
              <Restaurant sx={{ fontSize: 40, color: 'warning.main' }} />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
            <Tab icon={<Restaurant />} label="Restaurant" />
            <Tab icon={<LocalBar />} label="Bar" />
            <Tab icon={<RoomService />} label="Room Service" />
            <Tab icon={<Spa />} label="Spa Services" />
            <Tab icon={<Store />} label="Retail" />
            <Tab icon={<Receipt />} label="Reports" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          {/* Restaurant POS */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Items Section */}
            <Paper sx={{ p: 3, flex: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Menu Items
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 500, overflow: 'auto' }}>
                {filteredMenuItems.map((item) => (
                  <Card 
                    key={item.id} 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => addToOrder(item)}
                  >
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                          <Chip 
                            label={item.category} 
                            size="small" 
                            sx={{ mt: 1 }}
                          />
                        </Box>
                        <Typography variant="h6" color="primary.main">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>

            {/* Current Order Section */}
            <Paper sx={{ p: 3, flex: 1, minWidth: 300 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Current Order
              </Typography>

              {currentOrder.length === 0 ? (
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                  No items in order
                </Typography>
              ) : (
                <>
                  <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
                    {currentOrder.map((item, index) => (
                      <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="body1" fontWeight={600}>
                              {item.menuItem.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Qty: {item.quantity} × ${item.menuItem.price.toFixed(2)}
                            </Typography>
                          </Box>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body1" fontWeight={600}>
                              ${item.itemTotal.toFixed(2)}
                            </Typography>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => removeFromOrder(item.menuItem.id)}
                            >
                              <Delete />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Subtotal:</Typography>
                      <Typography>${getOrderSubtotal().toFixed(2)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Tax (10%):</Typography>
                      <Typography>${getOrderTax().toFixed(2)}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Service (15%):</Typography>
                      <Typography>${getServiceCharge().toFixed(2)}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6" fontWeight={600}>Total:</Typography>
                      <Typography variant="h6" fontWeight={600} color="primary.main">
                        ${getOrderTotal().toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<Payment />}
                    sx={{ mt: 3 }}
                    onClick={() => setPaymentDialog(true)}
                  >
                    Process Payment
                  </Button>
                </>
              )}
            </Paper>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* Bar POS */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Bar Point of Sale
            </Typography>
            <Alert severity="info">
              Bar service with cocktails, wine, beer, and premium spirits. Integrated with room charging capabilities.
            </Alert>
            {/* Bar specific functionality would go here */}
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* Room Service POS */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Room Service Orders
            </Typography>
            <Alert severity="info">
              Room service orders with direct folio posting. Delivery tracking and room location management.
            </Alert>
            {/* Room service specific functionality would go here */}
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {/* Spa Services */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Spa Services Point of Sale
            </Typography>
            <Alert severity="info">
              Spa treatments, wellness services, and retail products. Appointment integration and staff scheduling.
            </Alert>
            {/* Spa specific functionality would go here */}
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          {/* Retail POS */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              Retail Point of Sale
            </Typography>
            <Alert severity="info">
              Gift shop, merchandise, and retail products. Inventory management and guest room charging.
            </Alert>
            {/* Retail specific functionality would go here */}
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          {/* Reports */}
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={600}>
              POS Reports & Analytics
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Card sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Daily Reports
                  </Typography>
                  <Stack spacing={2}>
                    <Button variant="outlined" fullWidth startIcon={<Receipt />}>
                      Daily Sales Summary
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Receipt />}>
                      Server Performance
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Receipt />}>
                      Menu Item Analysis
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Receipt />}>
                      Payment Methods
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Management Reports
                  </Typography>
                  <Stack spacing={2}>
                    <Button variant="outlined" fullWidth startIcon={<MonetizationOn />}>
                      Revenue by Outlet
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<MonetizationOn />}>
                      Cost Analysis
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<MonetizationOn />}>
                      Inventory Levels
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<MonetizationOn />}>
                      Labor Cost Report
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>
              Recent Orders
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order #</TableCell>
                    <TableCell>Outlet</TableCell>
                    <TableCell>Table/Room</TableCell>
                    <TableCell>Server</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.outlet}</TableCell>
                      <TableCell>{order.table || order.room}</TableCell>
                      <TableCell>{order.server}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status}
                          size="small"
                          color={order.status === 'Completed' ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>{order.timestamp.toLocaleTimeString()}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small">
                            <Print />
                          </IconButton>
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </TabPanel>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Process Payment</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Typography variant="h6">
              Total Amount: ${getOrderTotal().toFixed(2)}
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<MonetizationOn />}
                onClick={() => processPayment('Cash')}
              >
                Cash
              </Button>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<CreditCard />}
                onClick={() => processPayment('Credit Card')}
              >
                Credit Card
              </Button>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<Room />}
                onClick={() => processPayment('Room Charge')}
              >
                Charge to Room
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default POS; 