import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Icon, Typography } from '@base/index';
import { EventForm } from '@content/index';
import { RouteEnum } from '@constants/route';
import { useCropState, useToggle } from '@hooks/index';
import { CreateEventModal, ImageCropModal } from '@modals/index';
import {
  EventCreatorContactsSchema,
  EventCreatorContactsSchemaProps,
  EventModerationStatusEnum,
  EventSchema,
  EventSchemaProps,
} from '@sharedTypes/event.types';

import s from './CreateEvent.module.scss';

const CreateEvent: FC = () => {
  const navigate = useNavigate();
  const {
    value: isCreateEventModalOpen,
    setTrue: showCreateEventModal,
    setFalse: hideCreateEventModal,
  } = useToggle();

  const coverCropState = useCropState();
  const detailsCropState = useCropState();

  const eventForm = useForm<EventSchemaProps>({
    defaultValues: {
      organizer: '',
      title: '',
      text: '',
      meetingAt: '',
      time: '',
      isFree: false,
      eventsLink: [
        { name: '', link: '' },
        { name: '', link: '' },
        { name: '', link: '' },
      ],
      eventType: [],
      status: EventModerationStatusEnum.MODERATION,
    },
    resolver: zodResolver(EventSchema),
  });

  const creatorContactsForm = useForm<EventCreatorContactsSchemaProps>({
    defaultValues: {
      creatorTg: '',
      creatorMobile: '',
    },
    resolver: zodResolver(EventCreatorContactsSchema),
  });

  const createEvent = () => {
    const data = {
      ...eventForm.getValues(),
      ...creatorContactsForm.getValues(),
      coverImg: coverCropState.croppedImg,
      detailsImg: detailsCropState.croppedImg,
    };
    console.log(data);
    alert('Мероприятие отправлено на модерацию');
    navigate(RouteEnum.EVENTS);
  };

  const handleSubmit = () => {
    creatorContactsForm.handleSubmit(createEvent)();
  };

  return (
    <section className={s.CreateEvent}>
      <div className={s.TitleWrapper}>
        <Link to={RouteEnum.HOME} className={s.BackLink}>
          <Icon icon='ARROW_LEFT' width={18} height={15} viewBox='0 0 18 15' />
        </Link>
        <Typography variant='h2'>Создать мероприятие</Typography>
      </div>

      <EventForm
        form={eventForm}
        onSubmit={() => eventForm.handleSubmit(showCreateEventModal)()}
        coverImg={coverCropState}
        detailsImg={detailsCropState}
      />

      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={hideCreateEventModal}
        onSubmit={handleSubmit}
        register={creatorContactsForm.register}
        errors={creatorContactsForm.formState.errors}
      />

      <ImageCropModal
        isOpen={coverCropState.isModalOpen}
        onClose={coverCropState.closeModal}
        onChange={coverCropState.setCroppedImg}
        file={coverCropState.originalImg}
        aspect={390 / 240}
      />
      <ImageCropModal
        isOpen={detailsCropState.isModalOpen}
        onClose={detailsCropState.closeModal}
        onChange={detailsCropState.setCroppedImg}
        file={detailsCropState.originalImg}
        aspect={1920 / 500}
      />
    </section>
  );
};

export default CreateEvent;
