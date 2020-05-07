import React from 'react';

import PageWrapper from '../../components/page-wrapper/PageWrapper';
import Card from '../../components/card/Card';

import HostForm from './components/HostForm';

const HostPage = props => {
  return (
    <PageWrapper>
      <Card>
        <h1 className="card-title">Open Your Island?</h1>
        <HostForm />
      </Card>
    </PageWrapper>
  );
};

export default HostPage;
