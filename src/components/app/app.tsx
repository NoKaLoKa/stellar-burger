import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  FeedInfo,
  IngredientDetails,
  OrderInfo,
  Modal
} from '@components';
import { useEffect } from 'react';
import { getIngredientsThunk } from '../../features/ingredientsSlice';
import { loadUser, setUser } from '../../features/userSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { loadFeedsThunk } from '../../features/ordersSlice';
import { useDispatch } from '../../services/store';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(loadUser());
    dispatch(loadFeedsThunk());
  }, []);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<FeedInfo />} />
        </Route>
        <Route path='/profile'>
          <Route index element={<ProtectedRoute children={<Profile />} />} />
          <Route
            path='orders'
            element={<ProtectedRoute children={<ProfileOrders />} />}
          />
          <Route
            path='orders/:number'
            element={<ProtectedRoute children={<OrderInfo />} />}
          />
        </Route>
        <Route
          path='/login'
          element={<ProtectedRoute isAuthNeeded children={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute isAuthNeeded children={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isAuthNeeded children={<ForgotPassword />} />
          }
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute isAuthNeeded children={<ResetPassword />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={handleModalClose} title={''}>
                <FeedInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={handleModalClose} title={''}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal onClose={handleModalClose} title={''}>
                <ProtectedRoute children={<OrderInfo />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
