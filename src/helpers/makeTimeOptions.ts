import { Option } from '@sharedTypes/option.types';

const makeTimeOptions = (difference: number) => {
  const options: Option[] = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += difference) {
      const value = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
      options.push({ id: value, name: value });
    }
  }
  return options;
};

export default makeTimeOptions;
