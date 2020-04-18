import styled from 'styled-components';
import Modal, { BaseModalBackground } from 'styled-react-modal';

import palette from '../../../theme-palette';

export const modalBackdrop = styled(BaseModalBackground)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default Modal.styled`
  position: relative;
  width: 500px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    text-align: center;
    font-size: 1.25em;
    font-weight: bold;
    margin: 0;
  }

  .button-container {
    text-align: center;
  }

  .modal-switch {
    margin-top: 25px;
    text-align: center;
  }

  button.link {
    background: none;
    border: 0;
    color: ${palette.accentMint};
    cursor: pointer;
    font-size: inherit;

    &:hover {
      text-decoration: underline;
    }
  }

  .no-backface {
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .hr {
    margin: 25px 0;
    border: 0;
    min-height: 1px;
    height: 1px;
    background-color: ${palette.uiLight};
  }

  .rotatable-form {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 25px;
    border-radius: 5px;
    color: ${palette.uiLight};
    background-color: ${palette.uiDark};
    box-shadow: ${palette.cardShadow};
  }

  .modal-close-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    color: ${palette.uiLight};
    background: none;
    border: 0;
    font-size: 2em;
    cursor: pointer;
  }

  .form-error {
    text-align: center;
  }

  .form-error-msg {
    color: ${palette.error};
  }

  .form-msg {
    &.success {
      color: ${palette.accentLime};
    }

    &.error {
      color: ${palette.error};
    }
  }

  ${palette.mobile} {
    & {
      width: 100vw;
    }
  }
`;
