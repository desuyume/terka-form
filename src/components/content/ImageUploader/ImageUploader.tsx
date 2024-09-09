import { FC, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';

import { Icon } from '@base/index';

import s from './ImageUploader.module.scss';

const validateFile = (file: File) => {
  if (file.size > 10 * 1024 * 1024) {
    return 'Файл не должен привышать 10mb';
  }

  if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
    return 'Неподдерживаемый формат файла';
  }

  return null;
};

type Props = {
  onChange: (file: File) => void;
  recommendResolution?: {
    width: number;
    height: number;
  };
};

const ImageUploader: FC<Props> = ({
  onChange,
  recommendResolution = { width: 390, height: 240 },
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    handleFile(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFile = (file: File | undefined) => {
    if (!file) {
      alert('Файл не выбран');
      return;
    }

    const error = validateFile(file);
    if (error) {
      alert(error);
    } else {
      onChange(file);
    }
  };

  return (
    <div
      className={clsx({
        [s.ImageUploader]: true,
        [s.ImageUploader_active]: isDragActive,
      })}
      {...getRootProps()}
    >
      <input
        ref={ref}
        type='file'
        hidden
        onChange={handleChange}
        accept='image/jpg, image/jpeg, image/png'
        {...getInputProps()}
      />

      <div className={s.IconWrapper}>
        <Icon icon='SEMKI' viewBox='0 0 22 33' width={22} height={33} />
      </div>
      <p className={s.Formats}>jpg, jpeg, png</p>
      <p className={s.Resolution}>
        Рекомендуемое разрешение: {recommendResolution.width}px х{' '}
        {recommendResolution.height}px
      </p>
      <p className={s.Title}>Перетащите или кликните для загрузки файла</p>
    </div>
  );
};

export default ImageUploader;
