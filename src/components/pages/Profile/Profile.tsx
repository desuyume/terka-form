import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@base/index';
import { RouteEnum } from '@constants/route';

import s from './Profile.module.scss';

const Profile: FC = () => {
  return (
    <section className={s.Profile}>
      <Link to={RouteEnum.CREATE_EVENT}>
        <Button variant='primary'>Создать мероприятие</Button>
      </Link>
    </section>
  );
};

export default Profile;
