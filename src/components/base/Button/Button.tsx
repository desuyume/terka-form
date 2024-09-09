import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

import s from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant, className = '', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx({
          [s.Button]: true,
          [s.Button__primary]: variant === 'primary',
          [s.Button__secondary]: variant === 'secondary',
          [s.Button__ghost]: variant === 'ghost',
          [className]: !!className,
        })}
        {...rest}
      >
        {rest.children}
      </button>
    );
  },
);

export default Button;
