import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';

const CardWrapper = styled.div`
  .title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? grey[900] : 'var(--primary-2)'};
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'var(--white)' : 'var(--primary-18)'};
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 20px 20px;
  z-index: 0;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && '1px solid #333'};
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
`;

export default CardWrapper;
