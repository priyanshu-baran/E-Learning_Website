import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AdminDashboard } from './AdminDashboard';
import { Home } from './Home';
import { Preloader } from './Preloader';
import { Profile } from './Profile';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              isLoading ? (
                <Preloader active={isLoading} />
              ) : (
                <Home screenSize={windowWidth} />
              )
            }
          />
          <Route
            path='/admin'
            element={<AdminDashboard />}
          />
          <Route
            path='/profile'
            element={<Profile screenSize={windowWidth} />}
          />
        </Routes>
      </Router>
    </>
  );
};
