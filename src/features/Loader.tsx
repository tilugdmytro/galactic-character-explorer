import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LoaderProps extends LinearProgressProps {
  value?: number;
}

export const Loader: React.FC<LoaderProps> = ({ value, ...props }) => {
  return (
    <Box sx={{ display: 'flex', mb: 2, alignItems: "center" }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          color="secondary"
          value={value}
          {...props}
        />
      </Box>
      {value !== undefined && (
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body1">{`${Math.round(value)}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

