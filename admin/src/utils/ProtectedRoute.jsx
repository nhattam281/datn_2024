import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authIsLogginSelector } from '../redux/selectors/authSelector';
import { path } from './constant';

const ProtectedRoute = (children) => {
    const isLoggedIn = useSelector(authIsLogginSelector);

    return isLoggedIn ? children : <Navigate to={path.LOGIN} />;
};

export default ProtectedRoute;
