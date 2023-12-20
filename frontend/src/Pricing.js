import { useRef } from 'react';
import toast from 'react-hot-toast';

export const Pricing = ({ displayModal, onClose }) => {
  const modalRef = useRef();
  const handleBackgroundClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleBackgroundClick}
      ref={modalRef}
      className={`pricing_body ${displayModal ? 'show' : ''}`}>
      <div className='wrap'>
        <input
          type='radio'
          name='slider'
          id='tab-1'
        />
        <input
          type='radio'
          name='slider'
          id='tab-2'
          defaultChecked
        />
        <input
          type='radio'
          name='slider'
          id='tab-3'
        />
        <header>
          <label
            htmlFor='tab-1'
            className='tab-1'>
            Basic
          </label>
          <label
            htmlFor='tab-2'
            className='tab-2'>
            Standard
          </label>
          <label
            htmlFor='tab-3'
            className='tab-3'>
            Team
          </label>
          <div className='slider'></div>
        </header>
        <div className='price_area'>
          <div className='cards'>
            <div className='price_row row-1'>
              <div className='price-details'>
                <span className='price'>19</span>
                <p>For beginner use</p>
              </div>
              <ul className='features'>
                <li>
                  <i className='fas fa-check'></i>
                  <span>100 GB Premium Bandwidth</span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>FREE 50+ Installation Scripts WordPress Supported</span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>
                    One FREE Domain Registration .com and .np extensions only
                  </span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>Unlimited Email Accounts & Databases</span>
                </li>
              </ul>
            </div>
            <div className='price_row'>
              <div className='price-details'>
                <span className='price'>99</span>
                <p>For professional use</p>
              </div>
              <ul className='features'>
                <li>
                  <i className='fas fa-check'></i>
                  <span>Unlimited GB Premium Bandwidth</span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>
                    FREE 200+ Installation Scripts WordPress Supported
                  </span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>
                    Five FREE Domain Registration .com and .np extensions only
                  </span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>Unlimited Email Accounts & Databases</span>
                </li>
              </ul>
            </div>
            <div className='price_row'>
              <div className='price-details'>
                <span className='price'>49</span>
                <p>For team collaboration</p>
              </div>
              <ul className='features'>
                <li>
                  <i className='fas fa-check'></i>
                  <span>200 GB Premium Bandwidth</span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>
                    FREE 100+ Installation Scripts WordPress Supported
                  </span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>
                    Two FREE Domain Registration .com and .np extensions only
                  </span>
                </li>
                <li>
                  <i className='fas fa-check'></i>
                  <span>Unlimited Email Accounts & Databases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button onClick={() => toast.error('First add any billing method..!!')}>
          Choose plan
        </button>
      </div>
    </div>
  );
};
