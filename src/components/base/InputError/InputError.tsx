import { FC } from 'react';
import clsx from 'clsx';

import s from './InputError.module.scss';

type Props = {
  errorMessage?: string;
  className?: string;
};

const InputError: FC<Props> = ({ errorMessage, className = '' }) => {
  if (!errorMessage) return null;

  return (
    <span
      className={clsx({
        [s.InputError]: true,
        [className]: !!className,
      })}
    >
      {errorMessage}
    </span>
  );
};

export default InputError;
