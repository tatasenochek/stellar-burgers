import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../services/slices/feedSlice/getFeeds';
import { useDispatch, useSelector } from '../../services/store';
import { ordersSelect } from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора - выполнено */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelect);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
