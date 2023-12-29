/* eslint-disable jsx-a11y/anchor-is-valid */

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { react_url } from '.';
import {
  confirmResetPassword,
  deleteUser,
  resendSignUpCode,
  resetPassword,
  updatePassword,
} from 'aws-amplify/auth';
import Cookies from 'js-cookie';

export const Profile = ({ screenSize }) => {
  const usenavigate = useNavigate('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [visible, setVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordDialog, setNewPasswordDialog] = useState('');
  const [usersEmailID, setUsersEmailID] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [text, setText] = useState({
    linkedin: '',
    twitter: '',
    github: '',
    instagram: '',
    facebook: '',
    email: '',
  });
  const [publicInfo, setPublicInfo] = useState({
    username: '',
    bio: '',
    email: '',
  });
  const [privateInfo, setPrivateInfo] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });
  const header = <div className='font-bold mb-3'>Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className='mt-2'>Suggestions</p>
      <ul className='pl-2 ml-2 mt-0 line-height-3'>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
  const accountDeletion = async () => {
    try {
      await deleteUser();
      sessionStorage.removeItem('isValidUser');
      sessionStorage.removeItem('usersEmailID');
      Cookies.remove('isValidUser');
      Cookies.remove('usersEmailID');
      usenavigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const confirm = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to delete your account?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger reject_class',
      rejectClassName: 'p-button-text reject_class',
      accept: () =>
        toast.promise(accountDeletion(), {
          loading: 'Deleting your account...',
          error: 'Error in deleting your account',
          success: 'Account Deleted Successfully',
        }),
    });
  };
  const handleSocialLinks = (val, platform) => {
    if (val !== null && val !== '') {
      let url;
      switch (platform) {
        case 'linkedin':
          url = `https://www.linkedin.com/in/${val}`;
          break;
        case 'instagram':
          url = `https://www.instagram.com/${val}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/${val}`;
          break;
        case 'twitter':
          url = `https://twitter.com/${val}`;
          break;
        case 'github':
          url = `https://github.com/${val}`;
          break;
        default:
          break;
      }
      if (url) {
        window.open(url, '_blank');
      }
    }
  };
  const handleNotification = () => {
    const notify_checks = document.querySelectorAll('.initialOn');
    notify_checks.forEach((item) => {
      if (item.checked) {
        item.checked = false;
      }
    });
    toast.success('Unsubscribed from all Notifications');
  };
  const handleImgUpload = () => {
    console.log(currentUser);
  };
  const handlePublicInfoForm = (e) => {
    e.preventDefault();
    const publicInfoUpdate = async () => {
      const response = await axios.post(
        `${react_url}/userdetails/add`,
        publicInfo
      );
      return response;
    };
    toast.promise(publicInfoUpdate(), {
      loading: 'Pending...',
      error: 'Error in updating your profile',
      success: 'Profile Updated Successfully',
    });
  };
  const handlePrivateInfoForm = (e) => {
    e.preventDefault();
    const privateInfoUpdate = async () => {
      const response = await axios.post(
        `${react_url}/userdetails/add`,
        privateInfo
      );
      return response;
    };
    toast.promise(privateInfoUpdate(), {
      loading: 'Pending...',
      error: 'Error in updating your profile',
      success: 'Profile Updated Successfully',
    });
  };
  const handleResetPassword = async () => {
    try {
      const output = await resetPassword({ username: usersEmailID });
      handleResetPasswordNextSteps(output);
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmResetPassword = async () => {
    try {
      await confirmResetPassword({
        username: usersEmailID,
        confirmationCode,
        newPassword: newPasswordDialog,
      });
      const mockOutput = {
        nextStep: {
          resetPasswordStep: 'DONE',
        },
      };
      handleResetPasswordNextSteps(mockOutput);
      toast.success('Successfully reset password.');
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };
  const handleResetPasswordNextSteps = async (output) => {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        toast.success(
          `Verification code sent to ${codeDeliveryDetails.destination}`
        );
        setVisible(true);
        break;
      case 'DONE':
        setVisible(false);
        toast.success('Successfully reset password.');
        break;
      default:
        toast.error('Error resetting password');
    }
  };
  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: usersEmailID });
      toast.success('Code Resent Successfully');
    } catch (error) {
      console.error('Error resending code', error);
      toast.error('Code Resend failed');
    }
  };
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword({ oldPassword, newPassword });
      toast.success('Password updated successfully');
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const storedUsersEmailID =
      Cookies.get('usersEmailID') || sessionStorage.getItem('usersEmailID');
    setUsersEmailID(storedUsersEmailID);
    const fetchDetails = async () => {
      try {
        if (storedUsersEmailID) {
          const response = await axios.get(
            `${react_url}/userdetails/${storedUsersEmailID}`
          );
          const userData = response.data;
          setCurrentUser(userData);
          setPublicInfo((prevState) => ({
            ...prevState,
            username: userData.username,
            bio: userData.bio,
            email: userData.email,
          }));
          setPrivateInfo((prevState) => ({
            ...prevState,
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
          }));
          setText((prevState) => ({
            ...prevState,
            linkedin: userData.linkedin,
            instagram: userData.instagram,
            github: userData.github,
            twitter: userData.twitter,
            facebook: userData.facebook,
            email: userData.email,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    toast.promise(fetchDetails(), {
      loading: 'Getting your details...',
      error: 'Error in getting your details',
      success: 'Details Recieved Successfully',
    });
  }, []);
  return (
    <div className='profile_body'>
      <div className='container p-0'>
        <nav
          aria-label='breadcrumb'
          className='main-breadcrumb mt-4'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <span
                style={{
                  color: 'rgb(86, 86, 255)',
                  cursor: 'pointer',
                }}
                onClick={() => usenavigate('/')}>
                Home
              </span>
            </li>
            <li
              className='breadcrumb-item active'
              aria-current='page'>
              Profile Settings
            </li>
          </ol>
        </nav>
        <div className='row'>
          <div className='col-md-5 col-xl-4'>
            <div className='card'>
              <div className='card-header'>
                <h5 className='card-title mb-0'>Profile Settings</h5>
              </div>
              <div
                className='list-group list-group-flush'
                role='tablist'>
                <a
                  className='list-group-item list-group-item-action active d-flex'
                  data-toggle='list'
                  href='#account'
                  role='tab'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-user mr-2'>
                    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                    <circle
                      cx='12'
                      cy='7'
                      r='4'></circle>
                  </svg>
                  Profile Information
                </a>
                <a
                  className='list-group-item list-group-item-action'
                  data-toggle='list'
                  href='#'
                  role='tab'>
                  My Courses
                </a>
                <a
                  className='list-group-item list-group-item-action d-flex'
                  data-toggle='list'
                  href='#notify'
                  role='tab'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-bell mr-2'>
                    <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'></path>
                    <path d='M13.73 21a2 2 0 0 1-3.46 0'></path>
                  </svg>
                  Notification
                </a>
                <a
                  className='list-group-item list-group-item-action d-flex'
                  data-toggle='list'
                  href='#billing'
                  role='tab'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-credit-card mr-2'>
                    <rect
                      x='1'
                      y='4'
                      width='22'
                      height='16'
                      rx='2'
                      ry='2'></rect>
                    <line
                      x1='1'
                      y1='10'
                      x2='23'
                      y2='10'></line>
                  </svg>
                  Billing Details
                </a>
                <a
                  className='list-group-item list-group-item-action d-flex'
                  data-toggle='list'
                  href='#password'
                  role='tab'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-settings mr-2'>
                    <circle
                      cx='12'
                      cy='12'
                      r='3'></circle>
                    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
                  </svg>
                  Account Settings
                </a>
              </div>
            </div>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>
                  <span>Social Links</span>
                  <span style={{ fontSize: '12px', marginLeft: '130px' }}>
                    Click to Edit
                  </span>
                </h5>
                <hr />
                <div className='d-flex align-items-center'>
                  <Tooltip target='.fa-linkedin' />
                  <i
                    onClick={() => handleSocialLinks(text.linkedin, 'linkedin')}
                    style={{ cursor: 'pointer' }}
                    data-pr-tooltip='LinkedIn'
                    data-pr-position='Left'
                    data-pr-at='left-2 top'
                    data-pr-my='right center+7'
                    className='fab fa-linkedin'></i>
                  <Inplace
                    closable
                    onClose={async () => {
                      const updatedText = { ...text, email: usersEmailID };
                      text.linkedin &&
                        (await axios
                          .post(`${react_url}/userdetails/add`, updatedText)
                          .then(() => toast.success('Updated')));
                    }}>
                    <InplaceDisplay>
                      {text.linkedin || 'https://www.linkedin.com/in/'}
                    </InplaceDisplay>
                    <InplaceContent>
                      <InputText
                        value={text.linkedin}
                        onChange={(e) =>
                          setText({ ...text, linkedin: e.target.value })
                        }
                        autoFocus
                      />
                    </InplaceContent>
                  </Inplace>
                </div>
                <br />
                <div className='d-flex align-items-center'>
                  <Tooltip target='.fa-instagram' />
                  <i
                    onClick={() =>
                      handleSocialLinks(text.instagram, 'instagram')
                    }
                    style={{ cursor: 'pointer' }}
                    data-pr-tooltip='Instagram'
                    data-pr-position='Left'
                    data-pr-at='left-2 top'
                    data-pr-my='right center+7'
                    className='fab fa-instagram'></i>
                  <Inplace
                    closable
                    onClose={async () => {
                      const updatedText = { ...text, email: usersEmailID };
                      text.instagram &&
                        (await axios
                          .post(`${react_url}/userdetails/add`, updatedText)
                          .then(() => toast.success('Updated')));
                    }}>
                    <InplaceDisplay>
                      {text.instagram || 'https://www.instagram.com/'}
                    </InplaceDisplay>
                    <InplaceContent>
                      <InputText
                        value={text.instagram}
                        onChange={(e) =>
                          setText({ ...text, instagram: e.target.value })
                        }
                        autoFocus
                      />
                    </InplaceContent>
                  </Inplace>
                </div>
                <br />
                <div className='d-flex align-items-center'>
                  <Tooltip target='.fa-github' />
                  <i
                    onClick={() => handleSocialLinks(text.github, 'github')}
                    style={{ cursor: 'pointer' }}
                    data-pr-tooltip='GitHub'
                    data-pr-position='Left'
                    data-pr-at='left-2 top'
                    data-pr-my='right center+7'
                    className='fab fa-github'></i>
                  <Inplace
                    closable
                    onClose={async () => {
                      const updatedText = { ...text, email: usersEmailID };
                      text.github &&
                        (await axios
                          .post(`${react_url}/userdetails/add`, updatedText)
                          .then(() => toast.success('Updated')));
                    }}>
                    <InplaceDisplay>
                      {text.github || 'https://github.com/'}
                    </InplaceDisplay>
                    <InplaceContent>
                      <InputText
                        value={text.github}
                        onChange={(e) =>
                          setText({ ...text, github: e.target.value })
                        }
                        autoFocus
                      />
                    </InplaceContent>
                  </Inplace>
                </div>
                <br />
                <div className='d-flex align-items-center'>
                  <Tooltip target='.fa-twitter' />
                  <i
                    onClick={() => handleSocialLinks(text.twitter, 'twitter')}
                    style={{ cursor: 'pointer' }}
                    data-pr-tooltip='Twitter'
                    data-pr-position='Left'
                    data-pr-at='left-2 top'
                    data-pr-my='right center+7'
                    className='fab fa-twitter'></i>
                  <Inplace
                    closable
                    onClose={async () => {
                      const updatedText = { ...text, email: usersEmailID };
                      text.twitter &&
                        (await axios
                          .post(`${react_url}/userdetails/add`, updatedText)
                          .then(() => toast.success('Updated')));
                    }}>
                    <InplaceDisplay>
                      {text.twitter || 'https://twitter.com/'}
                    </InplaceDisplay>
                    <InplaceContent>
                      <InputText
                        value={text.twitter}
                        onChange={(e) =>
                          setText({ ...text, twitter: e.target.value })
                        }
                        autoFocus
                      />
                    </InplaceContent>
                  </Inplace>
                </div>
                <br />
                <div className='d-flex align-items-center'>
                  <Tooltip target='.fa-facebook' />
                  <i
                    onClick={() => handleSocialLinks(text.facebook, 'facebook')}
                    style={{ cursor: 'pointer' }}
                    data-pr-tooltip='Facebook'
                    data-pr-position='Left'
                    data-pr-at='left-2 top'
                    data-pr-my='right center+7'
                    className='fab fa-facebook'></i>
                  <Inplace
                    closable
                    onClose={async () => {
                      const updatedText = { ...text, email: usersEmailID };
                      text.facebook &&
                        (await axios
                          .post(`${react_url}/userdetails/add`, updatedText)
                          .then(() => toast.success('Updated')));
                    }}>
                    <InplaceDisplay>
                      {text.facebook || 'https://www.facebook.com/'}
                    </InplaceDisplay>
                    <InplaceContent>
                      <InputText
                        value={text.facebook}
                        onChange={(e) =>
                          setText({ ...text, facebook: e.target.value })
                        }
                        autoFocus
                      />
                    </InplaceContent>
                  </Inplace>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7 col-xl-8'>
            <div className='tab-content'>
              <div
                className='tab-pane fade show active'
                id='account'
                role='tabpanel'>
                <div className='card'>
                  <div className='card-header'>
                    <div className='card-actions float-right'>
                      <div className='dropdown show'>
                        <span
                          style={{ color: 'blue', cursor: 'pointer' }}
                          data-toggle='dropdown'
                          data-display='static'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='feather feather-more-horizontal align-middle'>
                            <circle
                              cx='12'
                              cy='12'
                              r='1'></circle>
                            <circle
                              cx='19'
                              cy='12'
                              r='1'></circle>
                            <circle
                              cx='5'
                              cy='12'
                              r='1'></circle>
                          </svg>
                        </span>
                        <div className='dropdown-menu dropdown-menu-right'>
                          <a
                            className='dropdown-item'
                            href='#'>
                            Action
                          </a>
                          <a
                            className='dropdown-item'
                            href='#'>
                            Another action
                          </a>
                          <a
                            className='dropdown-item'
                            href='#'>
                            Something else here
                          </a>
                        </div>
                      </div>
                    </div>
                    <h5 className='card-title mb-0'>Public info</h5>
                  </div>
                  <div className='card-body'>
                    <form onSubmit={handlePublicInfoForm}>
                      <div
                        className={`${
                          screenSize > 1000
                            ? 'row'
                            : 'd-flex align-items-center flex-column'
                        }`}>
                        <div className='col-md-8'>
                          <div
                            className={`form-group ${
                              screenSize < 1000 && 'row'
                            }`}>
                            <label htmlFor='inputUsername'>Username</label>
                            <input
                              type='text'
                              value={publicInfo.username}
                              onChange={(e) =>
                                setPublicInfo((prevPublicInfo) => ({
                                  ...prevPublicInfo,
                                  username: e.target.value,
                                }))
                              }
                              className='form-control'
                              id='inputUsername'
                              placeholder='Username'
                            />
                          </div>
                          <div
                            className={`form-group ${
                              screenSize < 1000 && 'row'
                            }`}>
                            <label htmlFor='inputUsername'>Biography</label>
                            <textarea
                              rows='2'
                              value={publicInfo.bio}
                              onChange={(e) =>
                                setPublicInfo((prevPublicInfo) => ({
                                  ...prevPublicInfo,
                                  bio: e.target.value,
                                }))
                              }
                              className='form-control'
                              id='inputBio'
                              placeholder='Tell something about yourself'></textarea>
                          </div>
                        </div>
                        <div
                          className={`${
                            screenSize > 1000 ? 'col-md-4' : 'row'
                          }`}>
                          <div className='text-center'>
                            <Image
                              alt='Profile Image'
                              src='https://bootdey.com/img/Content/avatar/avatar1.png'
                              className='img-responsive mt-2'
                              width='128'
                              height='128'
                              preview
                            />
                            <div className={`${screenSize < 1000 && 'mt-2'}`}>
                              <span className='btn btn-primary'>
                                <i
                                  onClick={handleImgUpload}
                                  className='fa fa-upload'></i>
                              </span>
                            </div>
                            <small>
                              For best results, use an image at least 128px by
                              128px in .jpg or .png format
                            </small>
                          </div>
                        </div>
                      </div>
                      <button
                        type='submit'
                        className='btn btn-primary mt-4'>
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>
                <div className='card'>
                  <div className='card-header'>
                    <div className='card-actions float-right'>
                      <div className='dropdown show'>
                        <span
                          style={{ color: 'blue', cursor: 'pointer' }}
                          data-toggle='dropdown'
                          data-display='static'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='feather feather-more-horizontal align-middle'>
                            <circle
                              cx='12'
                              cy='12'
                              r='1'></circle>
                            <circle
                              cx='19'
                              cy='12'
                              r='1'></circle>
                            <circle
                              cx='5'
                              cy='12'
                              r='1'></circle>
                          </svg>
                        </span>
                        <div className='dropdown-menu dropdown-menu-right'>
                          <a
                            className='dropdown-item'
                            href='#'>
                            Action
                          </a>
                          <a
                            className='dropdown-item'
                            href='#'>
                            Another action
                          </a>
                          <a
                            className='dropdown-item'
                            href='#'>
                            Something else here
                          </a>
                        </div>
                      </div>
                    </div>
                    <h5 className='card-title mb-0'>Private info</h5>
                  </div>
                  <div className='card-body'>
                    <form onSubmit={handlePrivateInfoForm}>
                      <div className='form-row'>
                        <div className='form-group col-md-6'>
                          <label htmlFor='inputFirstName'>First name</label>
                          <input
                            type='text'
                            value={privateInfo.firstname}
                            onChange={(e) =>
                              setPrivateInfo((prevPrivateInfo) => ({
                                ...prevPrivateInfo,
                                firstname: e.target.value,
                              }))
                            }
                            className='form-control'
                            id='inputFirstName'
                            placeholder='First name'
                          />
                        </div>
                        <div className='form-group col-md-6'>
                          <label htmlFor='inputLastName'>Last name</label>
                          <input
                            type='text'
                            value={privateInfo.lastname}
                            onChange={(e) =>
                              setPrivateInfo((prevPrivateInfo) => ({
                                ...prevPrivateInfo,
                                lastname: e.target.value,
                              }))
                            }
                            className='form-control'
                            id='inputLastName'
                            placeholder='Last name'
                          />
                        </div>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='inputEmail4'>Email</label>
                        <input
                          type='email'
                          value={usersEmailID}
                          // value={privateInfo.email}
                          // onChange={(e) =>
                          //   setPrivateInfo((prevPrivateInfo) => ({
                          //     ...prevPrivateInfo,
                          //     email: e.target.value,
                          //   }))
                          // }
                          disabled
                          className='form-control'
                          id='inputEmail4'
                          placeholder='Email'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='inputAddress'>Address</label>
                        <input
                          type='text'
                          className='form-control'
                          id='inputAddress'
                          placeholder='1234 Main St'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='inputAddress2'>Address 2</label>
                        <input
                          type='text'
                          className='form-control'
                          id='inputAddress2'
                          placeholder='Apartment, studio, or floor'
                        />
                      </div>
                      <div className='form-row'>
                        <div className='form-group col-md-6'>
                          <label htmlFor='inputCity'>City</label>
                          <input
                            type='text'
                            className='form-control'
                            id='inputCity'
                          />
                        </div>
                        <div className='form-group col-md-4'>
                          <label htmlFor='inputState'>State</label>
                          <select
                            id='inputState'
                            className='form-control'
                            defaultValue='Choose'>
                            {/* <option selected=''>Choose...</option>
                            <option>...</option> */}
                          </select>
                        </div>
                        <div className='form-group col-md-2'>
                          <label htmlFor='inputZip'>Zip</label>
                          <input
                            type='text'
                            className='form-control'
                            id='inputZip'
                          />
                        </div>
                      </div>
                      <button
                        type='submit'
                        className='btn btn-primary'>
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className='tab-pane fade'
                id='notify'
                role='tabpanel'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Email Notifications</h5>
                    <hr />
                    <form>
                      <div className='mb-3'>
                        <label
                          className='small mb-1'
                          htmlFor='inputNotificationEmail'>
                          Default notification email
                        </label>
                        <input
                          className='form-control'
                          id='inputNotificationEmail'
                          type='email'
                          value='name@example.com'
                          disabled
                        />
                      </div>
                      <div className='mb-0'>
                        <label className='small mb-2'>
                          Choose which types of email updates you receive
                        </label>
                        <div className='form-check mb-2'>
                          <input
                            className='initialOn form-check-input'
                            id='checkAccountChanges'
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            className='form-check-label'
                            htmlFor='checkAccountChanges'>
                            Changes made to your account
                          </label>
                        </div>
                        <div className='form-check mb-2'>
                          <input
                            className='initialOn form-check-input'
                            id='checkAccountGroups'
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            className='form-check-label'
                            htmlFor='checkAccountGroups'>
                            Changes are made to groups you're part of
                          </label>
                        </div>
                        <div className='form-check mb-2'>
                          <input
                            className='initialOn form-check-input'
                            id='checkProductUpdates'
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            className='form-check-label'
                            htmlFor='checkProductUpdates'>
                            Product updates for products you've purchased or
                            starred
                          </label>
                        </div>
                        <div className='form-check mb-2'>
                          <input
                            className='initialOn form-check-input'
                            id='checkProductNew'
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            className='form-check-label'
                            htmlFor='checkProductNew'>
                            Information on new products and services
                          </label>
                        </div>
                        <div className='form-check mb-2'>
                          <input
                            className='initialOn form-check-input'
                            id='checkPromotional'
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            className='form-check-label'
                            htmlFor='checkPromotional'>
                            Marketing and promotional offers
                          </label>
                        </div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            id='checkSecurity'
                            type='checkbox'
                            defaultChecked
                            disabled
                          />
                          <label
                            className='form-check-label'
                            htmlFor='checkSecurity'>
                            Security alerts
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Push Notifications</h5>
                    <hr />
                    <form>
                      <div style={{ position: 'relative' }}>
                        <div className='mb-3'>
                          <label
                            className='small mb-1'
                            htmlFor='inputNotificationSms'>
                            Default SMS number
                          </label>
                          <input
                            className='form-control'
                            id='inputNotificationSms'
                            type='tel'
                            value='Your Phone Number'
                            disabled
                          />
                        </div>
                        <div className='mb-0'>
                          <label className='small mb-2'>
                            Choose which types of push notifications you receive
                          </label>
                          <div className='form-check mb-2'>
                            <input
                              className='form-check-input'
                              id='checkSmsComment'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='checkSmsComment'>
                              Someone comments on your post
                            </label>
                          </div>
                          <div className='form-check mb-2'>
                            <input
                              className='form-check-input'
                              id='checkSmsShare'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='checkSmsShare'>
                              Someone shares your post
                            </label>
                          </div>
                          <div className='form-check mb-2'>
                            <input
                              className='form-check-input'
                              id='checkSmsFollow'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='checkSmsFollow'>
                              A user follows your account
                            </label>
                          </div>
                          <div className='form-check mb-2'>
                            <input
                              className='form-check-input'
                              id='checkSmsGroup'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='checkSmsGroup'>
                              New posts are made in groups you're part of
                            </label>
                          </div>
                          <div className='form-check'>
                            <input
                              className='form-check-input'
                              id='checkSmsPrivateMessage'
                              type='checkbox'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='checkSmsPrivateMessage'>
                              You receive a private message
                            </label>
                          </div>
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: '0.8',
                          }}
                          className='bg-gray-200 p-3 text-center font-size-sm'>
                          Currently this feature is not available
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Notification Preferences</h5>
                    <hr />
                    <button
                      onClick={handleNotification}
                      className='btn btn-danger-soft text-danger'>
                      Unsubscribe from all notifications
                    </button>
                  </div>
                </div>
              </div>
              <div
                className='tab-pane fade'
                id='billing'
                role='tabpanel'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Billing Information</h5>
                    <hr />
                    <form>
                      <div className='form-group'>
                        <label className='d-block mb-0'>Payment Method</label>
                        <div className='small text-muted mb-3'>
                          You have not added a payment method
                        </div>
                        <button
                          className='btn btn-info'
                          type='button'>
                          Add Payment Method
                        </button>
                      </div>
                      <div className='form-group mb-0'>
                        <label className='d-block'>Payment History</label>
                        <div className='border border-gray-500 bg-gray-200 p-3 text-center font-size-sm'>
                          You have not made any payment.
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className='tab-pane fade'
                id='password'
                role='tabpanel'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Change Password</h5>
                    <hr />
                    <form onSubmit={handleUpdatePassword}>
                      <div className='form-group'>
                        <label htmlFor='inputPasswordCurrent'>
                          Current password
                        </label>
                        <input
                          type='password'
                          className='form-control'
                          id='inputPasswordCurrent'
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <small>
                          <a
                            style={{
                              color: 'blue',
                            }}
                            onClick={handleResetPassword}>
                            Forgot your password?
                          </a>
                        </small>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='inputPasswordNew'>New password</label>
                        <input
                          type='password'
                          className='form-control'
                          id='inputPasswordNew'
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      {/* <div className='form-group'>
                        <label htmlFor='inputPasswordNew2'>
                          Verify password
                        </label>
                        <input
                          type='password'
                          className='form-control'
                          id='inputPasswordNew2'
                        />
                      </div> */}
                      <button
                        type='submit'
                        className='btn btn-primary'>
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Account Settings</h5>
                    <hr />
                    <form>
                      <div className='form-group'>
                        <label className='d-block text-danger'>
                          Delete Account
                        </label>
                        <p className='text-muted font-size-sm'>
                          Once you delete your account, there is no going back.
                          Please be certain. If you are sure you want to delete
                          your account, select the button below.
                        </p>
                      </div>
                      <ConfirmPopup />
                      <button
                        onClick={confirm}
                        className='btn btn-danger'
                        type='button'>
                        I understand, delete my account
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <Dialog
                header='Reset Password'
                visible={visible}
                position='top'
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
                draggable={false}
                resizable={false}
                closeOnEscape={false}
                closable={false}>
                <p className='m-0'>
                  Enter the confirmation code sent to your email address and
                  then the new password you want to set.
                </p>
                <InputText
                  style={{ height: '40px', marginTop: '10px' }}
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder='Confirmation Code'
                  autoFocus
                />
                <br />
                <br />
                <span className='p-float-label'>
                  <Password
                    id='newPasswordDialog'
                    style={{ height: '40px' }}
                    value={newPasswordDialog}
                    onChange={(e) => setNewPasswordDialog(e.target.value)}
                    header={header}
                    footer={footer}
                    toggleMask
                  />
                  <label htmlFor='newPasswordDialog'>New Password</label>
                </span>
                <div className='flex flex-wrap justify-content-center gap-3'>
                  <Button
                    onClick={handleResendCode}
                    style={{ borderRadius: '8px', outline: 'none' }}
                    label='Re-send code'
                  />
                  <Button
                    style={{ borderRadius: '8px', outline: 'none' }}
                    onClick={handleConfirmResetPassword}
                    label='Submit'
                    icon='pi pi-check'
                    severity='success'
                  />
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
