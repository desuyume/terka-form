import { FC, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import clsx from 'clsx';

import {
  Button,
  DatePicker,
  Input,
  InputError,
  InputRange,
  Label,
  Select,
  SelectMultiple,
  Switch,
  Textarea,
  Typography,
} from '@base/index';
import { MOCKED_STATUSES, MOCKED_TAGS } from '@constants/event';
import makeTimeOptions from '@helpers/makeTimeOptions';
import { isRequiredValidationError } from '@helpers/errors';
import { ImagePreview, ImageUploader } from '@content/index';
import { EventSchemaProps } from '@sharedTypes/event.types';

import s from './EventForm.module.scss';
import useCropState from '@hooks/useCropState';

type Props = {
  form: UseFormReturn<EventSchemaProps>;
  onSubmit: () => void;
  coverImg: ReturnType<typeof useCropState>;
  detailsImg: ReturnType<typeof useCropState>;
};

const EventForm: FC<Props> = ({
  form: {
    register,
    watch,
    setValue,
    formState: { errors },
  },
  onSubmit,
  coverImg,
  detailsImg,
}) => {
  const state = watch();

  const handleChange = (key: keyof EventSchemaProps, value: any) => {
    setValue(key, value, { shouldValidate: true });
  };

  const handleCostKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '0' && e.currentTarget.value === '') {
      e.preventDefault();
    }

    if (e.key === 'Backspace') {
      return;
    }

    if (isNaN(Number(e.key))) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (state.isFree) {
      setValue('cost', 0, { shouldValidate: true });
    } else {
      setValue('cost', undefined, { shouldValidate: true });
    }
  }, [state.isFree]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={s.Form}
    >
      <Typography variant='h3' className={s.FormSubtitle}>
        Информация
      </Typography>

      <div className={s.FormWrapper}>
        <Label label='Организатор'>
          <Input
            {...register('organizer')}
            isBig
            isError={isRequiredValidationError(errors.organizer?.message)}
            placeholder='Напишите'
          />
        </Label>

        <Label label='Название мероприятия'>
          <Input
            {...register('title')}
            isBig
            isError={isRequiredValidationError(errors.title?.message)}
            placeholder='Название'
            maxLength={80}
          />
          <InputRange currentLength={state.title.length} maxLength={80} />
        </Label>

        <Label label='Описание'>
          <Textarea
            {...register('text')}
            isError={isRequiredValidationError(errors.text?.message)}
            placeholder='Опишите цели встречи'
            maxLength={350}
          />
          <InputRange currentLength={state.text.length} maxLength={350} />
        </Label>

        <Label label='Фото для превью'>
          <div className={s.CoverUploadContainer}>
            {coverImg.croppedImg ? (
              <ImagePreview
                src={coverImg.croppedImg}
                onDelete={coverImg.deleteImg}
                onEdit={coverImg.editImg}
                className={s.ImagePreview}
              />
            ) : (
              <ImageUploader onChange={coverImg.uploadImg} />
            )}
          </div>
        </Label>

        <Label label='Фото для деталей мероприятия'>
          <div className={s.DetailsUploadContainer}>
            {detailsImg.croppedImg ? (
              <ImagePreview
                src={detailsImg.croppedImg}
                onDelete={detailsImg.deleteImg}
                onEdit={detailsImg.editImg}
                className={s.ImagePreview}
              />
            ) : (
              <ImageUploader
                onChange={detailsImg.uploadImg}
                recommendResolution={{ width: 1920, height: 500 }}
              />
            )}
          </div>
        </Label>

        <Label label='Тематика и теги поиска'>
          <SelectMultiple
            options={MOCKED_TAGS}
            value={state.eventType}
            onChange={(e) => handleChange('eventType', e)}
            isError={isRequiredValidationError(errors.eventType?.message)}
          />
        </Label>

        <div className={s.FormFlex}>
          <Label label='Дата проведения'>
            <DatePicker
              value={state.meetingAt}
              onChange={(e) => handleChange('meetingAt', e)}
              isError={isRequiredValidationError(errors.meetingAt?.message)}
              minDate={new Date()}
            />
          </Label>
          <Label label='Время проведения'>
            <Select
              options={makeTimeOptions(15)}
              value={state.time}
              onChange={(v) => handleChange('time', v)}
              isError={isRequiredValidationError(errors.time?.message)}
            />
          </Label>
        </div>

        <Label label='Место проведения'>
          <Input
            {...register('address')}
            isError={isRequiredValidationError(errors.address?.message)}
            placeholder='ул. Космонавтов, г. Калининград'
          />
        </Label>

        <div className={s.FormCost}>
          <Label
            label='Стоимость мероприятия, руб.'
            className={clsx({
              [s.FormCostInput]: true,
            })}
          >
            <Input
              {...register('cost', { valueAsNumber: true })}
              placeholder='100'
              onKeyDown={handleCostKeyDown}
              isError={!!errors.cost}
              disabled={state.isFree}
            />
          </Label>
          <Switch
            label='Бесплатное'
            className={s.FormCostSwitch}
            checked={state.isFree}
            onChange={(e) => handleChange('isFree', e.target.checked)}
          />
        </div>
      </div>

      <Typography variant='h3' className={s.FormSubtitle}>
        Ссылки
      </Typography>

      <div className={s.FormWrapper}>
        <Label label='Ссылка на чат мероприятия'>
          <Input {...register('eventLink')} placeholder='Введите ссылку' />
          <InputError errorMessage={errors.eventLink?.message} />
        </Label>

        <Label label='Ссылка на регистрацию'>
          <Input
            {...register('registrationLink')}
            placeholder='Введите ссылку'
          />
          <InputError errorMessage={errors.registrationLink?.message} />
        </Label>

        <Label label='Ссылки связанные с мероприятием'>
          <div className={s.FormLinks}>
            {state.eventsLink?.map((link, index) => {
              return (
                <div key={index} className={s.FormLink}>
                  <Input
                    icon={<p>{index + 1}</p>}
                    placeholder='Название ссылки'
                    value={link.name}
                    onChange={(e) => {
                      const newLinks = [...state.eventsLink];
                      newLinks[index].name = e.target.value;
                      handleChange('eventsLink', newLinks);
                    }}
                  />
                  <div>
                    <Input
                      value={link.link}
                      onChange={(e) => {
                        const newLinks = [...state.eventsLink];
                        newLinks[index].link = e.target.value;
                        handleChange('eventsLink', newLinks);
                      }}
                      placeholder='Адрес ссылки'
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Label>

        <div className={s.FormFlex}>
          <Label label='Ссылка на билет'>
            <Input placeholder='Введите ссылку' disabled />
          </Label>

          <Label label='Артикул билета'>
            <Input placeholder='Введите артикул' disabled />
          </Label>
        </div>

        <div className={s.FormFlex}>
          <Label label='Ссылка на закрытое сообщество'>
            <Input placeholder='groupname.terkatalk.ru' disabled />
          </Label>

          <Label label='Ссылка на закрытый tg-канал'>
            <Input placeholder='@name_terkatalk' disabled />
          </Label>
        </div>

        <Label label='ИИ-ассистент'>
          <Input placeholder='Введите параметры через запятую' disabled />
        </Label>

        <Label label='Теги партнеров системы лояльности'>
          <Input placeholder='Введите через запятую теги terkaloyal' disabled />
        </Label>

        <Label label='Email (для получения статистики и аналитики)'>
          <Input placeholder='Напишите email' disabled />
        </Label>
      </div>

      <div className={s.FormButtons}>
        <Button
          variant='primary'
          type='submit'
          onClick={() => {
            const statusEvent = MOCKED_STATUSES.find(
              (status) => status.name === 'Опубликовано',
            );
            if (!statusEvent) return;
            setValue('eventStatusId', statusEvent?.id);
          }}
        >
          Опубликовать
        </Button>
        <Button
          variant='ghost'
          type='submit'
          onClick={() => {
            const statusEvent = MOCKED_STATUSES.find(
              (status) => status.name === 'Архив',
            );
            if (!statusEvent) return;
            setValue('eventStatusId', statusEvent?.id);
          }}
        >
          Сохранить в архив
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
