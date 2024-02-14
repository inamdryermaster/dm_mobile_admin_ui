import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileStateValues } from '../../../../../features/user/userProfileSlice';
import { grey } from '@mui/material/colors';
const MobilePicker = () => {
  const { cellPhone } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(getUserProfileStateValues({ name: 'cellPhone', value: e }));
  };

  return (
    <Wrapper>
      <span>
        Mobile Number
        <small>( Also used for SMS notifications )</small>
      </span>
      <PhoneInput
        placeholder='+1 416 123 4567'
        value={cellPhone}
        onChange={handleChange}
        defaultCountry='US'
        international
        withCountryCallingCode
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  small {
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#c9c3c3' : '#6b6b6b'};
  }
  span {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  position: relative;
  .PhoneInput {
    width: 100%;
    margin-bottom: 1rem;

    .PhoneInputInput {
      border: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? `1px solid ${grey[700]}`
          : `1px solid ${grey[400]}`};
      border-radius: 4px;
      padding: 16.5px 14px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' && '#333'};
      color: ${({ theme }) => theme.palette.text.primary};
      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.palette.primary.main};
      }
    }

    .PhoneInputCountry {
      border: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? `1px solid ${grey[700]}`
          : `1px solid ${grey[400]}`};
      border-radius: 4px 0 0 4px;
      /* position: absolute; */
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;

      box-sizing: border-box;

      &:hover {
        cursor: pointer;
      }
    }

    .PhoneInputCountrySelectArrow {
      margin-left: 6px;
    }
  }
`;

export default MobilePicker;
