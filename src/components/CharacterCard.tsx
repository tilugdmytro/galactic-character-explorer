import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Character } from '../types/Character';
import { CustomLink } from '../features/CustomLink';

interface CharacterCardProps {
  person: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ person }) => {
  const parts = person.url.split('/');
  const urlId = parts[parts.length - 2];

  return (
    <CustomLink to={`/character/${urlId}`}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 4,
          transition: 'transform 0.25s',
          '&:hover': {
            transform: 'scale(1.04)',
            boxShadow: '#20fa3a 0px 5px 10px;',
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
          }}
        >
          <Typography variant="h6">{person.name}</Typography>
        </CardContent>
      </Card>
    </CustomLink>
  );
};
