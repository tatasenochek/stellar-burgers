import { ConstructorPage, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
