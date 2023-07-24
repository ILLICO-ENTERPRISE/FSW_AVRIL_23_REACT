import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../reducers/userSlice';

const UserList = () => {
  const users = useSelector(userSelector);

  useEffect(() => {
    console.log(users)
  }, [])

  return <Fragment></Fragment>;
};

export default UserList;
