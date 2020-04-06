import React from 'react';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const HomePage = props => {
  return (
    <>
      <Input label="test" />
      <Button type="primary" text="test" />
      <Button type="standard" text="test2" />
    </>
  );
};

export default HomePage;
