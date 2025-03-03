import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUsername, getRole} from '../../Utils/UserInfo/getIn4'; 

const CompanyProtected = ({ children }) => {
  const role = getRole();

  if (!(role=='COMPANY')) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default CompanyProtected;