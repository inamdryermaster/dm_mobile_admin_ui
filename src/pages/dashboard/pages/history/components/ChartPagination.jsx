import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const ChartPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 89;

  const handlePrevious = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));
  };

  return (
    <Wrapper>
      <Button
        variant='outlined'
        onClick={handlePrevious}
        disabled={currentPage === 1}>
        <MdNavigateBefore />
      </Button>
      <p>
        <span>Page</span>
        <strong>{currentPage}</strong> - <strong>{totalPages}</strong>
      </p>
      <Button
        variant='outlined'
        onClick={handleNext}
        disabled={currentPage === totalPages}>
        <MdNavigateNext />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    padding: 0.1rem 0.3rem;
    border-radius: 8px;
    span {
      margin-right: 0.5rem;
    }
  }
`;

export default ChartPagination;
