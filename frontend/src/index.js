import React from 'react';
import ReactDOM from 'react-dom/client';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './css/admin.css';
import './css/home.css';
import './css/footer.css';
import './css/testimonials.css';
import './css/courses.css';
import './css/quotes.css';
import './css/pagination.css';
import './css/preloader.css';
import './css/pricing.css';
import './css/speedDial.css';
import './css/profile.css';

import { App } from './App';

export const react_url = 'http://localhost:5000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
