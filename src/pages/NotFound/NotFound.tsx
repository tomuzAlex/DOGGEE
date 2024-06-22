import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleGoForward = () => {
    navigate('/personalAccount')
  }
  return (
    <div className={styles.container}>
      <div>404 Page Not Found</div>
      <div>
        <Link to=""></Link>
        <button onClick={handleGoForward}>Go Forward</button>
      </div>
    </div>
  );
};

export default NotFound;
