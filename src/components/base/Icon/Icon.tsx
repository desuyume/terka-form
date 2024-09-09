import { SVGAttributes } from 'react';
import clsx from 'clsx';

import icons, { ALL_ICONS } from '@constants/icons';

type Props = SVGAttributes<HTMLOrSVGElement> & {
  icon: keyof typeof ALL_ICONS;
  viewBox?: string;
  fill?: string;
  className?: string;
  onClick?: (e: React.SyntheticEvent) => void;
};

const Icon: React.FC<Props> = ({
  icon,
  viewBox = '0 0 30 30',
  fill = 'none',
  className = '',
  onClick,
  ...rest
}) => (
  <svg
    className={clsx({
      [className]: !!className,
    })}
    viewBox={viewBox}
    fill={fill}
    onClick={onClick}
    {...rest}
  >
    {icons[icon]}
  </svg>
);

export default Icon;
