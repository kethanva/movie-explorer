import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// Error alert display
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
    <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
      {message}
    </Alert>
    {onRetry && (
      <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onRetry}>
        Try Again
      </Button>
    )}
  </Box>
);

export default ErrorMessage;
