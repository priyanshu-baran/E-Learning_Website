/* eslint-disable jsx-a11y/anchor-is-valid */

export const Footer = ({ handleFormOpen }) => {
  return (
    <footer>
      <div className='content'>
        <div className='left foot_box'>
          <div className='upper'>
            <div className='topic'>About us</div>
            <p>
              ConnectLearn is a channel where you can learn HTML, CSS, and also
              JavaScript along with creative CSS Animations and Effects.
            </p>
          </div>
          <div className='lower'>
            <div className='topic'>Contact us</div>
            <div className='phone'>
              <span>
                <i className='fas fa-phone-volume'></i>+91 62657 88336
              </span>
            </div>
            <div className='email'>
              <span>
                <i className='fas fa-envelope'></i>baranpriyanshu3@gmail.com
              </span>
            </div>
          </div>
        </div>
        <div className='middle foot_box'>
          <div className='topic'>Our Services</div>
          <div>
            <span
              href='#'
              onClick={handleFormOpen}>
              Admin Login
            </span>
          </div>
          <div>
            <span>Web UX Design, Reasearch</span>
          </div>
          <div>
            <span>Web User Interface Design</span>
          </div>
          <div>
            <span>Theme Development, Design</span>
          </div>
          <div>
            <span>Mobile Application Design</span>
          </div>
          <div>
            <span>Wire raming & Prototyping</span>
          </div>
        </div>
        <div className='right foot_box'>
          <div className='topic'>Subscribe us</div>
          <form action='#'>
            <input
              type='text'
              placeholder='Enter email address'
            />
            <input
              type='submit'
              name=''
              value='Subscribe'
            />
            <div className='media-icons'>
              <a
                href='https://github.com/priyanshu-baran'
                target='_blank'
                rel='noreferrer'>
                <i className='fab fa-github'></i>
              </a>
              <a
                href='https://twitter.com/Priyanshu_Baran'
                target='_blank'
                rel='noreferrer'>
                <i className='fab fa-twitter'></i>
              </a>
              <a
                href='https://www.linkedin.com/in/priyanshu-baran/'
                target='_blank'
                rel='noreferrer'>
                <i className='fab fa-linkedin-in'></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className='bottom'>
        <p>
          Copyright © 2023 <span>ConnectLearn</span> All rights reserved
        </p>
      </div>
    </footer>
  );
};
