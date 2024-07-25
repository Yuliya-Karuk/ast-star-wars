import { LoginData, UserData } from '@/models';
import { selectUserIsLoggedIn } from '@/store/selectors';
import { SuccessSignOut } from '@/utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthActions } from './useAuthActions';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const { login, signup, logout } = useAuthActions();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

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

  const onLogout = async () => {
    await logout().then(() => {
      toast.success(SuccessSignOut);
    });
  };

  return { isLoggedIn, onLoginSubmit, onSignupSubmit, onLogout };
};
