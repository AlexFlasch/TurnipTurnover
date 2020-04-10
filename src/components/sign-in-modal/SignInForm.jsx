import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../../contexts/auth';

import Input from '../input/Input';
import Button from '../button/Button';

import { isValidEmail, isValidPassword } from '../../utils/validation-fns';

const SignInForm = props => {
  const { user, signInUser, resetPassword } = useContext(AuthContext);

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
    setFormIsValid(valid);
  }, [emailIsValid, passwordIsValid]);

  const [signInError, setSignInError] = useState(undefined);
  const signInWithEmail = async () => {
    const error = await signInUser(emailValue, passwordValue);

    if (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          setSignInError('Incorrect password.');
          break;

        default:
          setSignInError('Unknown error occurred. Please try again.');
          console.log('firebase sign in error: ', error);
          break;
      }
    } else {
      setSignInError(undefined);
      console.log('signed in user: ', user);
    }
  };

  const [resetEmailSentMsg, setResetEmailSentMsg] = useState({
    msg: '',
    status: '',
  });
  const tryResetPassword = async () => {
    if (emailValue === '') {
      setResetEmailSentMsg({
        msg: 'Please enter an email to send the password reset link to.',
        status: 'error',
      });
    } else {
      const error = await resetPassword(emailValue);
      if (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            setResetEmailSentMsg({
              msg: 'No registered user associated with this email.',
              status: 'error',
            });
            break;

          default:
            setResetEmailSentMsg({
              msg:
                'There was a problem while sending the reset password email. Please try again',
              status: 'error',
            });
            console.log('reset password error: ', error);
            break;
        }
      } else {
        setResetEmailSentMsg({
          msg: `Password reset email sent to ${emailValue}`,
          status: 'success',
        });
      }
    }
  };

  const signInErrorMsg = (
    <div className="form-error">
      <p className="form-error-msg">{signInError}</p>
    </div>
  );

  return (
    <>
      <button
        className="modal-close-btn lnr lnr-cross"
        onClick={props.handleCloseClick}
      />
      <p className="title">Sign in</p>
      <form onSubmit={formIsValid ? signInWithEmail : () => {}}>
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
      {signInError ? signInErrorMsg : null}
      <div className="button-container">
        <p className="center">
          Did you forget your password?
          <button onClick={tryResetPassword} className="link">
            Send a password reset email.
          </button>
        </p>
        {resetEmailSentMsg.msg !== '' ? (
          <p className={`form-msg ${resetEmailSentMsg.status}`}>
            {resetEmailSentMsg.msg}
          </p>
        ) : null}
        <Button
          type="primary"
          text="Sign In"
          onClick={signInWithEmail}
          disabled={!formIsValid}
        />
      </div>
      <div className="hr" />
      <p className="modal-switch">
        Or if you'd like to create an account, you can
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
