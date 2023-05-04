import React from 'react';
import {useLottie} from 'lottie-react';

import errorAnimation from '../../assets/json/failed.json';

import './errorMessage.scss';

export const ErrorMessage = ({customErrorText}: {customErrorText: string}) => {
  const options = {
    animationData: errorAnimation,
    loop: true,
  };

  const {View} = useLottie(options);

  return (
    <div className="errorMessage">
      <div className="animationBlock">{View}</div>
      <p className="sub-title errorText">
        Something went wrong. Please try again.
      </p>
    </div>
  );
};
