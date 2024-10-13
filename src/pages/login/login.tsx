import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  errorSelect,
  isLoadingSelect
} from '../../services/slices/userSlice/userSlice';
import { Preloader } from '@ui';
import { loginUser } from '../../services/slices/userSlice/fetchUser';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(errorSelect);
  const isLoading = useSelector(isLoadingSelect);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <LoginUI
          errorText={error || ''}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
