import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { isLoadingSelect } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import {
  clearError,
  errorSelect
} from '../../services/slices/userSlice/userSlice';
import { registerUser } from '../../services/slices/userSlice/fetchUser';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(errorSelect);
  const isLoading = useSelector(isLoadingSelect);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(registerUser({ email, name: userName, password }));
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText={error || ''}
          email={email}
          userName={userName}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
