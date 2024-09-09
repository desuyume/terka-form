import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import s from './Input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  isBig?: boolean;
  isError?: boolean;
  className?: string;
  icon?: JSX.Element;
  noCircle?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { isBig, isError, className = '', icon, noCircle, type = 'text', ...rest },
    ref,
  ) => {
    if (!!icon) {
      return (
        <div
          className={clsx({
            [s.InputWrapper]: true,
            [s.InputWrapper_error]: isError,
            [s.InputWrapper_noCircle]: noCircle,
            [s.InputWrapper_big]: isBig,
          })}
        >
          <div className={s.IconWrapper}>
            <div className={s.Icon}>{icon}</div>
          </div>
          <input
            ref={ref}
            type={type}
            className={clsx({
              [s.Input]: true,
              [s.Input_big]: isBig,
              [className]: !!className,
            })}
            {...rest}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        className={clsx({
          [s.Input]: true,
          [s.Input_error]: isError,
          [s.Input_big]: isBig,
          [className]: !!className,
        })}
        {...rest}
      />
    );
  },
);

export default Input;
