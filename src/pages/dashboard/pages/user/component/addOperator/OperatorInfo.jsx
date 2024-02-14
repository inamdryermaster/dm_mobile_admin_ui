import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styled from '@emotion/styled';
const OperatorInfo = () => {
  return (
    <Wrapper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'>
          <Typography>Operator Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <li>Limit of 5 active operators for efficiency.</li>
            <li>Total cap of 10 operators, including inactive.</li>
            <li>Admin exclusive rights to add operators.</li>
            <li>Operators have read-only data access.</li>
            <li>Immediate access revocation upon deactivation.</li>
            <li>Deactivated operator records kept for 3 years.</li>
            <li>All operator actions logged for accountability.</li>
            <li>Operators cannot add or manage other operators.</li>
          </List>
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
const List = styled.ul`
  list-style: none;
  padding: 0rem;
  margin: 0rem;
  li {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
`;
export default OperatorInfo;
