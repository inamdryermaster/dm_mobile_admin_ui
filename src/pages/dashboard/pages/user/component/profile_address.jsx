import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileStateValues } from '../../../../../features/user/userProfileSlice';
import SearchIcon from '@mui/icons-material/Search'; // Importing the search icon

const Address = () => {
  const dispatch = useDispatch();
  const {
    formattedAddress,
    apartment,
    building,
    street,
    city,
    state,
    country,
    zipCode,
  } = useSelector((state) => state.userProfile);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(getUserProfileStateValues({ name, value }));
  };
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize Google Places Autocomplete
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded');
      return;
    }
    const input = inputRef.current.querySelector('input');
    autocompleteRef.current = new window.google.maps.places.Autocomplete(input);

    autocompleteRef.current.addListener('place_changed', onPlaceChanged);
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const components = place.address_components;
      const latitude = place.geometry?.location?.lat();
      const longitude = place.geometry?.location?.lng();

      const doorNumber =
        components.find((c) => c.types.includes('street_number'))?.long_name ||
        '';
      dispatch(
        getUserProfileStateValues({
          name: 'formattedAddress',
          value: place.formatted_address,
        })
      );
      dispatch(
        getUserProfileStateValues({ name: 'building', value: doorNumber })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'street',
          value:
            components.find((c) => c.types.includes('route'))?.long_name || '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'city',
          value:
            components.find((c) => c.types.includes('locality'))?.long_name ||
            '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'state',
          value:
            components.find((c) =>
              c.types.includes('administrative_area_level_1')
            )?.long_name || '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'country',
          value:
            components.find((c) => c.types.includes('country'))?.long_name ||
            '',
        })
      );
      dispatch(
        getUserProfileStateValues({
          name: 'zipCode',
          value:
            components.find((c) => c.types.includes('postal_code'))
              ?.long_name || '',
        })
      );
      dispatch(
        getUserProfileStateValues({ name: 'latitude', value: latitude })
      );
      dispatch(
        getUserProfileStateValues({ name: 'longitude', value: longitude })
      );
    }
  };

  return (
    <Wrapper>
      <TextField
        label='Search Address'
        type='text'
        variant='outlined'
        name='formattedAddress'
        value={formattedAddress}
        onChange={(e) => handleChange(e)}
        ref={inputRef}
        required
        InputLabelProps={{ shrink: true }}
        fullWidth
        style={{ marginBottom: '1rem' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon /> {/* The search icon */}
            </InputAdornment>
          ),
        }}
      />
      <TextFields>
        <TextField
          label='Apartment'
          type='text'
          variant='outlined'
          name='apartment'
          value={apartment}
          onChange={(e) => handleChange(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Building / House Number'
          type='text'
          variant='outlined'
          name='building'
          value={building}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Street'
          type='text'
          variant='outlined'
          name='street'
          value={street}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='City'
          type='text'
          variant='outlined'
          name='city'
          value={city}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='State / Province / Region'
          type='text'
          variant='outlined'
          name='state'
          value={state}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Country'
          type='text'
          variant='outlined'
          name='country'
          value={country}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Zip Code / Postal Code'
          type='text'
          variant='outlined'
          name='zipCode'
          value={zipCode}
          onChange={(e) => handleChange(e)}
          required
          InputLabelProps={{ shrink: true }}
        />
      </TextFields>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

const TextFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export default Address;
