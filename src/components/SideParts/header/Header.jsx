import React from 'react';
import userPhoto from '../../../assets/userPhoto.png';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import Container from 'components/renderedAssets/Container';
const Box = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1140px;
  position: relative;
`;
const AnchorDivStyle = styled.div`
  display: flex;
  gap: 42px;
  margin-left: 111px;
`;
const AnchorStyle = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 500;
  font-style: Medium;
  font-size: 12px;
  letter-spacing: 0%;
  display: flex;
  align-items: center;
`;
const LogoStyled = styled(Logo)`
  width: 82px;
  height: 56px;
  display: flex;
  align-items: center;
`;
const AcountManagerDiv = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 510px;
`;
const AcountManagerButton = styled.button`
  width: 89px;
  height: 35px;
  background: #ffb36c;
  border-radius: 10px;
  margin-top: 8px;

  border: 1px solid transparent;
  cursor: pointer;

  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 500;
  font-size: 12px;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 6px 15px rgba(0, 0, 0, 0.15),
      0 2px 6px rgba(0, 0, 0, 0.1);

    border-color: #000;
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  }
`;
const AcountManagerPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 20px;
  cursor: pointer;
  
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.08);

    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.15),
      0 0 0 3px rgba(255, 179, 108, 0.4);
  }

  &:active {
    transform: scale(1.02);
  }
`;
const Header = () => {
  return (
    <Box>
      <Container>
        <LogoStyled />
        <AnchorDivStyle>
          <AnchorStyle>Who we are</AnchorStyle>
          <AnchorStyle>Contacts</AnchorStyle>
          <AnchorStyle>Menu</AnchorStyle>
        </AnchorDivStyle>
        <AcountManagerDiv>
          <AcountManagerButton>Account</AcountManagerButton>
        </AcountManagerDiv>
        <AcountManagerPhoto src={userPhoto} alt="User Photo" />
      </Container>
    </Box>
  );
};

export default Header;
