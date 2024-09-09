import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { Icon } from '@base/index';
import { RouteEnum } from '@constants/route';

import logo from '/logo.svg';

import s from './Header.module.scss';

const Header: FC = () => {
  const location = useLocation();

  return (
    <header className={s.Header}>
      <Link to={RouteEnum.HOME} className={s.LogoLink}>
        <img src={logo} alt='logo' className={s.Logo} />
      </Link>

      <nav className={s.Navbar}>
        <Link
          to={RouteEnum.PROFILE}
          className={clsx({ _active: location.pathname === RouteEnum.PROFILE })}
        >
          Мой профиль
        </Link>
        <Link
          to={RouteEnum.MEETINGS}
          className={clsx({
            _active: location.pathname === RouteEnum.MEETINGS,
          })}
        >
          Встречи
        </Link>
        <Link
          to={RouteEnum.EVENTS}
          className={clsx({
            _active:
              location.pathname === RouteEnum.EVENTS ||
              location.pathname === RouteEnum.CREATE_EVENT,
          })}
        >
          Мероприятия
        </Link>
      </nav>

      <div className={s.Account}>
        <p className={s.Name}>максим иванов</p>
        <Icon icon='ARROW_BOTTOM' width={14} height={8} viewBox='0 0 14 8' />
      </div>
    </header>
  );
};

export default Header;
