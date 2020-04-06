import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../../contexts/auth';

import { isValidEmail, isValidPassword } from '../../utils/validation-fns';

import Input from '../input/Input';
import Button from '../button/Button';

const RegisterForm = props => {
  const { firebase } = useContext(AuthContext);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailValidationMsg, setEmailValidationMsg] = useState('');
  useEffect(() => {
    const valid = isValidEmail(emailValue);
    setEmailIsValid(valid);

    if (valid) {
      setEmailValidationMsg('');
    } else {
      setEmailValidationMsg('Please provide a valid email.');
    }
  }, [emailValue]);

  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
  useEffect(() => {
    const valid = isValidPassword(passwordValue);
    setPasswordIsValid(valid);

    if (valid) {
      setPasswordValidationMsg('');
    } else {
      setPasswordValidationMsg('Password must be at least 8 characters.');
    }
  }, [passwordValue]);

  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
  const [
    confirmPasswordValidationMsg,
    setConfirmPasswordValidationMsg,
  ] = useState('');
  useEffect(() => {
    const valid = passwordValue === confirmPasswordValue;
    setConfirmPasswordIsValid(valid);

    if (valid) {
      setConfirmPasswordValidationMsg('');
    } else {
      setConfirmPasswordValidationMsg('Passwords do not match.');
    }
  }, [passwordValue, confirmPasswordValue]);

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    const valid = emailIsValid && passwordIsValid && confirmPasswordIsValid;
    setFormIsValid(valid);
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);

  const registerWithEmail = async () => {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(emailValue, passwordValue);

    console.log('registered user: ', user);
  };

  return (
    <>
      <button
        className="modal-close-btn lnr lnr-cross"
        onClick={props.handleCloseClick}
      ></button>
      <p className="title">Register</p>
      <form onSubmit={formIsValid ? registerWithEmail : () => {}}>
        <Input
          type="text"
          label="Email"
          handleChange={setEmailValue}
          autoComplete="email"
          isValid={emailIsValid}
          validationMessage={emailValidationMsg}
        />
        <Input
          type="password"
          label="Password"
          handleChange={setPasswordValue}
          autoComplete="new-password"
          isValid={passwordIsValid}
          validationMessage={passwordValidationMsg}
        />
        <Input
          type="password"
          label="Confirm Password"
          handleChange={setConfirmPasswordValue}
          autoComplete="confirm-password"
          isValid={confirmPasswordIsValid}
          validationMessage="Entered passwords do not match."
        />
      </form>
      <div className="button-container">
        <Button
          type="primary"
          text="Register"
          onClick={registerWithEmail}
          disabled={!formIsValid}
        />
      </div>
      <div className="hr" />
      <p className="modal-switch">
        If you've already got an account, you can
        <button className="link" onClick={props.handleFormChange}>
          sign in here.
        </button>
      </p>
    </>
  );
};

RegisterForm.propTypes = {
  handleFormChange: PropTypes.func,
};

RegisterForm.defaultProps = {
  handleFormChange: () => {},
};

export default RegisterForm;
