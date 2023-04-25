import React, {useState} from 'react';
import Lottie from 'lottie-react';
import {useNavigate} from 'react-router-dom';

import {Modal} from '../Modal';
import {CustomButton} from '../CustomButton';
import {removeItem} from '../../utils/PresistanceStorage';

import loqOutAnimation from '../../assets/json/logout.json';
import {ReactComponent as InfoIcon} from '../../assets/icons/info.svg';
import './logout.scss';

export const Logout = () => {
  const [openDenial, setOpenDenail] = useState<boolean>();
  const navigate = useNavigate();

  function logOutUser() {
    setOpenDenail(false);
    removeItem('token');
    removeItem('project_id');
    navigate('/login', {replace: false});
  }

  return (
    <>
      <span
        className="logout"
        onClick={() => {
          setOpenDenail(true);
        }}
      >
        Logout
        <Lottie animationData={loqOutAnimation} className="logOut" />
      </span>
      {openDenial && (
        <Modal onClose={() => setOpenDenail(false)}>
          <div className="editModal">
            <InfoIcon className="icon infoModalIcon" />
            <div className="removeItem">
              <p className="title" style={{marginTop: 20}}>
                Are you sure you want to logout?
              </p>

              <div className="form-btns">
                <CustomButton
                  clazz="btn-cancel"
                  type="button"
                  onPressButton={() => setOpenDenail(false)}
                >
                  <span className="title title-cancel">No</span>
                </CustomButton>
                <CustomButton
                  clazz="btn-addTask"
                  type="submit"
                  isPrevent={false}
                  onPressButton={logOutUser}
                >
                  <span className="title title-addTask">Yes I'm sure</span>
                </CustomButton>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
