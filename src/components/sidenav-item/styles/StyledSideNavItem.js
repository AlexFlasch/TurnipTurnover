import styled from 'styled-components';

export default styled.li`
  width: 100%;
  height: 75px;

  opacity: 0.8;

  a,
  button {
    display: flex;
    align-content: center;
    justify-content: flex-start;

    padding: 0;

    border: none;
    background: none;

    cursor: pointer;

    height: 75px;
    width: 100%;
    color: #000;
    opacity: 0.6;
    text-decoration: none;
    font-size: 30px;
    line-height: 30px;

    span {
      margin: auto 0;
      white-space: pre;
    }
  }
`;
