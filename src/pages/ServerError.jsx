import styled from '@emotion/styled';
import image from '../assets/images/500.svg';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const ServerError = () => {
  return (
    <Wrapper>
      <h1>500 Internal Server Error</h1>
      <p>There was an error, please try again later.</p>
      <img
        src={image}
        alt='404'
      />
      <Link to='/'>
        <Button variant='contained'>Go Back Home</Button>
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

export default ServerError;
