import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearItems,
  itemSelect
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  clear,
  orderModalDataSelect,
  orderRequestSelect
} from '../../services/slices/newOrderSlice/newOrderSlice';
import { postOrderBurger } from '../../services/slices/newOrderSlice/fetchNewOrder';
import { userSelect } from '../../services/slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора - выполненно*/
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(itemSelect);
  const orderRequest = useSelector(orderRequestSelect);
  const orderModalData = useSelector(orderModalDataSelect);
  const user = useSelector(userSelect);

  const onOrderClick = () => {
    if (!user) {
      navigate('/register', { replace: true });
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderIngredient = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(postOrderBurger(orderIngredient));
  };

  const closeOrderModal = () => {
    navigate('/');
    dispatch(clearItems());
    dispatch(clear());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
