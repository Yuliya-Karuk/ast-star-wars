import cn from 'classnames';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import s from './Input.module.scss';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  validationSchema: RegisterOptions;
  type?: string;
  isInvalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  autocomplete?: string | undefined;
}

export function Input<T extends FieldValues>(props: InputProps<T>) {
  const {
    name,
    label,
    register,
    validationSchema,
    type = 'text',
    isInvalid = false,
    required = false,
    disabled = false,
    autocomplete = undefined,
  } = props;

  return (
    <>
      <label htmlFor={name} className={s.label}>
        {label}
        {required ? (
          <span className={s.orange} role="presentation">
            *
          </span>
        ) : null}
      </label>
      <input
        className={cn(s.input, {
          [s.invalid]: isInvalid,
          [s.withEye]: name === 'password',
        })}
        id={name}
        required={required}
        type={type}
        disabled={disabled}
        {...register(name, validationSchema as RegisterOptions<T, Path<T>>)}
        {...(autocomplete && { autoComplete: autocomplete })}
      />
    </>
  );
}
