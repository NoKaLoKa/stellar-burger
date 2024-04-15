import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructor,
  resetConstructor
} from '../../features/constructorSlice';
import {
  createOrderThunk,
  getOrderModalData,
  getOrderRequest,
  resetOrderModalData
} from '../../features/newOrderSlice';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../features/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const constructorItems = useSelector(getConstructor);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const newOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((el) => el._id),
      constructorItems.bun._id
    ];
    dispatch(createOrderThunk(newOrder));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
    dispatch(resetConstructor());
    navigate('/');
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
