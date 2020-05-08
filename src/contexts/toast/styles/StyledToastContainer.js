import styled, { css } from 'styled-components';

const getStylesForLocation = location => {
  switch (location) {
    case 'topLeft':
      return css`
        flex-direction: column;
        align-items: flex-start;
      `;

    case 'top':
      return css`
        flex-direction: column;
        align-items: center;
      `;

    case 'topRight':
      return css`
        flex-direction: column;
        align-items: flex-end;
      `;

    case 'right':
      return css`
        flex-direction: row-reverse;
        align-items: center;
      `;

    case 'bottomRight':
      return css`
        flex-direction: column-reverse;
        align-items: flex-end;
      `;

    case 'bottom':
      return css`
        flex-direction: column-reverse;
        align-items: center;
      `;

    case 'bottomLeft':
      return css`
        flex-direction: column-reverse;
        align-items: flex-start;
      `;

    case 'left':
      return css`
        flex-direction: row;
        align-items: center;
      `;
  }
};

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  pointer-events: none;

  display: flex;
  justify-content: flex-start;
  ${props => getStylesForLocation(props.location)}
`;
