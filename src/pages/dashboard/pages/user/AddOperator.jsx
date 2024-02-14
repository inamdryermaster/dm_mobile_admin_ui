import React, { useEffect } from 'react';
import CardWrapper from '../../../../styles/wrappers/CardWrapper';
import styled from '@emotion/styled';
import { Button, Divider } from '@mui/material';
import { TbMoodEmpty } from 'react-icons/tb';
import { grey } from '@mui/material/colors';
import {
  getUserOperatorStateValues,
  operatorsThunk,
} from '../../../../features/user/userOperatorSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../components/Loading';
import NewOperatorDialog from './component/addOperator/NewOperatorDialog';
import OperatorInfo from './component/addOperator/OperatorInfo';
import EditOperatorDialog from './component/addOperator/EditOperatorDialog';
import OperatorActionHistory from './component/addOperator/OperatorActionHistory';
import RemoveOperators from './component/addOperator/RemovedOperators';
import DeactivateOperatorDialog from './component/addOperator/DeactivateOperatorDialog';

const AddUser = () => {
  const { isLoading, users, removedUsers, isLoadingDelete } = useSelector(
    (state) => state.operators
  );
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(getUserOperatorStateValues({ name: 'openDialog', value: true }));
  };

  const handleEdit = (item) => {
    dispatch(
      getUserOperatorStateValues({ name: 'openEditDialog', value: true })
    );
    dispatch(
      getUserOperatorStateValues({ name: 'firstName', value: item.firstName })
    );
    dispatch(
      getUserOperatorStateValues({ name: 'lastName', value: item.lastName })
    );
    dispatch(getUserOperatorStateValues({ name: 'email', value: item.email }));
    dispatch(
      getUserOperatorStateValues({ name: 'operatorId', value: item._id })
    );
  };

  const handleDelete = ({ id, name }) => {
    dispatch(
      getUserOperatorStateValues({ name: 'showDeleteDialog', value: true })
    );
    dispatch(getUserOperatorStateValues({ name: 'deleteId', value: id }));
    dispatch(getUserOperatorStateValues({ name: 'deleteName', value: name }));
  };
  useEffect(() => {
    dispatch(operatorsThunk());
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <NewOperatorDialog />
      <DeactivateOperatorDialog />
      <EditOperatorDialog />
      <CardWrapperStyle>
        <div className='title'>
          Operators
          <br />
        </div>
        <div className='body'>
          {
            // if no user found
            users.length === 0 ? (
              <div className='no-user'>
                <div className='icon'>
                  <TbMoodEmpty />
                </div>
                <div className='text'>No active operators detected.</div>
              </div>
            ) : (
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
                    {users.map((item) => (
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
                            onClick={() => handleEdit(item)}>
                            Edit
                          </Button>
                          <Button
                            variant='outlined'
                            color='error'
                            onClick={() =>
                              handleDelete({
                                id: item._id,
                                name: item.firstName + ' ' + item.lastName,
                              })
                            }
                            disabled={isLoadingDelete ? true : false}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
        <div className='footer'>
          <Button
            variant='contained'
            color='primary'
            sx={{ width: '100%' }}
            disabled={users.length >= 5 ? true : false}
            onClick={handleClickOpen}>
            Add Operator
          </Button>
          <OperatorInfo />
          {removedUsers.length > 0 && <RemoveOperators />}
        </div>
      </CardWrapperStyle>
      <OperatorActionHistory />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  .no-user {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .icon {
      font-size: 8rem;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#fff' : grey[500]};
    }
    .text {
      font-size: 1.2rem;
      margin-top: -2rem;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#fff' : grey[900]};
    }
  }
  .body {
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
  }
  .footer {
    margin-top: 1rem;
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

export default AddUser;
