import { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

import s from './Textarea.module.scss';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isError?: boolean;
  className?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ isError, className = '', ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx({
          [s.Textarea]: true,
          [s.Textarea_error]: isError,
          [className]: !!className,
        })}
        {...rest}
      />
    );
  },
);

export default Textarea;
