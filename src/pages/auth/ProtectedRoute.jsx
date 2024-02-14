import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isMember } = useSelector((state) => state.user);

  if (isMember) {
    return <Navigate to={'/dashboard'} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
