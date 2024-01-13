import React from 'react';
import { Typography, List, ListItem, Box } from '@mui/material';

interface InfoListProps {
  title: string;
  items: { [key: string]: string }[];
  itemKey: string;
}

export const InfoList: React.FC<InfoListProps> = ({ title, items, itemKey }) => (
  <Box sx={{ borderRadius: 4, padding: 2, boxShadow: "0px 0px 9px 2px rgba(32,250,58,1)" }}>
    <Typography variant="h5" gutterBottom>
      {title}
      :
    </Typography>
    {items.length > 0 ? (
      <List>
        {items.map((item) => (
          <ListItem key={item[itemKey]}>
            {item[itemKey]}
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography sx={{ color: 'text.secondary' }} gutterBottom>
        No info
      </Typography>
    )}
  </Box>
);
