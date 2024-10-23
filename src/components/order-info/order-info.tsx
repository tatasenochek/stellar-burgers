import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  clear,
  orderModalDataSelect
} from '../../services/slices/newOrderSlice/newOrderSlice';
import { ingredientsSelect } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { getOrderByNumber } from '../../services/slices/newOrderSlice/fetchNewOrder';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  /** TODO: взять переменные orderData и ingredients из стора - выполнено*/
  const orderData = useSelector(orderModalDataSelect);
  const ingredients: TIngredient[] = useSelector(ingredientsSelect);

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, number, orderData]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
