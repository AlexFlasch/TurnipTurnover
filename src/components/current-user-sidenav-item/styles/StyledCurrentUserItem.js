import styled from 'styled-components';

export default styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 300px;
  height: 75px;

  opacity: 0.8;

  button,
  a {
    display: flex;
    align-content: center;

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
    }
  }
`;
