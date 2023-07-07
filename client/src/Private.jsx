import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequiredAuth = ({ children }) => {
  const { token } = useSelector((store) => store);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};

export default RequiredAuth;
