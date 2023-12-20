import { useEffect } from 'react';

export const Testimonials = () => {
  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const carousel = document.querySelector('.carousel');
    const firstCardWidth = carousel.querySelector('.test_card').offsetWidth;
    const arrowBtns = document.querySelectorAll('.wrapper i');
    const carouselChildrens = [...carousel.children];
    let isDragging = false,
      isAutoPlay = true,
      startX,
      startScrollLeft,
      timeoutId;
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    carouselChildrens
      .slice(-cardPerView)
      .reverse()
      .forEach((test_card) => {
        carousel.insertAdjacentHTML('afterbegin', test_card.outerHTML);
      });
    carouselChildrens.slice(0, cardPerView).forEach((test_card) => {
      carousel.insertAdjacentHTML('beforeend', test_card.outerHTML);
    });
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove('no-transition');
    arrowBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        carousel.scrollLeft +=
          btn.id === 'left' ? -firstCardWidth : firstCardWidth;
      });
    });
    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add('dragging');
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };
    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove('dragging');
    };
    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove('no-transition');
      } else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
      }
      clearTimeout(timeoutId);
      if (!wrapper.matches(':hover')) autoPlay();
    };
    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(
        () => (carousel.scrollLeft += firstCardWidth),
        2500
      );
    };
    autoPlay();
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragStop);
    carousel.addEventListener('scroll', infiniteScroll);
    wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    wrapper.addEventListener('mouseleave', autoPlay);
  }, []);
  return (
    <div className='test_body'>
      <div className='wrapper'>
        <i
          id='left'
          style={{ zIndex: '1' }}
          className='fa-solid fa-angle-left'></i>
        {/* <center className='test_heading'>Hear from our Acheivers...!!!</center> */}
        <span className='test_heading'>Testimonials</span>
        <ul className='carousel'>
          <li className='test_card'>
            <div className='img'>
              <img
                src='images/img-1.jpg'
                alt='img'
                draggable='false'
              />
            </div>
            <h2>Blanche Pearson</h2>
            <span>
              <mark>Sales Manager</mark>
            </span>
            <span>
              <center>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                dicta quisquam atque, quibusdam perferendis harum.
              </center>
            </span>
          </li>
          <li className='test_card'>
            <div className='img'>
              <img
                src='images/img-2.jpg'
                alt='img'
                draggable='false'
              />
            </div>
            <h2>Joenas Brauers</h2>
            <span>
              <mark>Web Developer</mark>
            </span>
            <span>
              <center>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                dicta quisquam atque, quibusdam perferendis harum.
              </center>
            </span>
          </li>
          <li className='test_card'>
            <div className='img'>
              <img
                src='images/img-3.jpg'
                alt='img'
                draggable='false'
              />
            </div>
            <h2>Lariach French</h2>
            <span>
              <mark>Online Teacher</mark>
            </span>
            <span>
              <center>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                dicta quisquam atque, quibusdam perferendis harum.
              </center>
            </span>
          </li>
          <li className='test_card'>
            <div className='img'>
              <img
                src='images/img-4.jpg'
                alt='img'
                draggable='false'
              />
            </div>
            <h2>James Khosravi</h2>
            <span>
              <mark>Freelancer</mark>
            </span>
            <span>
              <center>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                dicta quisquam atque, quibusdam perferendis harum.
              </center>
            </span>
          </li>
          <li className='test_card'>
            <div className='img'>
              <img
                src='images/img-5.jpg'
                alt='img'
                draggable='false'
              />
            </div>
            <h2>Kristina Zasiadko</h2>
            <span>
              <mark>Bank Manager</mark>
            </span>
            <span>
              <center>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                dicta quisquam atque, quibusdam perferendis harum.
              </center>
            </span>
          </li>
          <li className='test_card'>
            <div className='img'>
              <img
                src='images/img-6.jpg'
                alt='img'
                draggable='false'
              />
            </div>
            <h2>Donald Horton</h2>
            <span>
              <mark>App Designer</mark>
            </span>
            <span>
              <center>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                dicta quisquam atque, quibusdam perferendis harum.
              </center>
            </span>
          </li>
        </ul>
        <i
          id='right'
          className='fa-solid fa-angle-right'></i>
      </div>
    </div>
  );
};
