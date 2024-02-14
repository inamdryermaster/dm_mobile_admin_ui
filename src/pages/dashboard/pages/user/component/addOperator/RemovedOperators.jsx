import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { reactiveOperatorThunk } from '../../../../../../features/user/userOperatorSlice';
const OperatorInfo = () => {
  const { removedUsers } = useSelector((state) => state.operators);
  const dispatch = useDispatch();

  const handleReactive = (_id) => {
    dispatch(reactiveOperatorThunk(_id));
  };
  return (
    <Wrapper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'>
          <Typography>Removed Operators</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='table'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th className='actions'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {removedUsers.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <span style={{ textTransform: 'capitalize' }}>
                        {item.firstName}
                      </span>{' '}
                      <span style={{ textTransform: 'capitalize' }}>
                        {item.lastName}
                      </span>
                    </td>
                    <td>{item.email}</td>
                    <td className='buttons actions'>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleReactive(item._id)}>
                        Reactive
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  .table {
    overflow-x: auto;
    th:nth-of-type(3) {
      width: 80px;
    }

    @media (max-width: 600px) {
      th:nth-of-type(2),
      td:nth-last-of-type(2) {
        display: none;
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      // button must have width only as required

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      tr:nth-of-type(even) {
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#424242' : '#f2f2f2'};
      }
      tr:hover {
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#424242' : 'var(--primary-1)'};
      }
      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#333' : 'var(--primary);'};
        color: white;
      }
    }
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    button {
      text-transform: capitalize;
    }
  }
`;

export default OperatorInfo;
