import React from 'react';
import {useHistory} from 'react-router-dom';
import {Result, Button} from 'antd';

const Forbidden = () => {
  const history = useHistory();
  return (
    <Result
      status="warning"
      title="This page is forbidden! Please log in"
      extra={<Button onClick={() => history.push('/')}>Log in</Button>}
    />
  );
};

export default Forbidden;
