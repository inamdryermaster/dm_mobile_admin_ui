import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

const LoadingBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const pathNames = ['/', '/register', '/forgot-password'];

  useEffect(() => {
    // if path names array includes the current path name then set progress to 100
    if (pathNames.includes(location.pathname)) {
      setProgress(100);
    } else {
      setProgress(0);
    }

    const timeout = setTimeout(() => setProgress(0), 1500);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <ProgressBar
      style={{
        display: progress === 0 ? 'none' : 'block',
        position: 'absolute', // Position it absolutely
        top: 0, // Position it at the top
        left: 0, // Position it at the left
      }}>
      <Filler style={{ width: `${progress}%` }} />
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ccc;
  display: none; /* Initially hidden */
`;

const Filler = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edeff3, #f5f5f5, #39558a, #1f3660);
  background-size: 300% 100%;
  animation: loading 3.2s linear;

  @keyframes loading {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

export default LoadingBar;
