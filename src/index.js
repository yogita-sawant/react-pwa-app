import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';   we can not register or use 2 service worker at a time 
import reportWebVitals from './reportWebVitals';
import swDev from './swDev';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

swDev();
