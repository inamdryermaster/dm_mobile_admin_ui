import styled from '@emotion/styled';
import { Button, Divider, Icon, Paper } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import { FaCheck } from 'react-icons/fa';
import { format, sub } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import CardWrapper from '../../../../styles/wrappers/CardWrapper';
import { useEffect } from 'react';
import { userSubscriptionStatusThunk } from '../../../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
const Subscription = () => {
  const { isSubscriptionActive, subscriptionExpiry, role } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date =
    subscriptionExpiry && format(new Date(subscriptionExpiry), 'PPP');
  const features = [
    'Remote Access to your Dryer Master 24/7',
    'Change Moisture Set Points remotely',
    'Receive alerts and notifications',
    'Track your dryer’s performance',
    'Access to your dryer’s historical data',
  ];
  const onClick = () => {
    navigate('/dashboard/account/billing');
  };
  useEffect(() => {
    dispatch(userSubscriptionStatusThunk());
  }, []);
  return (
    <Wrapper $isSubscriptionActive={isSubscriptionActive}>
      <div className='card'>
        <CardWrapper>
          <div className='title'>Subscription</div>
          <div className='subscription'>
            <strong>
              {isSubscriptionActive
                ? `Your subscription expires on `
                : `Your subscription expired on `}
              {date}
            </strong>
          </div>

          <div className='card-heading'>
            <div className='card-title'>
              <h3>
                Premium
                <MdOutlineWorkspacePremium />
              </h3>

              {isSubscriptionActive ? (
                <small className='active'>Active</small>
              ) : (
                <small className='expired'>Expired</small>
              )}
            </div>
            <Divider />

            <div className='card-heading-price'>
              100 USD<span>/ year</span>
            </div>

            <small>New customers get 1 year free trial</small>
          </div>
          <Divider />
          <div className='card-body'>
            <ul>
              {features.map((feature, index) => (
                <li key={index}>
                  <FaCheck />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className='card-footer'>
            {!isSubscriptionActive && role === 'user' && (
              <Button
                variant='contained'
                size='large'
                onClick={onClick}>
                Renew Subscription
              </Button>
            )}
          </div>
        </CardWrapper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .card {
    border-radius: 10px;
    width: 100%;
    display: flex;
    max-width: 500px;
    margin: 3rem auto;
    justify-content: center;
  }
  .subscription {
    text-align: center;
    strong {
      color: ${(props) =>
        props.$isSubscriptionActive ? green[500] : blue[500]};
      font-size: 1.5;
      font-weight: 500;
      display: block;
    }
  }
  .card-heading {
    border-radius: 10px 10px 0 0;
    .card-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      small {
        font-size: 0.85rem;
        font-weight: 400;
        padding: 0.25rem 0.5rem;
        border-radius: 5px;
        &.active {
          background-color: ${green[800]};
          color: #fff;
        }
        &.expired {
          background-color: ${blue[500]};
          color: #fff;
        }
      }
    }
    h3 {
      margin: 0;
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      font-weight: 500;

      color: ${green[800]};
      padding: 0 0.5rem;
      border-radius: 5px;
      margin-bottom: 0.5rem;
    }
    .card-heading-price {
      font-size: 1.9rem;
      font-weight: 500;
      span {
        font-size: 0.85rem;
        margin-left: 0.25rem;
        font-weight: 500;
      }
    }
  }
  .card-body {
    padding: 1rem 0;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
        svg {
          margin-right: 0.5rem;
          color: ${green[500]};
        }
      }
    }
  }
  .card-footer {
    button {
      width: 100%;
    }
  }
`;
export default Subscription;
