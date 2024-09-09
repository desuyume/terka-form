import { FC } from 'react';
import clsx from 'clsx';

import s from './InputRange.module.scss';

type Props = {
  currentLength: number;
  maxLength: number;
  className?: string;
};

const InputRange: FC<Props> = ({
  currentLength,
  maxLength,
  className = '',
}) => {
  return (
    <p
      className={clsx({
        [s.InputRange]: true,
        [s.InputRange_active]: currentLength > 0,
        [className]: !!className,
      })}
    >
      <span className={s.CurrentLength}>{currentLength}</span>/
      <span className={s.MaxLength}>{maxLength}</span>
    </p>
  );
};

export default InputRange;
