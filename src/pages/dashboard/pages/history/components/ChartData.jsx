import React from 'react';
import { data } from '../Data';
import { format } from 'date-fns';
import styled from '@emotion/styled';

const ChartData = () => {
  return (
    <Wrapper>
      <div className='chart-data'>
        <div className='header'></div>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Inlet</th>
                <th>Outlet</th>
                <th>Rate</th>
                <th>Apt</th>
                <th>Product</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {format(new Date(item?.createdAt), 'MMM d, h:mm a')}
                    </td>
                    <td className='inlet'>{item?.inlet.toFixed(0)}</td>
                    <td className='outlet'>{item?.outlet.toFixed(0)}</td>
                    <td className='rate'>{item?.rate.toFixed(0)}</td>
                    <td className='apt'>{item?.apt.toFixed(0)}</td>
                    <td className='product'>{item?.product}</td>
                    <td className='mode'>{item?.mode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .chart-data {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#333' : '#fff'};

    .header {
    }

    .table {
      tr:nth-of-type(even) {
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#444' : '#f9f9f9'};
      }
      table {
        width: 100%;
        border-collapse: collapse;
        @media (max-width: 500px) {
          overflow-x: auto;
        }
        th,
        td {
          text-align: left;
          padding: 0.5rem 0;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#333' : 'var(--primary);'};
          color: #fff;

          &:nth-of-type(n + 2) {
            text-align: center;
          }
          //first child
          &:first-of-type {
            padding-left: 1rem;
          }

          &:last-of-type {
            padding-right: 1rem;
          }
          @media (max-width: 500px) {
            font-size: 0.8rem;
          }
          position: sticky;
          top: 7.4rem;
          z-index: 999;
        }

        td {
          &:nth-of-type(n + 2) {
            text-align: center;
          }
          &:first-of-type {
            padding-left: 1rem;
            @media (max-width: 500px) {
              font-size: 0.8rem;
            }
          }
          &:last-of-type {
            padding-right: 1rem;
            @media (max-width: 500px) {
              font-size: 0.8rem;
            }
          }
          //second last child
          &:nth-last-of-type(2) {
            @media (max-width: 500px) {
              font-size: 0.8rem;
            }
          }
        }

        .inlet {
          background-color: ${({ theme }) =>
            theme.palette.mode !== 'dark' && '#5cb85c'};
          color: #fff;
        }

        .outlet {
          background-color: ${({ theme }) =>
            theme.palette.mode !== 'dark' && '#428bca'};
          color: #fff;
        }

        .rate {
          background-color: ${({ theme }) =>
            theme.palette.mode !== 'dark' && '#f0ad4e'};
          color: #fff;
        }

        .apt {
          background-color: ${({ theme }) =>
            theme.palette.mode !== 'dark' && '#d9534f'};
          color: #fff;
        }
      }
    }
  }
`;

export default ChartData;
