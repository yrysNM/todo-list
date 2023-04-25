import React from 'react';
import {useLottie} from 'lottie-react';
import {useAppSelector} from '../../hooks/redux.hook';

import errorAnimation from '../../assets/json/failed.json';

import './errorMessage.scss';

export const ErrorMessage = ({customErrorText}: {customErrorText: string}) => {
  const {errorText} = useAppSelector((state) => state.user);

  const options = {
    animationData: errorAnimation,
    loop: true,
  };

  const {View} = useLottie(options);

  return (
    <div className="errorMessage">
      <div className="animationBlock">{View}</div>
      <p className="sub-title errorText">{errorText ?? customErrorText}</p>
    </div>
  );
};
