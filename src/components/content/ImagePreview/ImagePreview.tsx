import { FC } from 'react';
import clsx from 'clsx';

import { Icon } from '@base/index';

import s from './ImagePreview.module.scss';

type Props = {
  src?: string | File;
  onDelete: () => void;
  onEdit: () => void;
  className?: string;
};

const ImagePreview: FC<Props> = ({ src, onDelete, onEdit, className = '' }) => {
  const imgSrc = src instanceof File ? URL.createObjectURL(src) : src;

  return (
    <div
      className={clsx({
        [s.ImagePreview]: true,
        [className]: !!className,
      })}
    >
      <img src={imgSrc} alt='' />

      <div className={s.Overlay}>
        <div
          className={clsx({
            [s.OverlayButton]: true,
            [s.Pencil]: true,
          })}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
        >
          <Icon icon='PENCIL' viewBox='0 0 20 20' width={20} height={20} />
        </div>
        <div
          className={clsx({
            [s.OverlayButton]: true,
            [s.Trash]: true,
          })}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <Icon icon='TRASH' viewBox='0 0 24 24' width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
