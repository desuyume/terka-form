import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';

import { Button, Modal, Typography } from '@base/index';
import { canvasPreview, getCenteredCrop, imgPreview } from '@helpers/crop';
import { useDebounce } from '@hooks/index';

import s from './ImageCropModal.module.scss';
import 'react-image-crop/src/ReactCrop.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (file: File) => void;
  file: File | null;
  aspect?: number;
  scale?: number;
  rotate?: number;
};

const ImageCropModal: FC<Props> = ({
  isOpen,
  onClose,
  onChange,
  file,
  aspect = 16 / 9,
  scale = 1,
  rotate = 0,
}) => {
  const [imgSrc, setImgSrc] = useState('');
  const [imgBlob, setImgBlob] = useState<Blob | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const setCropInCenter = (e?: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e?.currentTarget ?? imgRef.current;
    if (!image) {
      return;
    }
    const crop = getCenteredCrop(image, aspect);
    setCrop(crop);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    imgRef.current = e.currentTarget;
    setCropInCenter(e);
  };

  const clickSave = async () => {
    if (imgBlob && file) {
      onChange(new File([imgBlob], file.name));
      // setUploadedFile(undefined);
      previewCanvasRef.current = null;
      imgRef.current = null;
      onClose();
    }
  };

  useDebounce(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }

      // Get blob from preview
      const { blob } = (await imgPreview(
        imgRef.current as any,
        completedCrop as any,
        scale,
        rotate,
      )) as any;

      // Set blob to state
      setImgBlob(blob);
    },
    100,
    [completedCrop, scale, rotate],
  );

  useEffect(() => {
    if (!file) return;
    if (file || isOpen) {
      setImgSrc(URL.createObjectURL(file));
      // setUploadedFile(file);
    }
  }, [file, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Редактировать фото'
      className={s.Modal}
    >
      <div className={s.ImageCropModal}>
        <Typography variant='p' className={s.ModalDescription}>
          Настройте размер фотографии
        </Typography>

        <div className={s.CropContainer}>
          <ReactCrop
            aspect={aspect}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img ref={imgRef} src={imgSrc} alt='' onLoad={onImageLoad} />
          </ReactCrop>
        </div>

        <Button variant='primary' onClick={clickSave} className={s.SaveButton}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default ImageCropModal;
