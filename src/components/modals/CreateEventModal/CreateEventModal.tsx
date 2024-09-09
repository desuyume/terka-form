import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import {
  Button,
  Icon,
  Input,
  InputError,
  Modal,
  Typography,
} from '@base/index';
import { EventCreatorContactsSchemaProps } from '@sharedTypes/event.types';
import { isRequiredValidationError } from '@helpers/errors';

import s from './CreateEventModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  register: UseFormRegister<EventCreatorContactsSchemaProps>;
  errors: FieldErrors<EventCreatorContactsSchemaProps>;
};

const CreateEventModal: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Мероприятие на модерации'>
      <div className={s.CreateEventModal}>
        <Typography variant='p' className={s.ModalDescription}>
          введите номер телефона и TG для связи
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className={s.ModalForm}
        >
          <div className={s.ModalFields}>
            <div className={s.ModalField}>
              <Input
                icon={
                  <Icon
                    icon='PHONE'
                    viewBox='0 0 14 15'
                    width={14}
                    height={15}
                  />
                }
                placeholder='Телефон'
                {...register('creatorMobile')}
                isError={isRequiredValidationError(
                  errors.creatorMobile?.message,
                )}
              />
              <InputError
                errorMessage={
                  !isRequiredValidationError(errors.creatorMobile?.message)
                    ? errors.creatorMobile?.message
                    : undefined
                }
              />
            </div>

            <div className={s.ModalField}>
              <Input
                icon={
                  <Icon
                    icon='TELEGRAM'
                    viewBox='0 0 20 21'
                    width={20}
                    height={21}
                  />
                }
                placeholder='TG'
                noCircle
                {...register('creatorTg')}
                isError={isRequiredValidationError(errors.creatorTg?.message)}
              />
              <InputError
                errorMessage={
                  !isRequiredValidationError(errors.creatorTg?.message)
                    ? errors.creatorTg?.message
                    : undefined
                }
              />
            </div>
          </div>

          <div className={s.ModalButtons}>
            <Button
              variant='secondary'
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className={s.CancelButton}
            >
              Отмена
            </Button>
            <Button variant='primary' className={s.SentButton} type='submit'>
              Отправить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
