import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

export const NotFound: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countInterval);
  }, []);

  if (countdown === 0) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Page not found
      </Typography>

      <Typography variant="body1">
        {`You will be redirected to Home page in ${countdown} seconds`}
      </Typography>
    </Container>
  );
};
