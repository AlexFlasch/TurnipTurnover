import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../../contexts/auth';

import Input from '../input/Input';
import Button from '../button/Button';

import { isValidEmail, isValidPassword } from '../../utils/validation-fns';

const SignInForm = props => {
  const { firebase } = useContext(AuthContext);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  // validate fields
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
      setPasswordValidationMsg('Password must be at least 8 characters long.');
    }
  }, [passwordValue]);

  // check to see if the entire form is valid
  useEffect(() => {
    const valid = emailIsValid && passwordIsValid;
    console.log('form is valid? ', valid);
    setFormIsValid(valid);
  }, [emailIsValid, passwordIsValid]);

  const signInWithEmail = async () => {
    console.log('email: ', emailValue);
    console.log('password: ', passwordValue);

    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(emailValue, passwordValue);

    console.log('user: ', user);
  };

  return (
    <>
      <p className="title">Sign in</p>
      <form onSubmit={signInWithEmail}>
        <Input
          label="Email"
          handleChange={setEmailValue}
          autoComplete="email"
          isValid={emailIsValid}
          validationMessage={emailValidationMsg}
        />
        <Input
          label="Password"
          handleChange={setPasswordValue}
          type="password"
          autoComplete="current-password"
          isValid={passwordIsValid}
          validationMessage={passwordValidationMsg}
        />
      </form>
      <div className="button-container">
        <Button
          type="primary"
          text="Sign In"
          onClick={signInWithEmail}
          disabled={!formIsValid}
        />
      </div>
      <hr />
      <p className="modal-switch">
        Or if you'd like to create an account, you can{' '}
        <button className="link" onClick={props.handleFormChange}>
          register here.
        </button>
      </p>
    </>
  );
};

SignInForm.propTypes = {
  handleFormChange: PropTypes.func,
};

SignInForm.defaultProps = {
  handleFormChange: () => {},
};

export default SignInForm;
