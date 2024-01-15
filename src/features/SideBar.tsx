import React from 'react';
import { Drawer } from '@mui/material';
import { Filters } from '../components/Filters';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SideBar: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose} sx={{ width: '250px' }}>
      <Filters onClose={onClose} />
    </Drawer>
  );
};
