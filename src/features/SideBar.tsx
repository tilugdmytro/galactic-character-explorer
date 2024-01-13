/* eslint-disable no-console */
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  MenuItem,
  Select,
  Divider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalContext } from '../utils/GlobalProvider';

interface Props {
  open: boolean;
  onClose: () => void;
}

const GENDERS = ['Male', 'Female', 'Other'];

export const SideBar: React.FC<Props> = ({ open, onClose }) => {
  const { movies } = useContext(GlobalContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get('gender') || '';
  const movie = searchParams.get('movie') || '';
  const minMass = searchParams.get('minMass') || '';
  const maxMass = searchParams.get('maxMass') || '';

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('gender');
    params.delete('movie');
    params.delete('minMass');
    params.delete('maxMass');
    setSearchParams(params);
  };

  const handleChange = (filterKey: string, newValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (newValue) {
      params.set(filterKey, newValue);
    } else {
      params.delete(filterKey);
    }

    setSearchParams(params);
  };

  const validateAndHandleChange = (filterKey: string, inputValue: string, minValue = 0) => {
    const numericValue = Math.max(minValue, parseInt(inputValue, 10) || minValue);

    handleChange(filterKey, numericValue.toString());
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose} sx={{ width: '250px' }}>
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <IconButton sx={{ alignSelf: 'flex-end', color: 'text.primary' }} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
          Filters
        </Typography>

        {/* Gender filter */}
        <Typography variant="h6">Gender</Typography>
        <RadioGroup value={gender} onChange={(e) => handleChange('gender', e.target.value)} row>
          {GENDERS.map((sex) => (
            <FormControlLabel
              key={sex}
              value={sex}
              control={(
                <Radio
                  sx={{
                    color: 'text.primary',
                    '&.Mui-checked': {
                      color: 'text.primary',
                    },
                  }}
                />
              )}
              label={sex}
            />
          ))}
        </RadioGroup>
        <Divider />

        {/* Movies filter */}
        <Typography variant="h6">Movies</Typography>
        <Select
          value={movie}
          onChange={(e) => handleChange('movie', e.target.value)}
          sx={{
            '& fieldset': {
              borderColor: 'text.primary',
            },
            '& .MuiSelect-icon': {
              color: 'text.primary',
            },
          }}
        >
          {movies.map((film) => (
            <MenuItem
              key={film.title}
              value={film.title}
            >
              {film.title}
            </MenuItem>
          ))}
        </Select>
        <Divider />

        {/* Mass filter */}
        <Typography variant="h6">Mass (kg)</Typography>
        <TextField
          label="Min"
          variant="outlined"
          color="secondary"
          type="number"
          value={minMass}
          sx={{
            '& fieldset': {
              borderColor: 'text.primary',
            },
          }}
          onChange={(e) => validateAndHandleChange('minMass', e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value.replace(/[^0-9]/g, '');

            validateAndHandleChange('minMass', inputValue);
          }}
        />
        <TextField
          label="Max"
          variant="outlined"
          color="secondary"
          type="number"
          value={maxMass}
          sx={{
            '& fieldset': {
              borderColor: 'text.primary',
            },
          }}
          onChange={(e) => validateAndHandleChange('maxMass', e.target.value)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value.replace(/[^0-9]/g, '');

            validateAndHandleChange('maxMass', inputValue);
          }}
        />

        {/* Buttons */}
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </Box>
    </Drawer>
  );
};
