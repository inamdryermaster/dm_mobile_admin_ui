import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Provider from './lib/provider.jsx';
import RoutesConfig from './RoutesConfig.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <RoutesConfig />
    </Provider>
  </React.StrictMode>
);
