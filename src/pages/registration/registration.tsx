import eyeOff from '@assets/eye-off.svg';
import eyeOn from '@assets/eye-show.svg';
import { AuthFormHeader, Input } from '@components/index';
import { useAuthentication } from '@hooks/useAuthentication';
import { UserData } from '@models/index';
import {
  dateValidationRules,
  emailValidationRules,
  nameValidationRules,
  passwordValidationRules,
} from '@utils/validationConst';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import s from './registration.module.scss';

export function Registration() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserData>({ mode: 'all' });

  const { isLoggedIn, onSignupSubmit } = useAuthentication();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    isLoggedIn === false && (
      <div className={s.wrapper}>
        <AuthFormHeader
          titleText="Sign up"
          linkDescription="Already have an account?"
          linkText="Sign in"
          linkTo="/signin"
        />
        <form onSubmit={handleSubmit(onSignupSubmit)} className={s.form}>
          <section className={s.userDataSection}>
            <Input
              name="email"
              label="E-mail:"
              register={register}
              validationSchema={emailValidationRules}
              isInvalid={!!errors.email}
              required
              autocomplete="username"
            />
            <p className={s.emailError}>{errors?.email?.message}</p>

            <Input
              name="password"
              label="Password:"
              type={isPasswordVisible ? 'text' : 'password'}
              register={register}
              validationSchema={passwordValidationRules}
              isInvalid={!!errors.password}
              required
              autocomplete="new-password"
            />
            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={s.eye}>
              <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
            </button>
            <p className={s.passwordError}>{errors?.password?.message}</p>

            <Input
              name="firstName"
              label="First name:"
              register={register}
              validationSchema={nameValidationRules}
              isInvalid={!!errors.firstName}
              required
            />
            <p className={s.firstNameError}>{errors?.firstName?.message}</p>

            <Input
              name="lastName"
              label="Last name:"
              register={register}
              validationSchema={nameValidationRules}
              isInvalid={!!errors.lastName}
              required
            />
            <p className={s.lastNameError}>{errors?.lastName?.message}</p>

            <Input
              name="dateOfBirth"
              label="Date of birth:"
              type="date"
              register={register}
              validationSchema={dateValidationRules}
              isInvalid={!!errors.dateOfBirth}
              required
            />
            <p className={s.dateOfBirthError}>{errors?.dateOfBirth?.message}</p>
          </section>
          <button type="submit" className={s.submitButton} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    )
  );
}
