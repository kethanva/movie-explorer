import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SearchOff as SearchOffIcon } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

// Empty state placeholder
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nothing found',
  message = 'Try adjusting your search or filters.',
  actionLabel,
  onAction,
}) => (
  <Box
    sx={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 2, minHeight: 300, textAlign: 'center',
    }}
  >
    <SearchOffIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.4 }} />
    <Typography variant="h6" color="text.secondary">{title}</Typography>
    <Typography variant="body2" color="text.secondary">{message}</Typography>
    {actionLabel && onAction && (
      <Button variant="contained" onClick={onAction}>{actionLabel}</Button>
    )}
  </Box>
);

export default EmptyState;
