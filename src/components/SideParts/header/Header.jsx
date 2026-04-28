import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

const Header = () => {
  const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

  `;
  return (
    <Box>
      <Logo width={82} height={56} />
      <p>Who we are</p>
      <p>Contacts</p>
      <p>Menu</p>
    </Box>
  );
};

export default Header;
