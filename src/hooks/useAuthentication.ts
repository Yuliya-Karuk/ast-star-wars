import { useAuth } from '@/contexts';
import { LoginData, UserData } from '@/models';
import { selectUserIsLoggedIn } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const { login, signup } = useAuth();

  const onLoginSubmit = async (userData: LoginData) => {
    const result = await login(userData);
    if (result) {
      navigate('/');
    }
  };

  const onSignupSubmit = async (userData: UserData) => {
    signup(userData).then(() => {
      navigate('/');
    });
  };

  return { isLoggedIn, onLoginSubmit, onSignupSubmit };
};
