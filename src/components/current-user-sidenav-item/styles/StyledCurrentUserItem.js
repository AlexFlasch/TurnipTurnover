import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: ${palette.scale(3.5)};

  opacity: 0.8;

  button,
  a {
    display: flex;
    align-content: center;

    padding: 0;

    border: none;
    background: none;

    cursor: pointer;

    height: ${palette.scale(1)};
    width: ${palette.scale(9)};
    color: #000;
    opacity: 0.6;
    text-decoration: none;
    font-size: ${palette.scale(1)};
    line-height: ${palette.scale(2)};

    span {
      margin: auto 0;
      white-space: pre;
      line-height: ${palette.scale(2)};
      padding: ${palette.scale(-5)};
    }
  }
`;
