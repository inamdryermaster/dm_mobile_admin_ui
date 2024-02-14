import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';

const TableWrapper = styled.div`
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    // button must have width only as required

    thead {
      tr {
        border-top-right-radius: 0.57rem;
        border-top-left-radius: 0.7rem;
        background-color: pink;
      }
    }
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
        theme.palette.mode === 'dark' ? '#080808' : 'var(--primary);'};
      color: white;
    }
  }
`;

export default TableWrapper;
