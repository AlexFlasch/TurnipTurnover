import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/react-hooks';

// contexts
import AuthContext from '../../contexts/auth';

// gql queries
import { query } from '../../gql/queries/displayNameExists';

// helper functions
import { isValidEmail, isValidPassword } from '../../utils/validation-fns';

// components
import Input from '../input/Input';
import Button from '../button/Button';

const RegisterForm = props => {
  const { user, registerUser } = useContext(AuthContext);

  const [emailValue, setEmailValue] = useState('');
  const [displayNameValue, setDisplayNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

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

  const [
    checkDisplayNameExists,
    {
      called: displayNameCalled,
      data: displayNameData,
      loading: displayNameLoading,
    },
  ] = useLazyQuery(query, {
    variables: { displayName: displayNameValue },
  });
  const [displayNameIsValid, setDisplayNameIsValid] = useState(false);
  const [displayNameValidationMsg, setDisplayNameValidationMsg] = useState('');
  useEffect(() => {
    if (displayNameCalled && !displayNameLoading) {
      const exists = displayNameData.Users && displayNameData.Users.length > 0;
      setDisplayNameIsValid(!exists);

      if (exists) {
        setDisplayNameValidationMsg('This display name is already taken.');
      } else {
        setDisplayNameValidationMsg('');
      }
    }
  });

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

  // check if entire form is valid
  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    const valid = emailIsValid && passwordIsValid && confirmPasswordIsValid;
    setFormIsValid(valid);
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);

  const [registrationError, setRegistrationError] = useState(undefined);
  const registerWithEmail = async () => {
    const error = await registerUser(emailValue, passwordValue);
    if (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setRegistrationError('An account with this email already exists.');
          break;

        default:
          setRegistrationError('An unknown error occurred. Please try again.');
          console.log('firebase auth error: ', error);
          break;
      }
    } else {
      setRegistrationError(undefined);
      console.log('registered user: ', user);
    }
  };

  const formError = (
    <div className="form-error">
      <p className="center form-error-msg">{registrationError}</p>
    </div>
  );

  return (
    <>
      <button
        className="modal-close-btn lnr lnr-cross"
        onClick={props.handleCloseClick}
      />
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
          type="text"
          label="Display Name"
          handleChange={value => {
            setDisplayNameValue(value);
            checkDisplayNameExists();
          }}
          autoComplete="display-name"
          isValid={displayNameIsValid}
          validationMessage={displayNameValidationMsg}
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
          validationMessage={confirmPasswordValidationMsg}
        />
      </form>
      {registrationError !== undefined ? formError : null}
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
