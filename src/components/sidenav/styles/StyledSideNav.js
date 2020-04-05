import styled from 'styled-components';
import { motion } from 'framer-motion';

export default styled(motion.nav)`
  position: absolute;
  top: 0;
  left: 0;
  width: 75px;
  height: 100%;
  opacity: 0.5;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: hidden;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  background-image: linear-gradient(-225deg, #a8ff78 0%, #78ffd6 100%);
`;
