import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { react_url } from '.';
import Cookies from 'js-cookie';

export const Courses = ({
  identifier,
  name,
  firstcontent,
  secondcontent,
  thirdcontent,
  fourthcontent,
  fifthcontent,
  screenSize,
}) => {
  const slider = `slider_${identifier}`;
  const [isFavourite, setIsFavourite] = useState(false);
  const [usersEmailID, setUsersEmailID] = useState('');
  const handleFavourite = async () => {
    setIsFavourite((prevIsFavourite) => !prevIsFavourite);
    isFavourite
      ? toast.success('Removed from favorites')
      : toast.success('Added to favorites');
    const storedFavorites =
      JSON.parse(sessionStorage.getItem('favorites')) || [];
    const updatedFavorites = isFavourite
      ? storedFavorites.filter((fav) => fav !== name)
      : [...storedFavorites, name];
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    await axios.post(`${react_url}/userdetails/add`, {
      email: usersEmailID,
      favoriteCourses: updatedFavorites,
    });
  };
  useEffect(() => {
    const storedUsersEmailID =
      Cookies.get('usersEmailID') || sessionStorage.getItem('usersEmailID');
    setUsersEmailID(storedUsersEmailID);
    const storedFavorites =
      JSON.parse(sessionStorage.getItem('favorites')) || [];
    setIsFavourite(storedFavorites.includes(name));
  }, [name]);
  return (
    <div>
      <div className='course_container'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='topic'>{name}</div>
          <div onClick={handleFavourite}>
            {isFavourite ? (
              <img
                src='Images/star.png'
                alt=''
                height='70px'
                width='80px'
                style={{ marginTop: '-22px', marginRight: '-22px' }}
              />
            ) : (
              <span>
                <i className='fa-regular fa-star fa-beat fa-2xl'></i>
              </span>
            )}
          </div>
        </div>
        <div className='course_content'>
          <input
            type='radio'
            name={slider}
            defaultChecked
            id={`course_home_${identifier}`}
          />
          <input
            type='radio'
            name={slider}
            id={`blog_${identifier}`}
          />
          <input
            type='radio'
            name={slider}
            id={`help_${identifier}`}
          />
          <input
            type='radio'
            name={slider}
            id={`code_${identifier}`}
          />
          <input
            type='radio'
            name={slider}
            id={`about_${identifier}`}
          />
          <div className='list'>
            <label
              htmlFor={`course_home_${identifier}`}
              className='course_home'>
              <span className='icon'>
                <i className='fas fa-home'></i>
              </span>
              <span className='title sidebar_headings'>Home</span>
            </label>
            <label
              htmlFor={`blog_${identifier}`}
              className='blog'>
              <span className='icon'>
                <i className='far fa-user'></i>
              </span>
              <span className='title sidebar_headings'>About</span>
            </label>
            <label
              htmlFor={`help_${identifier}`}
              className='help'>
              <span className='icon'>
                <i className='far fa-envelope'></i>
              </span>
              <span className='title sidebar_headings'>Help</span>
            </label>
            <label
              htmlFor={`code_${identifier}`}
              className='code'>
              <span className='icon'>
                <i className='fas fa-code'></i>
              </span>
              <span className='title sidebar_headings'>Code</span>
            </label>
            <label
              htmlFor={`about_${identifier}`}
              className='about'>
              <span className='icon'>
                <i className='fa-solid fa-pen-to-square'></i>
              </span>
              <span className='title sidebar_headings'>Practice</span>
            </label>
            <div className='slider'></div>
          </div>
          {screenSize < 450 && <Divider />}
          <div className='text-content'>
            <div className='course_home text'>
              <div className='title'>Home Content</div>
              <p>{firstcontent}</p>
            </div>
            <div className='blog text'>
              <div className='title'>About this Course</div>
              <p>{secondcontent}</p>
            </div>
            <div className='help text'>
              <div className='title'>Help Content</div>
              <p>{thirdcontent}</p>
            </div>
            <div className='code text'>
              <div className='title'>Code Content</div>
              <p>{fourthcontent}</p>
            </div>
            <div className='about text'>
              <div className='title'>Take a short quiz</div>
              <p>{fifthcontent}</p>
              <div className='btn'>
                <a
                  href='https://basic-quiz-application.netlify.app/'
                  target='_blank'
                  rel='noreferrer'>
                  Take Quiz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
