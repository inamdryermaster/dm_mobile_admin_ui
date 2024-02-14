import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import email_svg from '../../assets/images/check-email.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const EmailSent = () => {
  const params = useParams();
  const { email } = params;
  return (
    <Wrapper>
      <Container>
        <Heading>
          <img
            src={email_svg}
            alt='lock'
            style={{ width: '120px', height: '120px', margin: '0px auto' }}
          />
          <Typography
            variant='h4'
            className='heading-title'>
            Request sent successfully!
          </Typography>
          <Typography
            variant='body2'
            className='new-user'>
            Check your inbox for the next steps. If you don&apos;t receive an
            email, and it&apos;s not in your spam folder this could mean you
            signed up with a different address.
          </Typography>
        </Heading>
        <Body>
          <Link
            to='/'
            className='link'>
            <Typography
              variant='body2'
              sx={{ fontWeight: 500 }}>
              <ArrowBackIosIcon sx={{ fontSize: 'small', mr: '0px' }} />
              Return to Sign in
            </Typography>
          </Link>
        </Body>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 40px 24px;
  z-index: 0;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#333' : 'white'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && '1px solid #333'};
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
  .link {
    text-decoration: none;
    color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#fff' : '#000')};
    :hover {
      text-decoration: underline;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  text-align: center;
  .heading-title {
    margin: 0px;
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.5rem;
    font-family: 'Public Sans', sans-serif;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  button {
    text-transform: capitalize;
  }
`;

export default EmailSent;
