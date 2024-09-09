import { FC } from 'react';

import s from './Label.module.scss';
import clsx from 'clsx';

type Props = {
  label: string;
  children?: React.ReactNode;
  className?: string;
};

const Label: FC<Props> = ({ label, children, className = '' }) => {
  return (
    <label
      className={clsx({
        [s.Label]: true,
        [className]: !!className,
      })}
    >
      {label}
      {children}
    </label>
  );
};

export default Label;
