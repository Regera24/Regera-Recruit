import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUsername, getRole} from '../../Utils/UserInfo/getIn4'; 

const UserProtected = ({ children }) => {
  const role = getRole();

  if (!(role=='USER')) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default UserProtected;