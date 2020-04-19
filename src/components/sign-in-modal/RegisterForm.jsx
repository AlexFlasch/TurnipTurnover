import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/react-hooks';

// contexts
import AuthContext from '../../contexts/auth';

// gql queries
import displayNameQuery from '../../gql/queries/displayNameExists';

// helper functions
import { isValidEmail, isValidPassword } from '../../utils/validation-fns';

// components
import Input from '../input/Input';
import Button from '../button/Button';

const RegisterForm = props => {
  const { registerUser } = useContext(AuthContext);

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
  ] = useLazyQuery(displayNameQuery, {
    variables: { displayName: displayNameValue },
  });
  const [displayNameIsValid, setDisplayNameIsValid] = useState(false);
  const [displayNameValidationMsg, setDisplayNameValidationMsg] = useState('');
  useEffect(() => {
    if (displayNameCalled && !displayNameLoading) {
      const exists = displayNameData.User && displayNameData.User.length > 0;
      setDisplayNameIsValid(!exists);

      if (exists) {
        setDisplayNameValidationMsg('This display name is already taken.');
      } else {
        setDisplayNameValidationMsg('');
      }
    }
  }, [
    displayNameValue,
    displayNameCalled,
    displayNameData,
    displayNameLoading,
  ]);

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
  const registerWithEmail = async event => {
    if (event && formIsValid) {
      event.stopPropagation();
      event.preventDefault();

      const error = await registerUser(
        emailValue,
        displayNameValue,
        passwordValue,
      );

      console.log('registering');

      if (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setRegistrationError('An account with this email already exists.');
            break;

          default:
            setRegistrationError(
              'An unknown error occurred. Please try again.',
            );
            console.log('firebase auth error: ', error);
            break;
        }
      } else {
        setRegistrationError(undefined);
        props.closeModal();
      }
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
      <form onSubmit={registerWithEmail}>
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
        {registrationError !== undefined ? formError : null}
        <div className="button-container">
          <Button
            type="submit"
            color="primary"
            text="Register"
            onClick={registerWithEmail}
            disabled={!formIsValid}
          />
        </div>
      </form>
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
  closeModal: PropTypes.func,
};

RegisterForm.defaultProps = {
  handleFormChange: () => {},
  closeModal: () => {},
};

export default RegisterForm;
