import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useCustomTheme from './styles/theme';
import LoadingBar from './components/LodingBar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  const { mode } = useSelector((state) => state.localStorage);
  return (
    <ThemeProvider theme={useCustomTheme(mode)}>
      <CssBaseline />
      <LoadingBar />
      <Outlet />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Layout;
