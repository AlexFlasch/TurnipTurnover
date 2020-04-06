import Modal from 'styled-react-modal';

import palette from '../../../theme-palette';

export default Modal.styled`
  width: 500px;

  padding: 15px;

  color: ${palette.uiLight};
  background-color: ${palette.uiDark};
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  border-radius: 5px;

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
`;
