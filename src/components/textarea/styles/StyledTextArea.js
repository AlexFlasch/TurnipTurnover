import styled from 'styled-components';
import TextArea from 'react-expanding-textarea';

import palette from '../../../theme-palette';

export default styled(TextArea)`
  display: block;
  min-height: ${palette.scale(2)};
  max-height: ${props => props.maxHeight};
  width: 100%;
  overflow-y: auto;

  margin: ${palette.scale(2)} 0;

  background-color: ${palette.uiDark};
  color: ${palette.uiLight};
  border-radius: 5px 5px 0 0;
  border: 0;

  outline: none;

  line-height: ${palette.scale(1)};
  font-size: ${palette.scale(1)};
  font-family: ${palette.font};

  resize: none;
`;
