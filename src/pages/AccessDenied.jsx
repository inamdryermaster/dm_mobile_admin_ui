import styled from '@emotion/styled';
import image from '../assets/images/403.svg';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const AccessDenied = () => {
  return (
    <Wrapper>
      <h1>No permission</h1>
      <p>
        The page you&apos;re trying access has restricted access. Please refer
        to your system administrator.
      </p>
      <img
        src={image}
        alt='500'
      />
      <Link to='/'>
        <Button variant='contained'>Back to Home</Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  padding: 1rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
    max-width: 500px;
    text-align: center;
  }
  img {
    margin-bottom: 1rem;
    width: 400px;
    height: 400px;
    @media (max-width: 768px) {
      width: 300px;
      height: 300px;
    }
  }
`;

export default AccessDenied;
