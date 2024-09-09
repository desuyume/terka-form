import { Option } from '@sharedTypes/option.types';

const MOCKED_TAGS: Option[] = [
  { id: '1', name: 'Розыгрыш' },
  { id: '2', name: 'IT, gamedev' },
  { id: '3', name: 'Гастро' },
  { id: '4', name: 'Выступление, концерт' },
  { id: '5', name: 'Экскурсия' },
  { id: '6', name: 'Совместный выезд' },
  { id: '7', name: 'Искусство, выставка' },
  { id: '8', name: 'Посиделки с кофейком' },
  { id: '9', name: 'Для детей' },
  { id: '10', name: 'Психология' },
  { id: '11', name: 'Квиз, интеллектуальная игра' },
  { id: '12', name: 'Хобби, творчество' },
  { id: '13', name: 'Образование, иностранные языки' },
  { id: '14', name: 'Тёркина встреча' },
  { id: '15', name: 'Мастер-класс' },
  { id: '16', name: 'Вечеринка' },
];

const MOCKED_STATUSES: Option[] = [
  {
    id: '1',
    name: 'Все',
  },
  {
    id: '2',
    name: 'Опубликовано',
  },
  {
    id: '3',
    name: 'Архив',
  },
  {
    id: '4',
    name: 'Завершено',
  },
];

export { MOCKED_TAGS, MOCKED_STATUSES };
