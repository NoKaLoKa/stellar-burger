import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, loadFeedsThunk } from '../../features/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  let orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(loadFeedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(loadFeedsThunk());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
