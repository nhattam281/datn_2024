import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserPostsRecommend from './components/UserPostsRecommend';
import UserPostsSaved from './components/UserPostsSaved';
import AdminManage from './containers/AdminManage';
import Category from './containers/Category';
import HomePage from './containers/HomePage';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import PostBlocked from './containers/PostBlocked';
import PostDetail from './containers/PostDetail';
import PostManage from './containers/PostManage';
import RecommendationList from './containers/RecommendationList';
import UserBlocked from './containers/UserBlocked ';
import UserDetail from './containers/UserDetail';
import UserDetailRecommend from './containers/UserDetailRecommend';
import UserManage from './containers/UserManage';
import DefaultLayout from './layout/DefaultLayout';
import { authIsLogginSelector } from './redux/selectors/authSelector';
import { getCurrentUser } from './redux/slices/currentUserSlice';
import ProtectedRoute from './utils/ProtectedRoute';
import { path } from './utils/constant';

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(authIsLogginSelector);

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(getCurrentUser());
        }, 1000);
    }, [isLoggedIn]);
    return (
        <div className='w-screen h-screen'>
            <Routes>
                <Route
                    path={path.HOME}
                    element={ProtectedRoute(<DefaultLayout />)}
                >
                    <Route index path={''} element={<HomePage />} />
                    <Route path={path.CATEGORY} element={<Category />} />
                    <Route
                        path={path.ADMIN_ACCOUNT}
                        element={<AdminManage />}
                    />
                    <Route path={path.USERS} element={<UserManage />} />
                    <Route
                        path={`${path.USERS}/:userId`}
                        element={<UserDetail />}
                    />
                    <Route path={path.USERS_BLOCK} element={<UserBlocked />} />
                    <Route
                        path={path.USERS_RECOMMEND}
                        element={<RecommendationList />}
                    />
                    <Route
                        path={`${path.USERS_RECOMMEND}/:userId`}
                        element={<UserDetailRecommend />}
                    >
                        <Route
                            index
                            path={path.USER_POST_SAVED}
                            element={<UserPostsSaved />}
                        />
                        <Route
                            path={path.USERS_POST_RECOMMEND}
                            element={<UserPostsRecommend />}
                        />
                    </Route>
                    <Route
                        path={`${path.USERS}/:userId/:postId`}
                        element={<PostDetail />}
                    />
                    <Route path={path.POST} element={<PostManage />} />
                    <Route
                        path={`${path.POST}/:postId`}
                        element={<PostDetail />}
                    />
                    <Route path={path.POST_BLOCK} element={<PostBlocked />} />
                    <Route
                        path={`${path.POST_BLOCK}/:postId`}
                        element={<PostDetail />}
                    />
                </Route>
                <Route path={path.LOGIN} element={<Login />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
