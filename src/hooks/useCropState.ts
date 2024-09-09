import { useState } from 'react';

const useCropState = () => {
  const [originalImg, setOriginalImg] = useState<File | null>(null);
  const [croppedImg, setCroppedImg] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const uploadImg = (file: File) => {
    setOriginalImg(file);
    openModal();
  };

  const editImg = () => {
    openModal();
  };

  const deleteImg = () => {
    setOriginalImg(null);
    setCroppedImg(null);
  };

  return {
    originalImg,
    croppedImg,
    isModalOpen,
    setOriginalImg,
    setCroppedImg,
    openModal,
    closeModal,
    toggleModal,
    uploadImg,
    editImg,
    deleteImg,
  };
};

export default useCropState;
