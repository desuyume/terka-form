import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@base/index';
import { RouteEnum } from '@constants/route';

import s from './Home.module.scss';

const Home: FC = () => {
  return (
    <section className={s.Home}>
      <Link to={RouteEnum.CREATE_EVENT}>
        <Button variant='primary'>Создать мероприятие</Button>
      </Link>
    </section>
  );
};

export default Home;
