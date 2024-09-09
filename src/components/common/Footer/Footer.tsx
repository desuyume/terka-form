import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { RouteEnum } from '@constants/route';

import gopnikImg from '/gopnik.webp';

import s from './Footer.module.scss';

const Footer: FC = () => {
  const location = useLocation();
  const routesWithGopnik: RouteEnum[] = [RouteEnum.CREATE_EVENT];

  return (
    <footer className={s.Footer}>
      {!!routesWithGopnik.find((route) => route === location.pathname) && (
        <img src={gopnikImg} alt='gopnik' className={s.Gopnik} />
      )}
    </footer>
  );
};

export default Footer;
