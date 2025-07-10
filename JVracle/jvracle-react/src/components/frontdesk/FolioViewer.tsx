import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import { Print, Download } from '@mui/icons-material';
import { Reservation, Guest, Room, Folio, MOCK_GUESTS, MOCK_ROOMS, MOCK_FOLIOS } from '../../data/mockData';

interface FolioViewerProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

const FolioViewer: React.FC<FolioViewerProps> = ({
  open,
  onClose,
  reservation
}) => {
  if (!reservation) return null;

  const guest = MOCK_GUESTS.find(g => g.id === reservation.guestId);
  const room = MOCK_ROOMS.find(r => r.id === reservation.roomId);
  const folio = MOCK_FOLIOS.find(f => f.reservationId === reservation.id);

  const transactions = folio ? folio.transactions : [];
  const totalCharges = folio ? folio.totalCharges : 0;
  const totalCredits = folio ? folio.totalPayments : 0;
  const currentBalance = folio ? folio.balance : 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Guest Folio</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" startIcon={<Print />}>
              Print
            </Button>
            <Button variant="outlined" size="small" startIcon={<Download />}>
              Export
            </Button>
          </Stack>
        </Stack>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          {/* Guest Information */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Guest Information
          </Typography>
          <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Guest Name</Typography>
              <Typography variant="body1" fontWeight={600}>{guest ? `${guest.firstName} ${guest.lastName}` : 'N/A'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Room Number</Typography>
              <Typography variant="body1" fontWeight={600}>{room ? room.number : 'N/A'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Confirmation</Typography>
              <Typography variant="body1" fontWeight={600}>{reservation.confirmationNumber}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Stay Dates</Typography>
              <Typography variant="body1" fontWeight={600}>
                {new Date(reservation.checkInDate).toLocaleDateString()} - {new Date(reservation.checkOutDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Balance Summary */}
          <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Total Charges</Typography>
              <Typography variant="h6" color="error.main" fontWeight={600}>
                ${totalCharges.toFixed(2)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Total Credits</Typography>
              <Typography variant="h6" color="success.main" fontWeight={600}>
                ${totalCredits.toFixed(2)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Current Balance</Typography>
              <Typography variant="h6" color="primary.main" fontWeight={600}>
                ${currentBalance.toFixed(2)}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Transactions Table */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Transaction History
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight={600}>Date</Typography></TableCell>
                <TableCell><Typography fontWeight={600}>Description</Typography></TableCell>
                <TableCell><Typography fontWeight={600}>Reference</Typography></TableCell>
                <TableCell align="right"><Typography fontWeight={600}>Charges</Typography></TableCell>
                <TableCell align="right"><Typography fontWeight={600}>Credits</Typography></TableCell>
                <TableCell align="right"><Typography fontWeight={600}>Balance</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip label={transaction.reference} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">
                    {transaction.amount > 0 && (
                      <Typography color="error.main" fontWeight={600}>
                        ${transaction.amount.toFixed(2)}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.amount <= 0 && (
                      <Typography color="success.main" fontWeight={600}>
                        ${(-transaction.amount).toFixed(2)}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight={600}>
                      {/* This would need to be calculated based on running total */}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained">Process Payment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FolioViewer; 