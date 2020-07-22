import React from 'react';
import { FiPower } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import { Container, Headar, HeaderContent, Profile } from './styles';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Headar>
        <HeaderContent>
          <img src={logo} alt="Gobarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Seja Bem vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Headar>
    </Container>
  );
};

export default Dashboard;
