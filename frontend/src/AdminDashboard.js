/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const usenavigate = useNavigate();
  useEffect(() => {
    const body = document.querySelector('.home_body'),
      modeToggle = body.querySelector('.mode-toggle'),
      sidebar = body.querySelector('.admin_nav'),
      sidebarToggle = body.querySelector('.sidebar-toggle');

    let getMode = localStorage.getItem('mode');
    if (getMode && getMode === 'dark') {
      body.classList.add('dark');
    }

    let getStatus = localStorage.getItem('status');
    if (getStatus && getStatus === 'close') {
      sidebar.classList.add('close');
    }

    const handleDarkToggle = (e) => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    };

    const handleSideToggle = (e) => {
      sidebar.classList.toggle('close');
      if (sidebar.classList.contains('close')) {
        localStorage.setItem('status', 'close');
      } else {
        localStorage.setItem('status', 'open');
      }
    };

    modeToggle.addEventListener('click', handleDarkToggle);
    sidebarToggle.addEventListener('click', handleSideToggle);

    return () => {
      modeToggle.removeEventListener('click', handleDarkToggle);
      sidebarToggle.removeEventListener('click', handleSideToggle);
    };
  }, []);
  return (
    <div className='home_body'>
      <nav className='admin_nav'>
        <div className='logo-name'>
          <div className='logo-image'>
            <img
              src='Images/logo.png'
              alt=''
            />
          </div>
          <span className='logo_name'>ConnectLearn</span>
        </div>
        <div className='menu-items'>
          <ul className='nav-links'>
            <li>
              <a href='/admin'>
                <i className='uil uil-estate'></i>
                <span className='link-name'>Dahsboard</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-files-landscapes'></i>
                <span className='link-name'>Content</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-chart'></i>
                <span className='link-name'>Analytics</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-thumbs-up'></i>
                <span className='link-name'>Like</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-comments'></i>
                <span className='link-name'>Comment</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <i className='uil uil-share'></i>
                <span className='link-name'>Share</span>
              </a>
            </li>
          </ul>

          <ul className='logout-mode'>
            <li
              onClick={() => {
                usenavigate('/');
              }}>
              <a href='#'>
                <i className='uil uil-signout'></i>
                <span className='link-name'>Logout</span>
              </a>
            </li>
            <li className='mode'>
              <a href='#'>
                <i className='uil uil-moon'></i>
                <span className='link-name'>Dark Mode</span>
              </a>
              <div className='mode-toggle'>
                <span className='switch'></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section className='dashboard'>
        <div className='top'>
          <i className='uil uil-bars sidebar-toggle'></i>
          <div className='search-box'>
            <i className='uil uil-search'></i>
            <input
              type='text'
              placeholder='Search here...'
            />
          </div>

          <img
            src='Images/profile.jpg'
            alt=''
          />
        </div>
        <div className='dash-content'>
          <div className='overview'>
            <div className='title'>
              <i className='uil uil-tachometer-fast-alt'></i>
              <span className='text'>Dashboard</span>
            </div>
            <div className='boxes'>
              <div className='box box1'>
                <i className='uil uil-thumbs-up'></i>
                <span className='text'>Total Likes</span>
                <span className='number'>50,120</span>
              </div>
              <div className='box box2'>
                <i className='uil uil-comments'></i>
                <span className='text'>Comments</span>
                <span className='number'>20,120</span>
              </div>
              <div className='box box3'>
                <i className='uil uil-share'></i>
                <span className='text'>Total Share</span>
                <span className='number'>10,120</span>
              </div>
            </div>
          </div>
          <div className='activity'>
            <div className='title'>
              <i className='uil uil-clock-three'></i>
              <span className='text'>Recent Activity</span>
            </div>
            <div className='activity-data'>
              <div className='data names'>
                <span className='data-title'>Name</span>
                <span className='data-list'>Prem Shahi</span>
                <span className='data-list'>Deepa Chand</span>
                <span className='data-list'>Manisha Chand</span>
                <span className='data-list'>Pratima Shahi</span>
                <span className='data-list'>Man Shahi</span>
                <span className='data-list'>Ganesh Chand</span>
                <span className='data-list'>Bikash Chand</span>
              </div>
              <div className='data email'>
                <span className='data-title'>Email</span>
                <span className='data-list'>premshahi@gmail.com</span>
                <span className='data-list'>deepachand@gmail.com</span>
                <span className='data-list'>prakashhai@gmail.com</span>
                <span className='data-list'>manishachand@gmail.com</span>
                <span className='data-list'>pratimashhai@gmail.com</span>
                <span className='data-list'>manshahi@gmail.com</span>
                <span className='data-list'>ganeshchand@gmail.com</span>
              </div>
              <div className='data joined'>
                <span className='data-title'>Joined</span>
                <span className='data-list'>2022-02-12</span>
                <span className='data-list'>2022-02-12</span>
                <span className='data-list'>2022-02-13</span>
                <span className='data-list'>2022-02-13</span>
                <span className='data-list'>2022-02-14</span>
                <span className='data-list'>2022-02-14</span>
                <span className='data-list'>2022-02-15</span>
              </div>
              <div className='data type'>
                <span className='data-title'>Type</span>
                <span className='data-list'>New</span>
                <span className='data-list'>Member</span>
                <span className='data-list'>Member</span>
                <span className='data-list'>New</span>
                <span className='data-list'>Member</span>
                <span className='data-list'>New</span>
                <span className='data-list'>Member</span>
              </div>
              <div className='data status'>
                <span className='data-title'>Status</span>
                <span className='data-list'>Liked</span>
                <span className='data-list'>Liked</span>
                <span className='data-list'>Liked</span>
                <span className='data-list'>Liked</span>
                <span className='data-list'>Liked</span>
                <span className='data-list'>Liked</span>
                <span className='data-list'>Liked</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
