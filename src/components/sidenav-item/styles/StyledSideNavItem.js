import styled from 'styled-components';

import palette from '../../../theme-palette';

export default styled.li`
  width: 100%;
  height: ${palette.scale(3.5)};
  margin: ${palette.scale(-2)} 0;

  opacity: 0.8;

  a,
  button {
    display: flex;
    align-content: center;
    justify-content: flex-start;

    padding: 0;

    background: none;

    cursor: pointer;

    height: ${palette.scale(3.5)};
    width: ${palette.scale(9)};
    color: #000;
    opacity: 0.6;
    text-decoration: none;
    font-size: ${palette.scale(1)};
    line-height: ${palette.scale(2)};
    border: 0;

    span {
      white-space: pre;
      line-height: ${palette.scale(2)};
      padding: ${palette.scale(-5)};
    }
  }
`;
