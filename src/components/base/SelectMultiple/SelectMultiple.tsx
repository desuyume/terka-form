import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Icon } from '@base/index';
import { Option } from '@sharedTypes/option.types';
import { useOutsideClick, useToggle } from '@hooks/index';

import s from './SelectMultiple.module.scss';

type Props = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  className?: string;
  isError?: boolean;
};

const SelectMultiple: FC<Props> = ({
  options,
  value,
  onChange,
  placeholder = 'Выбрать',
  className = '',
  isError,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [search, setSearch] = useState<string>('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { toggle, value: isOpen, setFalse } = useToggle();

  const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    toggle();
  };

  const handleSelectOption = (option: Option) => {
    if (!value.length) {
      onChange([option]);
    }

    const isSelected = value.some((item) => item.name === option.name);
    if (isSelected) {
      onChange(value.filter((item) => item.name !== option.name));
    } else {
      onChange([...value, option]);
    }
  };

  useOutsideClick(containerRef, () => setFalse());

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
      onClick={handleOpen}
      className={clsx({
        [s.SelectContainer]: true,
        [s.SelectContainer_open]: isOpen,
        [className]: !!className,
      })}
    >
      <div
        className={clsx({
          [s.Select]: true,
          [s.Select_open]: isOpen,
          [s.Select_error]: isError,
        })}
      >
        <div className={s.SelectedOptions}>
          {value?.map((option) => (
            <div
              key={option.name}
              onClick={(e) => e.stopPropagation()}
              className={s.SelectedOption}
            >
              {option.name}
              <Icon
                icon='CROSS'
                viewBox='0 0 14 14'
                width={14}
                height={14}
                onClick={() =>
                  onChange(value.filter((item) => item.name !== option.name))
                }
              />
            </div>
          ))}
          {isOpen ? (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder='Поиск'
            />
          ) : (
            <p className={s.Placeholder}>{placeholder}</p>
          )}
        </div>
        <Icon
          icon='ARROW_BOTTOM'
          viewBox='0 0 14 8'
          width={14}
          height={8}
          className={s.Arrow}
        />
      </div>

      <div className={s.Options} onClick={(e) => e.stopPropagation()}>
        {!!filteredOptions.length ? (
          filteredOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => handleSelectOption(option)}
              className={clsx({
                [s.Option]: true,
                [s.Option_selected]: !!value?.find(
                  (item) => item.name === option.name,
                ),
              })}
            >
              <p>{option.name}</p>
              <Icon icon='CHECK' viewBox='0 0 24 24' width={24} height={24} />
            </div>
          ))
        ) : (
          <div
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

export default SelectMultiple;
