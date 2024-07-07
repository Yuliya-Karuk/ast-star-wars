import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { AuthFormHeader } from '@components/AuthFormHeader/AuthFormHeader';
import { Input } from '@components/Input/Input';
import { useAuth } from '@contexts/authProvider';
import { useToast } from '@contexts/toastProvider';
import { LoginData } from '@models/index';
import { catchAuthErrors } from '@utils/utils';
import { emailValidationRules, passwordValidationRules } from '@utils/validationConst';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import s from './login.module.scss';

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({ mode: 'onChange' });

  const { isLoggedIn, login } = useAuth();
  const { customToast, errorNotify } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (userData: LoginData) => {
    login(userData)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        const message = catchAuthErrors(error);
        errorNotify(message);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <AuthFormHeader
          titleText="Sign in"
          linkDescription="New to this site?"
          linkText="Sign Up"
          linkTo="/registration"
        />
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <section className={s.userDataSection}>
            <Input
              name="email"
              label="E-mail"
              register={register}
              validationSchema={emailValidationRules}
              isInvalid={!!errors.email}
              required
              autocomplete="username"
            />

            <p className={s.emailError}>{errors?.email?.message}</p>

            <Input
              name="password"
              label="Password"
              type={isPasswordVisible ? 'text' : 'password'}
              register={register}
              validationSchema={passwordValidationRules}
              isInvalid={!!errors.password}
              required
              autocomplete="current-password"
            />

            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={s.eye}>
              <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
            </button>

            <p className={s.passwordError}>{errors?.password?.message}</p>

            <button type="submit" className={s.submitButton} disabled={!isValid}>
              Submit
            </button>
          </section>
        </form>
      </div>
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
}
