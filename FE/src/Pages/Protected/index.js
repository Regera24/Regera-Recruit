import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUsername, getRole} from '../../Utils/UserInfo/getIn4'; 

const Protected = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default Protected;