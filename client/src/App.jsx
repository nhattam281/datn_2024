import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePost from './containers/private/CreatePost';
import LikedPost from './containers/private/LikedPost';
import PostManagement from './containers/private/PostManagement';
import Profile from './containers/private/Profile';
import HomePage from './containers/public/HomePage';
import Login from './containers/public/Login';
import NotFound from './containers/public/NotFound';
import PostDetail from './containers/public/PostDetail';
import Register from './containers/public/Register';
import RentalApartment from './containers/public/RentalApartment';
import RentalRoom from './containers/public/RentalRoom';
import RoommateFinder from './containers/public/RoommateFinder';
import DefaultLayout from './layout/DefaultLayout';
import NonSidebarLayout from './layout/NonSidebarLayout';
import PrivateLayout from './layout/PrivateLayout';
import { authIsLogginSelector } from './redux/selectors/authSelector';
import { currentUserSelector } from './redux/selectors/currentUserSelector';
import { getCategory } from './redux/slices/categorySlice';
import { getCurrentUser } from './redux/slices/userSlice';
import { path } from './utils/constant';

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(authIsLogginSelector);
    const currentUser = useSelector(currentUserSelector);

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(getCurrentUser());
        }, 1000);
    }, [isLoggedIn]);

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    return (
        <div className='bg-primary'>
            <Routes>
                <Route path={path.HOME} element={<DefaultLayout />}>
                    <Route index path='' element={<HomePage />} />
                    <Route
                        path={path.CHO_THUE_CAN_HO}
                        element={<RentalApartment />}
                    />
                    <Route
                        path={path.CHO_THUE_PHONG_TRO}
                        element={<RentalRoom />}
                    />
                    <Route
                        path={path.TIM_NGUOI_O_GHEP}
                        element={<RoommateFinder />}
                    />
                </Route>
                <Route path={path.HOME} element={<NonSidebarLayout />}>
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.SIGNUP} element={<Register />} />
                    <Route path={':postId'} element={<PostDetail />} />
                </Route>
                <Route path={path.ACCOUNT} element={<PrivateLayout />}>
                    <Route
                        index
                        path={path.CREATE_POST}
                        element={<CreatePost />}
                    />
                    <Route
                        path={path.POSTS_MANAGEMENT}
                        element={<PostManagement />}
                    />
                    <Route path={path.PROFILE} element={<Profile />} />
                    <Route path={path.LIKE} element={<LikedPost />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
