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
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayArrow,
  Check,
  Warning,
  Error,
  Info,
  Assessment,
  AccountBalance,
  Receipt,
  Hotel,
  Schedule,
  Print,
  Download,
} from '@mui/icons-material';
import { MOCK_NIGHT_AUDIT_TASKS, NightAuditTask } from '../data/mockData';

const NightAudit: React.FC = () => {
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditComplete, setAuditComplete] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check color="success" />;
      case 'running': return <Schedule color="info" />;
      case 'error': return <Error color="error" />;
      case 'warning': return <Warning color="warning" />;
      default: return <Info color="disabled" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'running': return 'info';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={600} sx={{ 
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Night Audit Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Automated end-of-day processing • System maintenance • Report generation
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            startIcon={<PlayArrow />} 
            size="large"
            disabled={auditRunning}
            onClick={() => setAuditRunning(true)}
          >
            Start Night Audit
          </Button>
        </Stack>
      </Stack>

      {/* Audit Status Overview */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Current Status
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {auditRunning ? 'Running' : auditComplete ? 'Completed' : 'Ready to Start'}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Schedule sx={{ fontSize: 40, color: 'info.main' }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Business Date
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Hotel sx={{ fontSize: 40, color: 'success.main' }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Occupancy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  85% (170/200 rooms)
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Audit Progress */}
      {auditRunning && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Audit Progress
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={auditProgress} 
            sx={{ height: 8, borderRadius: 4, mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {auditProgress}% Complete
          </Typography>
        </Paper>
      )}

      {/* Audit Tasks */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Night Audit Tasks
          </Typography>
          <List>
            {MOCK_NIGHT_AUDIT_TASKS.map((task: NightAuditTask, index: number) => (
              <React.Fragment key={task.id}>
                <ListItem>
                  <ListItemIcon>
                    {getStatusIcon(task.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={task.name}
                    secondary={`Scheduled: ${task.time}`}
                  />
                  <Chip 
                    label={task.status.toUpperCase()} 
                    size="small"
                    color={getStatusColor(task.status) as any}
                    variant={task.status === 'running' ? 'filled' : 'outlined'}
                  />
                </ListItem>
                {index < MOCK_NIGHT_AUDIT_TASKS.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Pre-Audit Checklist
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Check color="success" />
                </ListItemIcon>
                <ListItemText primary="All in-house folios balanced" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check color="success" />
                </ListItemIcon>
                <ListItemText primary="Front office cashier balanced" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Warning color="warning" />
                </ListItemIcon>
                <ListItemText primary="2 credit card batches pending" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check color="success" />
                </ListItemIcon>
                <ListItemText primary="Room status verified" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Reports & Documents
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="outlined" 
                startIcon={<Receipt />} 
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Daily Revenue Report
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<AccountBalance />} 
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                City Ledger Trial Balance
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Hotel />} 
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Room Revenue Summary
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Assessment />} 
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Manager Flash Report
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Alerts & Notifications */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Alerts & Notifications
        </Typography>
        <Stack spacing={2}>
          <Alert severity="warning">
            <Typography variant="body2">
              <strong>Credit Card Settlement:</strong> 2 batches require manual settlement before audit can proceed.
            </Typography>
          </Alert>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Rate Update:</strong> New corporate rates will be applied during tonight's audit process.
            </Typography>
          </Alert>
          <Alert severity="success">
            <Typography variant="body2">
              <strong>System Backup:</strong> Successfully completed at 23:45. All data secured.
            </Typography>
          </Alert>
        </Stack>
      </Box>
    </Box>
  );
};

export default NightAudit; 