import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import SpeedIcon from '@mui/icons-material/Speed';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CardWrapper from '../../../../styles/wrappers/CardWrapper';

const DmReconnect = () => {
  return (
    <Wrapper>
      <CardWrapper>
        <div className='body'>
          <div className='title'>Connection Issue</div>
          <Typography variant='body1'>
            We&apos;re having trouble connecting to your DryerMaster device.
            Please check the following:
          </Typography>
          <ul>
            <li>
              <WifiIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              Ensure your WiFi is on and connected to the internet.
            </li>
            <li>
              <SpeedIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              Check if your internet connection is stable and strong.
            </li>
            <li>
              <RestartAltIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              Restart your DryerMaster device and router if necessary.
            </li>
            <li>
              <ContactSupportIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              If your connection issues persist, please contact our support team
              for assistance.
            </li>
          </ul>
          <Button
            variant='contained'
            size='large'
            startIcon={<AutorenewIcon />}>
            Reconnect
          </Button>
        </div>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-weight: 500;
    display: flex;
    align-items: center;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.info.main
        : 'var(--primary-text)'};
  }
  .body {
    display: grid;
    gap: 1rem;
    ul {
      margin: 0;
      padding-left: 0px;
      list-style: none;
    }
    li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
  }
`;

export default DmReconnect;
