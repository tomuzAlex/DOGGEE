import React from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <LoginPage/>
    </div>
  );
}

export default App;
