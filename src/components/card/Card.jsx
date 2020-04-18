import React from 'react';

import StyledCard from './styles/StyledCard';

const Card = props => <StyledCard {...props}>{props.children}</StyledCard>;

export default Card;
