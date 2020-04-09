import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// contexts
import AuthContext from '../../contexts/auth';

// gql queries
import useDisplayNameExists from '../../gql/queries/displayNameExists';

// helper functions
import { isValidEmail, isValidPassword } from '../../utils/validation-fns';

// components
import Input from '../input/Input';
import Button from '../button/Button';

const RegisterForm = props => {
  const { firebase } = useContext(AuthContext);

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

  // const {
  //   data: displayNameData,
  //   loading: displayNameLoading,
  // } = useDisplayNameExists({
  //   variables: { displayName: displayNameValue },
  // });
  // const [displayNameIsValid, setDisplayNameIsValid] = useState(false);
  // const [displayNameValidationMsg, setDisplayNameValidationMsg] = useState('');
  // useEffect(() => {
  //   if (!displayNameLoading) {
  //     const exists = displayNameData.Users && displayNameData.Users.length > 0;
  //     setDisplayNameIsValid(!exists);

  //     if (exists) {
  //       setDisplayNameValidationMsg('This display name is already taken.');
  //     } else {
  //       setDisplayNameValidationMsg('');
  //     }
  //   }
  // });

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
          handleChange={setDisplayNameValue}
          autoComplete="display-name"
          // isValid={displayNameIsValid}
          // validationMessage={displayNameValidationMsg}
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
