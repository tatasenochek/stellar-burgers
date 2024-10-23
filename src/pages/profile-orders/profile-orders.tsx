import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { ordersFeedSelect } from '../../services/slices/orderFeedSlice/ordersFeedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/orderFeedSlice/getOrdersFeed';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора - выполнено*/
  const orders: TOrder[] = useSelector(ordersFeedSelect);

  useEffect(() => {
    dispatch(getOrders());
    return;
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
