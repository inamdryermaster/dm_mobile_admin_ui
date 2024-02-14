import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import React from 'react';
import CardWrapper from '../../../../../../styles/wrappers/CardWrapper';
import TableWrapper from '../../../../../../styles/wrappers/TableWrapper';

const OperatorActionHistory = () => {
  return (
    <Wrapper>
      <Divider>
        <h2>
          Action History <span>📜</span>
        </h2>
      </Divider>
      <CardWrapperStyle className='card'>
        <TableWrapper>
          <table className='table'>
            <thead>
              <tr>
                <th>Operator</th>
                <th>Action</th>
                <th>Value</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zaynep </td>
                <td>Moisture</td>
                <td>16</td>

                <td>12:00</td>
              </tr>
              <tr>
                <td>Wolf</td>
                <td>Mode</td>
                <td>Automatic</td>
                <td>12:00</td>
              </tr>
              <tr>
                <td>Chris</td>
                <td>Discharge</td>
                <td>35</td>
                <td>12:00</td>
              </tr>
              <tr>
                <td>Inam</td>
                <td>Mode</td>
                <td>Automatic</td>
                <td>12:00</td>
              </tr>
            </tbody>
          </table>
        </TableWrapper>
      </CardWrapperStyle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 3rem auto;
  width: 100%;
  .card {
    margin: 0 auto;
  }
  h2 {
  }
`;

const CardWrapperStyle = styled(CardWrapper)`
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
  @media (min-width: 960px) {
    width: 700px;
  }
`;

export default OperatorActionHistory;
