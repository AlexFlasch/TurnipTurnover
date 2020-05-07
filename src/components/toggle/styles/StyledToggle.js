import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: ${palette.scale(2)} 0;

  .top-label {
    color: ${palette.uiLight};
    font-size: ${palette.scale(0)};
  }

  .toggle-container {
    display: flex;
  }

  .toggle-ui {
    position: relative;
    display: flex;
    width: ${palette.scale(4.5)};
    height: ${palette.scale(2)};
    align-items: center;

    background-color: ${palette.uiDark};
    border-radius: ${palette.scale(1)};
    padding: 5px;
    margin: 0 5px;
  }

  .toggle-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .toggle-knob {
    position: absolute;
    left: 0;
    border-radius: 100%;
    width: ${palette.scale(1.5)};
    height: ${palette.scale(1.5)};
    pointer-events: none;
  }

  .off-label {
    font-size: ${palette.scale(-0.5)};
    color: ${palette.uiLight};
  }

  .on-label {
    font-size: ${palette.scale(-0.5)};
    color: ${palette.uiLight};
  }
`;
