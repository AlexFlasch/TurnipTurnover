import Modal from 'styled-react-modal';

import palette from '../../../theme-palette';

export default Modal.styled`
  width: 500px;
  height: 50vh;

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
`;
