import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/home/Home';
import History from './pages/history/History';
import Charts from './pages/charts/Charts';
import Messages from './pages/messages/Messages';
import NotFound from '../NotFound';
import Profile from './pages/user/Profile';
import ChangePassword from './pages/user/ChangePassword';

import Invoice from './pages/account/invoice/Invoice';
import Subscription from './pages/account/Subscription';
import AddOperator from './pages/user/AddOperator';
import Billing from './pages/account/billing/Billing';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
        <Route
          index
          element={<Home />}
        />
        <Route
          path='charts'
          element={<Charts />}
        />
        <Route
          path='history'
          element={<History />}
        />
        <Route
          path='messages'
          element={<Messages />}
        />
        <Route
          path='user/profile'
          element={<Profile />}
        />
        <Route
          path='user/change-password'
          element={<ChangePassword />}
        />
        <Route
          path='user/add-operator'
          element={<AddOperator />}
        />
        <Route
          path='account/billing'
          element={<Billing />}
        />
        <Route
          path='account/invoice'
          element={<Invoice />}
        />
        <Route
          path='account/subscription'
          element={<Subscription />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
