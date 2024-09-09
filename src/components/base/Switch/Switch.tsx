import { FC, InputHTMLAttributes } from 'react';

import s from './Switch.module.scss';
import clsx from 'clsx';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

const Switch: FC<Props> = ({ label, className = '', ...rest }) => {
  return (
    <label
      className={clsx({
        [s.Switch]: true,
        [className]: !!className,
      })}
    >
      <div className={s.SliderWrapper}>
        <input type='checkbox' {...rest} />
        <span className={s.Slider} />
      </div>

      <span className={s.Label}>{label}</span>
    </label>
  );
};

export default Switch;
