import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '@common/index';
import { CreateEvent, Events, Home, Meetings, Profile } from '@pages/index';
import { RouteEnum } from '@constants/route';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={RouteEnum.HOME} element={<Home />} />
        <Route path={RouteEnum.PROFILE} element={<Profile />} />
        <Route path={RouteEnum.MEETINGS} element={<Meetings />} />
        <Route path={RouteEnum.EVENTS} element={<Events />} />
        <Route path={RouteEnum.CREATE_EVENT} element={<CreateEvent />} />
        <Route path='*' element={<Navigate to={RouteEnum.HOME} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
