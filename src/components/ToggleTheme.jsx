import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getStateValues } from '../features/localStorage/localStorageSlice';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ToggleTheme = () => {
  const { mode } = useSelector((state) => state.localStorage);
  const dispatch = useDispatch();

  const handleClick = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mode', newMode);
    dispatch(
      getStateValues({
        name: 'mode',
        value: newMode,
      })
    );
  };

  return (
    <Button
      variant='contained'
      startIcon={mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      onClick={handleClick}>
      {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ToggleTheme;
