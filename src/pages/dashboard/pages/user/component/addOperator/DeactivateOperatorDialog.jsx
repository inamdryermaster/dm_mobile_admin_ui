import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOperatorStateValues,
  operatorsDeactivateThunk,
} from '../../../../../../features/user/userOperatorSlice';

const DeactivateOperatorDialog = () => {
  const { showDeleteDialog, deleteName, deleteId } = useSelector(
    (state) => state.operators
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      getUserOperatorStateValues({ name: 'showDeleteDialog', value: false })
    );
  };
  const handleDelete = () => {
    dispatch(operatorsDeactivateThunk(deleteId));
  };
  return (
    <Wrapper>
      <Dialog
        open={showDeleteDialog}
        onClose={handleClose}>
        <DialogTitle>
          <strong>Deactivate Operator</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to Remove <strong>{deleteName}</strong>?
            <br />
            {/*  add a note Deactivating will lock down the operator's account instantly, ensuring they cannot access or modify any information or settings in the system.   */}
            <Text>
              This is a crucial security measure. Deactivating an operator
              immediately secures system data and prevents any further access by
              the individual.
            </Text>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant='contained'>
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#fff' : '#000')};
  margin-top: 10px;
`;
export default DeactivateOperatorDialog;
