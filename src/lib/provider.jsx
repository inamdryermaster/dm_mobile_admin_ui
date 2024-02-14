import { Provider as ReduxProvider } from 'react-redux';
import Store from '../store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY);
const Provider = ({ children }) => {
  return (
    <ReduxProvider store={Store}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </ReduxProvider>
  );
};

export default Provider;
