import { FC } from 'react';
import clsx from 'clsx';

import s from './Typography.module.scss';

type Props = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Typography: FC<Props> = ({
  variant,
  children,
  className = '',
  style,
}) => {
  switch (variant) {
    case 'h1':
      return (
        <h1
          className={clsx({
            [s.Heading1]: true,
            [className]: !!className,
          })}
          style={style}
        >
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={clsx({
            [s.Heading2]: true,
            [className]: !!className,
          })}
          style={style}
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={clsx({
            [s.Heading3]: true,
            [className]: !!className,
          })}
          style={style}
        >
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={clsx({
            [s.Heading4]: true,
            [className]: !!className,
          })}
          style={style}
        >
          {children}
        </h4>
      );
    case 'p':
      return (
        <p
          className={clsx({
            [s.Paragraph]: true,
            [className]: !!className,
          })}
          style={style}
        >
          {children}
        </p>
      );
    case 'span':
      return (
        <span
          className={clsx({
            [s.Span]: true,
            [className]: !!className,
          })}
          style={style}
        >
          {children}
        </span>
      );
  }
};

export default Typography;
