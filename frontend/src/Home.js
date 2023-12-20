/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Dropdown } from 'primereact/dropdown';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { react_url } from '.';
import { Footer } from './Footer';
import { Testimonials } from './Testimonials';
import { Courses } from './Courses';
import { Quotes } from './Quotes';
import { Pagination } from './Pagination';
import { Preloader } from './Preloader';
import { Speeddial } from './Speeddial';
import { Pricing } from './Pricing';

export const Home = ({ screenSize }) => {
  const [value, setValue] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(false);
  const totalCourses =
    value === 'Favorite Courses'
      ? selectedCourse
        ? isFavorite.includes(selectedCourse.coursename)
          ? 1
          : isFavorite.length > 0
          ? isFavorite.length
          : 1
        : isFavorite.length > 0
        ? isFavorite.length
        : courses.length
      : selectedCourse
      ? 1
      : courses.length;
  const coursesPerPage = 4;
  const totalPages = Math.ceil(totalCourses / coursesPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startCourse = (currentPage - 1) * coursesPerPage + 1;
  const endCourse = Math.min(currentPage * coursesPerPage, totalCourses);
  const [isValidUser, setIsValidUser] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isActive, setIsActive] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const usenavigate = useNavigate('');
  const validation = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
    }
    if (pass === '' || pass === null) {
      result = false;
    }
    return result;
  };
  const handleLoginForm = (e) => {
    e.preventDefault();
    if (validation) {
      if (email === 'raj@gmail.com' && pass === 'raj') {
        sessionStorage.setItem('isValidUser', true);
        sessionStorage.setItem('usersEmailID', email);
        isChecked && localStorage.setItem('isValidUser', true);
        isChecked && localStorage.setItem('usersEmailID', email);
        setShowForm(false);
        window.location.reload();
        toast.success('Logged In Successfully');
      } else if (email === 'admin@gmail.com' && pass === 'admin') {
        usenavigate('/admin');
        toast.success('Admin Logged In Successfully');
      } else {
        toast.error('Invalid Credentials');
      }
    }
  };
  const handleLogout = () => {
    setIsValidUser(false);
    sessionStorage.removeItem('isValidUser');
    sessionStorage.removeItem('usersEmailID');
    toast.success('Logged out Successfully');
  };
  const handleSignupForm = (e) => {
    e.preventDefault();
  };
  const handleFormOpen = () => {
    setShowForm((prevVisible) => !prevVisible);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1((prevVisible) => !prevVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2((prevVisible) => !prevVisible);
  };
  const handlePagination = (val) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      document.getElementById('home').style.opacity = 1;
      setCurrentPage(val);
    }, 1000);
    document.getElementById('home').style.opacity = 0.6;
  };
  const handlePricing = () => {
    setIsOpen(!isOpen);
  };
  const menuLeft = useRef(null);
  const items = [
    {
      label: 'Basic Options',
      items: [
        {
          label: 'Update Profile',
          icon: 'pi pi-refresh',
          command: () => {
            usenavigate('/profile');
            // toast.current.show({
            //   severity: 'success',
            //   summary: 'Updated',
            //   detail: 'Data Updated',
            //   life: 3000,
            // });
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
        },
      ],
    },
    {
      label: 'Additional',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-external-link',
          // url: 'https://reactjs.org/',
        },
        {
          label: 'Router',
          icon: 'pi pi-upload',
        },
      ],
    },
  ];
  useEffect(() => {
    const storedIsValidUser =
      localStorage.getItem('isValidUser') ||
      sessionStorage.getItem('isValidUser');
    if (storedIsValidUser) {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
    let calcScrollValue = () => {
      let scrollProgress = document.getElementById('progress');
      if (scrollProgress !== null) {
        let pos = document.documentElement.scrollTop;
        let calcHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        let scrollValue = Math.round((pos * 100) / calcHeight);
        if (pos > 100) {
          scrollProgress.style.display = 'grid';
        } else {
          scrollProgress.style.display = 'none';
        }
        scrollProgress.addEventListener('click', () => {
          document.documentElement.scrollTop = 0;
        });
        scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
      }
    };
    setBackgroundImage(
      isValidUser
        ? 'Images/bg.jpg'
        : window.innerWidth < 1150
        ? 'Images/mob-mainbg.jpg'
        : 'Images/web-mainbg.jpg'
    );
    window.onscroll = calcScrollValue;
  }, [isValidUser]);
  useEffect(() => {
    axios
      .get(`${react_url}/coursedetails/`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites);
  }, [value]);
  const displayedCourses = courses
    .filter((course) => {
      if (isFavorite.length === 0 && !selectedCourse) {
        return true;
      }
      if (selectedCourse) {
        if (
          value === 'Favorite Courses' &&
          isFavorite.includes(selectedCourse.coursename)
        ) {
          // console.log('me1');
          return selectedCourse.coursename.includes(course.coursename);
        } else {
          // console.log('me2');
          return selectedCourse.coursename === undefined
            ? course.coursename === selectedCourse
            : course.coursename === selectedCourse.coursename;
        }
      }
      if (value === 'Favorite Courses') {
        if (!selectedCourse) {
          return isFavorite.includes(course.coursename);
        }
      }
      return true;
    })
    .slice(startCourse - 1, endCourse)
    .map((course, index) => (
      <Courses
        key={index + 1}
        name={course.coursename}
        firstcontent={course.firstcontent}
        secondcontent={course.secondcontent}
        thirdcontent={course.thirdcontent}
        fourthcontent={course.fourthcontent}
        fifthcontent={course.fifthcontent}
        identifier={index + 1}
        screenSize={screenSize}
      />
    ));
  return (
    <div>
      <div id='home'>
        <header className='header'>
          <nav className='nav'>
            <a
              href='/'
              className='nav_logo'>
              <div className='logo-image'>
                <img
                  src='Images/logo.png'
                  alt=''
                />
                &nbsp;{screenSize > 500 ? 'ConnectLearn' : ''}
              </div>
            </a>
            {isValidUser && (
              <ul
                className='nav_items'
                style={{ paddingTop: '15px' }}>
                <li className='nav_item'>
                  <div className='profile_menu'>
                    <Menu
                      model={items}
                      popup
                      ref={menuLeft}
                      id='popup_menu_left'
                    />
                    <Button
                      label='My Profile'
                      icon='pi pi-user'
                      className='mr-2'
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                      }}
                      onClick={(event) => menuLeft.current.toggle(event)}
                      aria-controls='popup_menu_left'
                      aria-haspopup
                    />
                  </div>
                  <a
                    href='#courses'
                    className='nav_link'>
                    Courses
                  </a>
                  <a
                    href='#testimonials'
                    className='nav_link'>
                    Testimonials
                  </a>
                  <a
                    href='#cu'
                    className='nav_link'>
                    Contact
                  </a>
                  <a
                    href='#pricing'
                    onClick={handlePricing}
                    className='nav_link'>
                    Pricing
                  </a>
                  <span className='notification'>
                    <i
                      className='pi pi-bell p-overlay-badge'
                      style={{
                        fontSize: '1.5rem',
                        color: 'white',
                        cursor: 'pointer',
                      }}>
                      <Tooltip
                        target='.p-overlay-badge'
                        position={`${screenSize > 1050 ? 'bottom' : 'left'}`}
                        content='Kindly update your profile'
                        showEvent='click'
                        hideEvent='click'
                      />
                      <Badge severity='warning' />
                    </i>
                  </span>
                </li>
              </ul>
            )}
            <button
              className='home_button'
              style={{
                display: `${isValidUser && screenSize <= 1050 ? 'none' : ''}`,
              }}
              onClick={
                isValidUser && screenSize >= 1050
                  ? handleLogout
                  : handleFormOpen
              }>
              {isValidUser && screenSize >= 1050 ? 'Logout' : 'Get Started'}
            </button>
          </nav>
        </header>
        <section
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className={`home ${showForm && 'show'}`}>
          <div className={`form_container ${isActive && 'active'}`}>
            <i
              onClick={handleFormOpen}
              className='uil uil-times form_close'></i>
            <div className='form login_form'>
              <form onSubmit={handleLoginForm}>
                <h2>Login</h2>
                <div className='input_box'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <i className='uil uil-envelope-alt email'></i>
                </div>
                <div className='input_box'>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                  <i className='uil uil-lock password'></i>
                  <i
                    onClick={togglePasswordVisibility}
                    className={`uil ${
                      passwordVisible ? 'uil-eye' : 'uil-eye-slash'
                    } pw_hide`}></i>
                </div>
                <div className='option_field'>
                  <span className='checkbox'>
                    <input
                      type='checkbox'
                      id='checking'
                      value={isChecked}
                      onChange={(e) => setIsChecked(e.target.value)}
                    />
                    <label htmlFor='checking'>Remember me</label>
                  </span>
                  <a
                    href='#'
                    className='forgot_pw'>
                    Forgot password?
                  </a>
                </div>
                <button className='home_button'>Login Now</button>
                <div className='login_signup'>
                  Don't have an account?{' '}
                  <a
                    href='#'
                    onClick={() => setIsActive(true)}>
                    Signup
                  </a>
                </div>
              </form>
            </div>
            <div className='form signup_form'>
              <form onSubmit={handleSignupForm}>
                <h2>Signup</h2>
                <div className='input_box'>
                  <input
                    type='text'
                    placeholder='Full Name'
                    required
                  />
                  <i className='uil uil-user-circle name'></i>
                </div>
                <div className='input_box'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    required
                  />
                  <i className='uil uil-envelope-alt email'></i>
                </div>
                <div className='input_box'>
                  <input
                    type={passwordVisible1 ? 'text' : 'password'}
                    placeholder='Create password'
                    required
                  />
                  <i className='uil uil-lock password'></i>
                  <i
                    onClick={togglePasswordVisibility1}
                    className={`uil ${
                      passwordVisible1 ? 'uil-eye' : 'uil-eye-slash'
                    } pw_hide`}></i>
                </div>
                <div className='input_box'>
                  <input
                    type={passwordVisible2 ? 'text' : 'password'}
                    placeholder='Confirm password'
                    required
                  />
                  <i className='uil uil-lock password'></i>
                  <i
                    onClick={togglePasswordVisibility2}
                    className={`uil ${
                      passwordVisible2 ? 'uil-eye' : 'uil-eye-slash'
                    } pw_hide`}></i>
                </div>
                <button className='home_button'>Signup Now</button>
                <div className='login_signup'>
                  Already have an account?{' '}
                  <a
                    href='#'
                    onClick={() => setIsActive(false)}>
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
        {isValidUser && (
          <>
            <div className='main'>
              {/* <img
                src='Images/girl2.png'
                alt=''
                // style={{ marginTop: '-50px' }}
                // height='750px'
              /> */}
              <span>
                <Quotes />
              </span>
            </div>
            <div
              style={{
                background: 'linear-gradient(to left top, #031A9A, #8B53FF)',
              }}>
              <section id='courses'>
                <div style={{ padding: '40px' }}></div>
                <div
                  className={`flex align-items-center ${
                    screenSize < 1220 && 'flex-column'
                  }`}
                  style={{
                    justifyContent: `${
                      screenSize < 1450 ? 'space-evenly' : 'space-around'
                    }`,
                  }}>
                  <span className='home_heading'>Our Courses</span>
                  <div
                    className={`flex ${
                      screenSize < 1450 && 'flex-column'
                    } align-items-center gap-5`}
                    style={
                      screenSize < 1220
                        ? {
                            width: `${screenSize < 450 ? '98%' : '90%'}`,
                            flexWrap: 'wrap',
                            alignContent: 'flex-end',
                            paddingTop: '60px',
                          }
                        : {
                            width: 'auto',
                            flexWrap: 'nowrap',
                          }
                    }>
                    <Dropdown
                      className='w-24rem'
                      value={selectedCourse}
                      onChange={(e) => {
                        setCurrentPage(1);
                        setSelectedCourse(e.target.value);
                      }}
                      options={
                        value === 'Favorite Courses' ? isFavorite : courses
                      }
                      optionLabel='coursename'
                      placeholder='Search Courses'
                      filter
                      showClear
                      valueTemplate={(option, props) => {
                        if (option) {
                          return (
                            <div>
                              {value === 'Favorite Courses'
                                ? option
                                : option.coursename}
                            </div>
                          );
                        }
                        return <span>{props.placeholder}</span>;
                      }}
                      itemTemplate={(option) => (
                        <div>
                          {value === 'Favorite Courses'
                            ? option
                            : option.coursename}
                        </div>
                      )}
                    />
                    <div
                      className='flex flex-row align-items-center gap-2'
                      style={{ color: 'white' }}>
                      <MultiStateCheckbox
                        style={{ zIndex: '9' }}
                        value={value}
                        onChange={(e) => {
                          setCurrentPage(1);
                          setValue(e.target.value);
                        }}
                        options={[
                          {
                            value: 'Favorite Courses',
                            icon: 'pi pi-star-fill',
                          },
                        ]}
                        optionValue='value'
                      />
                      <span>{value || 'All courses'}</span>
                    </div>
                  </div>
                </div>
                <div className='course_body'>{displayedCourses}</div>
                {totalPages > 1 && (
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                  />
                )}
              </section>
              <section id='speedDial'>
                <Speeddial
                  handlePricing={handlePricing}
                  handleLogout={handleLogout}
                />
              </section>
              <section id='testimonials'>
                <Testimonials />
              </section>
              <div id='cu'>
                <Footer handleFormOpen={handleFormOpen} />
              </div>
            </div>
          </>
        )}
        <div id='progress'>
          <span id='progress-value'>&#x1F815;</span>
        </div>
      </div>
      <Preloader active={loading} />
      <Pricing
        displayModal={isOpen}
        onClose={handlePricing}
      />
    </div>
  );
};
