import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from './pages/auth/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import DashboardRoutes from './pages/dashboard/DashboardRoutes.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ForgotPasswordUpdate from './pages/auth/ForgotPasswordUpdate.jsx';
import ProtectedRoute from './pages/auth/ProtectedRoute.jsx';
import EmailSent from './pages/auth/EmailSent.jsx';
import AccessDenied from './pages/AccessDenied.jsx';

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password-update'
            element={
              <ProtectedRoute>
                <ForgotPasswordUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path='/email-sent/:email'
            element={<EmailSent />}
          />
          <Route
            path='/dashboard/*'
            element={<DashboardRoutes />}
          />

          <Route
            path='/403'
            element={<AccessDenied />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
