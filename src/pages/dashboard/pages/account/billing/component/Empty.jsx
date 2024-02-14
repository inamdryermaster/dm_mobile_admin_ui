import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FaCreditCard } from 'react-icons/fa';

import { useTheme } from '@emotion/react';

const Empty = () => {
  const theme = useTheme();

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      //   bgcolor='#f0f0f0'
      p={2}>
      <FaCreditCard
        size={60}
        color={
          theme.palette.mode === 'dark'
            ? theme.palette.grey[500]
            : theme.palette.grey[600]
        }
      />
      <Typography
        variant='h4'
        component='h1'
        gutterBottom>
        No Cards
      </Typography>
      <Typography variant='subtitle1'>No Payment Methods Detected</Typography>
    </Box>
  );
};

export default Empty;
