import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Icon } from '@base/index';
import { Option } from '@sharedTypes/option.types';
import { useOutsideClick, useToggle } from '@hooks/index';

import s from './Select.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  isError?: boolean;
};

const Select: FC<Props> = ({
  value,
  onChange,
  options,
  placeholder = 'Выбрать',
  className = '',
  isError,
}) => {
  const { value: isOpen, toggle, setFalse: close } = useToggle();
  const [search, setSearch] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(containerRef, () => close());

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);

  return (
    <div
      ref={containerRef}
      onClick={toggle}
      className={clsx({
        [s.SelectContainer]: true,
        [s.SelectContainer_open]: isOpen,
        [className]: !!className,
      })}
    >
      <div
        className={clsx({
          [s.Select]: true,
          [s.Select_error]: isError,
        })}
      >
        {isOpen ? (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder='Поиск'
          />
        ) : !!value ? (
          <p className={s.Value}>{value}</p>
        ) : (
          <p className={s.Placeholder}>{placeholder}</p>
        )}
        <Icon
          icon='ARROW_BOTTOM'
          viewBox='0 0 14 8'
          width={14}
          height={8}
          className={s.Arrow}
        />
      </div>

      <div className={s.Options}>
        {!!filteredOptions.length ? (
          filteredOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => onChange(option.name)}
              className={clsx({
                [s.Option]: true,
                [s.Option_selected]: value === option.name,
              })}
            >
              <p>{option.name}</p>
              <Icon icon='CHECK' viewBox='0 0 24 24' width={24} height={24} />
            </div>
          ))
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className={clsx({
              [s.Option]: true,
              [s.Option_disabled]: true,
            })}
          >
            <p>Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
