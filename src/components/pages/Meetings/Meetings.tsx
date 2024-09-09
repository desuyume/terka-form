import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@base/index';
import { RouteEnum } from '@constants/route';

import s from './Meetings.module.scss';

const Meetings: FC = () => {
  return (
    <section className={s.Meetings}>
      <Link to={RouteEnum.CREATE_EVENT}>
        <Button variant='primary'>Создать мероприятие</Button>
      </Link>
    </section>
  );
};

export default Meetings;
