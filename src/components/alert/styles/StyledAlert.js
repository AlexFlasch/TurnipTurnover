import styled from 'styled-components';
import { motion } from 'framer-motion';

import palette from '../../../theme-palette';

import getColors from './alert-type-colors';

export default styled(motion.div)`
  ${props => getColors(props.type)};

  display: flex;

  border-radius: 5px;
  padding: ${palette.scale(0)};
  font-size: ${palette.scale(0.5)};
  line-height: ${palette.scale(0.5)};

  width: 100%;

  .alert-icon {
    padding: 0 ${palette.scale(1)};
    font-size: ${palette.scale(2)};
    align-self: center;
  }

  .alert-text {
    margin: 0;

    a {
      margin: 0 ${palette.scale(-2)};
      color: ${palette.uiDarker};

      &:visited {
        color: ${palette.uiDark};
      }
    }
  }

  ${palette.mobile} {
    .alert-icon {
      display: inline;
      padding: ${palette.scale(-5)};
    }

    .alert-text {
      display: inline;
    }
  }
`;
