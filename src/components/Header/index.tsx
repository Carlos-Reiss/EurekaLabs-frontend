import React from 'react';
import { MdHome } from 'react-icons/md';
import { Container } from './styles';

const Header: React.FC = () => (
  <Container>
    <MdHome size={42} color="#333" />
    <h1>Consultar CEP </h1>
  </Container>
);

export default Header;
