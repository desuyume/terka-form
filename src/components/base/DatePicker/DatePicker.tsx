import { FC } from 'react';
import clsx from 'clsx';
import { DatePickerInput, DatesProvider } from '@mantine/dates';

import { Icon } from '@base/index';

import 'dayjs/locale/ru';
import './DatePicker.scss';

type Props = {
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
  isError?: boolean;
  minDate?: Date;
  placeholder?: string;
};

const DatePicker: FC<Props> = ({
  value,
  onChange,
  className = '',
  isError,
  minDate,
  placeholder = 'Выбрать',
}) => {
  const dateValue = value ? new Date(value) : null;
  const extraProps = { placeholder };

  return (
    <DatesProvider settings={{ locale: 'ru' }}>
      <DatePickerInput
        value={dateValue}
        onChange={(value) => onChange(value?.toString() ?? '')}
        minDate={minDate}
        valueFormat='DD.MM.YYYY'
        icon={
          <Icon icon='CALENDAR' viewBox='0 0 20 22' width={20} height={22} />
        }
        className={clsx({
          'mantine-DatePickerInput-root_error': isError,
          [className]: !!className,
        })}
        {...extraProps}
      />
    </DatesProvider>
  );
};

export default DatePicker;
