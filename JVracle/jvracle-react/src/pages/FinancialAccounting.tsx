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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  Receipt,
  Payment,
  CreditCard,
  MonetizationOn,
  Assessment,
  TrendingUp,
  AccountBalanceWallet,
  Calculate,
  Print,
  Download,
  Add,
  Edit,
  Delete,
  Search,
  Business,
  AttachMoney,
  SwapHoriz,
  LocalAtm,
  CurrencyExchange,
  Security,
  Refresh,
} from '@mui/icons-material';
import { 
  MOCK_FOLIOS, 
  MOCK_GUESTS,
  MOCK_CITY_LEDGER, 
  MOCK_GL_ACCOUNTS, 
  MOCK_TAXES, 
  MOCK_CURRENCY_RATES,
  Folio,
  Guest,
  CityLedgerAccount,
  GLAccount,
  TaxConfiguration,
  CurrencyRate
} from '../data/mockData';

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

const FinancialAccounting: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Sample data based on Oracle OPERA
  const financialSummary = {
    totalRevenue: 485750,
    netIncome: 126400,
    cashPosition: 75300,
    accountsReceivable: 42850,
    totalAssets: 2845000,
    totalLiabilities: 1156000,
    totalEquity: 1689000,
    occupancyRevenue: 385000,
    fbRevenue: 100750,
    totalExpenses: 359350,
  };

  const getGuestName = (guestId: string) => {
    const guest = MOCK_GUESTS.find((g: Guest) => g.id === guestId);
    return guest ? `${guest.firstName} ${guest.lastName}` : 'N/A';
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Financial Accounting
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Oracle OPERA Financial Management & Accounting System
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<Assessment />}>
            Financial Reports
          </Button>
          <Button variant="outlined" startIcon={<Calculate />}>
            Night Audit
          </Button>
        </Stack>
      </Stack>

      {/* Financial Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Total Revenue
                </Typography>
                <Typography variant="h5" fontWeight={600} color="success.main">
                  ${financialSummary.totalRevenue.toLocaleString()}
                </Typography>
              </Box>
              <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Net Income
                </Typography>
                <Typography variant="h5" fontWeight={600} color="primary.main">
                  ${financialSummary.netIncome.toLocaleString()}
                </Typography>
              </Box>
              <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Cash Position
                </Typography>
                <Typography variant="h5" fontWeight={600} color="info.main">
                  ${financialSummary.cashPosition.toLocaleString()}
                </Typography>
              </Box>
              <AccountBalanceWallet sx={{ fontSize: 40, color: 'info.main' }} />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  A/R Outstanding
                </Typography>
                <Typography variant="h5" fontWeight={600} color="warning.main">
                  ${financialSummary.accountsReceivable.toLocaleString()}
                </Typography>
              </Box>
              <Receipt sx={{ fontSize: 40, color: 'warning.main' }} />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
            <Tab icon={<Receipt />} label="Guest Folios" />
            <Tab icon={<Business />} label="City Ledger" />
            <Tab icon={<AccountBalance />} label="General Ledger" />
            <Tab icon={<Calculate />} label="Tax Management" />
            <Tab icon={<CurrencyExchange />} label="Currency Exchange" />
            <Tab icon={<Assessment />} label="Financial Reports" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          {/* Guest Folios */}
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Guest Folios Management
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<Add />}>
                  New Folio
                </Button>
                <Button variant="outlined" startIcon={<Search />}>
                  Search Folios
                </Button>
              </Stack>
            </Stack>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Folio #</TableCell>
                    <TableCell>Guest Name</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>Check-in</TableCell>
                    <TableCell>Charges</TableCell>
                    <TableCell>Payments</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_FOLIOS.map((folio: Folio) => (
                    <TableRow key={folio.id}>
                      <TableCell>{folio.folioNumber}</TableCell>
                      <TableCell>{getGuestName(folio.guestId)}</TableCell>
                      <TableCell>{folio.roomNumber}</TableCell>
                      <TableCell>{new Date(folio.checkInDate).toLocaleDateString()}</TableCell>
                      <TableCell>${folio.totalCharges.toFixed(2)}</TableCell>
                      <TableCell>${folio.totalPayments.toFixed(2)}</TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={folio.balance > 0 ? 'error.main' : 'success.main'}
                          fontWeight={600}
                        >
                          ${folio.balance.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={folio.status}
                          size="small"
                          color={folio.status === 'open' ? 'success' : 'info'}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                          <IconButton size="small">
                            <Print />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <Payment />
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

        <TabPanel value={activeTab} index={1}>
          {/* City Ledger */}
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                City Ledger Accounts
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<Add />}>
                  New Account
                </Button>
                <Button variant="outlined" startIcon={<Download />}>
                  Export A/R
                </Button>
              </Stack>
            </Stack>

            <Alert severity="info">
              Total Outstanding A/R: ${MOCK_CITY_LEDGER.reduce((sum: number, acc: CityLedgerAccount) => sum + acc.currentBalance, 0).toLocaleString()}
            </Alert>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Account</TableCell>
                    <TableCell>Contact Person</TableCell>
                    <TableCell>Credit Limit</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Terms (Days)</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_CITY_LEDGER.map((account: CityLedgerAccount) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        <Typography fontWeight={600}>{account.accountName}</Typography>
                        <Typography variant="body2" color="text.secondary">{account.accountNumber}</Typography>
                      </TableCell>
                      <TableCell>{account.contactPerson}</TableCell>
                      <TableCell>${account.creditLimit.toLocaleString()}</TableCell>
                      <TableCell>
                        <Typography color="error.main" fontWeight={600}>
                          ${account.currentBalance.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{account.paymentTerms}</TableCell>
                      <TableCell>
                        <Chip 
                          label={account.status}
                          size="small"
                          color={account.status === 'Active' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small"><Edit /></IconButton>
                          <IconButton size="small"><Receipt /></IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* General Ledger */}
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                General Ledger Accounts
              </Typography>
              <Stack direction="row" spacing={2}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Account Type</InputLabel>
                  <Select label="Account Type" defaultValue="All">
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Asset">Assets</MenuItem>
                    <MenuItem value="Liability">Liabilities</MenuItem>
                    <MenuItem value="Revenue">Revenue</MenuItem>
                    <MenuItem value="Expense">Expenses</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<Print />}>
                  Trial Balance
                </Button>
              </Stack>
            </Stack>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Card sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Balance Sheet Summary
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Total Assets</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        ${financialSummary.totalAssets.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Total Liabilities</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        ${financialSummary.totalLiabilities.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1" fontWeight={600}>Total Equity</Typography>
                      <Typography variant="body1" fontWeight={600} color="primary.main">
                        ${financialSummary.totalEquity.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Income Statement Summary
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Room Revenue</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        ${financialSummary.occupancyRevenue.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">F&B Revenue</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        ${financialSummary.fbRevenue.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Total Expenses</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        ${financialSummary.totalExpenses.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1" fontWeight={600}>Net Income</Typography>
                      <Typography variant="body1" fontWeight={600} color="success.main">
                        ${financialSummary.netIncome.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Debits</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Last Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_GL_ACCOUNTS.map((account: GLAccount) => (
                    <TableRow key={account.accountCode}>
                      <TableCell>{account.accountCode}</TableCell>
                      <TableCell>{account.accountName}</TableCell>
                      <TableCell>{account.accountType}</TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>
                          ${account.balance.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>${account.debitTotal.toLocaleString()}</TableCell>
                      <TableCell>${account.creditTotal.toLocaleString()}</TableCell>
                      <TableCell>{new Date(account.lastActivity).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </TabPanel>
        
        <TabPanel value={activeTab} index={3}>
          {/* Tax Configuration */}
          <Stack spacing={3}>
             <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Tax Configuration
              </Typography>
              <Button variant="outlined" startIcon={<Add />}>
                Add Tax Rule
              </Button>
            </Stack>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tax Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Applicable To</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_TAXES.map((tax: TaxConfiguration) => (
                    <TableRow key={tax.id}>
                      <TableCell>{tax.taxName}</TableCell>
                      <TableCell>{tax.taxCode}</TableCell>
                      <TableCell>{tax.rate}%</TableCell>
                      <TableCell>{tax.type}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {tax.applicableServices.map(s => <Chip key={s} label={s} size="small"/>)}
                        </Stack>
                      </TableCell>
                      <TableCell><IconButton size="small"><Edit /></IconButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          {/* Currency Exchange */}
           <Stack spacing={3}>
             <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Currency Exchange Rates
              </Typography>
              <Button variant="outlined" startIcon={<Refresh />}>
                Update Rates
              </Button>
            </Stack>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell>Buy Rate</TableCell>
                    <TableCell>Sell Rate</TableCell>
                    <TableCell>Last Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_CURRENCY_RATES.map((rate: CurrencyRate) => (
                    <TableRow key={rate.currency}>
                      <TableCell>{rate.currency} ({rate.currencyName})</TableCell>
                      <TableCell>{rate.buyRate}</TableCell>
                      <TableCell>{rate.sellRate}</TableCell>
                      <TableCell>{new Date(rate.lastUpdated).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </TabPanel>

      </Card>
    </Box>
  );
};

export default FinancialAccounting; 