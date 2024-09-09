import { FC } from 'react';
import clsx from 'clsx';

import { Icon, Typography } from '@base/index';

import s from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
};

const Modal: FC<Props> = ({
  isOpen,
  onClose,
  children,
  title,
  className = '',
}) => {
  return (
    <div
      className={clsx({
        [s.Modal]: true,
        [s.Modal_open]: isOpen,
        [className]: !!className,
      })}
      onClick={onClose}
    >
      <div className={s.ModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={s.ModalHeader}>
          <Typography variant='h4' className={s.ModalTitle}>
            {title}
          </Typography>
          <div className={s.ModalIconWrapper}>
            <Icon
              icon='CROSS_DARK'
              viewBox='0 0 16 16'
              width={16}
              height={16}
              onClick={onClose}
              className={s.ModalClose}
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
