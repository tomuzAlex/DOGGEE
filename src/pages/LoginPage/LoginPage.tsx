import React from 'react';
import styles from './LoginPage.module.scss';

import Input from '../../common/fields/inputs/Input';
import Button from '../../common/fields/buttons/Button';

const LoginPage: React.FC = () => {
  const [formValue, setFormValue] = React.useState({ username: '', password: '' });
  return (
    <div className={styles.globalConteiner}>
      <div className={styles.conteiner}>
        <div>header</div>
        <div className={styles.inputSection}>
          <div className={styles.input}>
            <Input
              isError={true}
              helperText="validation"
              value={formValue.username}
              type="text"
              placeholder="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue({ ...formValue, username: e.target.value })
              }
            />
          </div>
          <div className={styles.input}>
            <Input
              value={formValue.password}
              type="password"
              placeholder="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <Button>Sign in</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
