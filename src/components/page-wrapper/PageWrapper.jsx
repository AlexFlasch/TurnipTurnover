import React from 'react';

import StyledPageWrapper from './styles/StyledPageWrapper';

const PageWrapper = props => {
  return <StyledPageWrapper {...props}>{props.children}</StyledPageWrapper>;
};

export default PageWrapper;
