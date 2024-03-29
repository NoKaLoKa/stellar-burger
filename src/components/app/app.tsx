import { Routes, Route } from 'react-router-dom';

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
import { useDispatch } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal children={<FeedInfo />} title={''} onClose={() => {}} />
          }
        />
        <Route
          path='/ingredient/:id'
          element={
            <Modal
              children={<IngredientDetails />}
              title={''}
              onClose={() => {}}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal children={<OrderInfo />} title={''} onClose={() => {}} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
