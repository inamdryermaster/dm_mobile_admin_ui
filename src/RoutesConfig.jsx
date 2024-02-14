import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from './pages/auth/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import DashboardRoutes from './pages/dashboard/DashboardRoutes.jsx';
import ProtectedRoute from './pages/auth/ProtectedRoute.jsx';
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
