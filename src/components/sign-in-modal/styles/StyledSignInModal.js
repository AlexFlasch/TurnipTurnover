import Modal from 'styled-react-modal';

import palette from '../../../theme-palette';

export default Modal.styled`
  position: relative;
  width: 500px;
  height: 500px;

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
  }

  .no-backface {
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .hr {
    margin: 20px 0;
    border: 0;
    min-height: 1px;
    height: 1px;
    background-color: ${palette.uiLight};
  }

  .rotatable-form {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    padding: 25px;
    border-radius: 5px;
    color: ${palette.uiLight};
    background-color: ${palette.uiDark};
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
`;
