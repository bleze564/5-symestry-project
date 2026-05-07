import React from 'react';
import Modal from './Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userPhoto from '../../../assets/userPhoto.png';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import Container from 'components/renderedAssets/Container';
import { useEffect, useRef, useState } from 'react';

const Box = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1140px;
  position: relative;
  animation: headerFade 0.5s ease;

  @keyframes headerFade {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AnchorDivStyle = styled.div`
  display: flex;
  gap: 42px;
  margin-left: 111px;
`;

const AnchorStyle = styled.a`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0%;

  display: inline-flex;
  align-items: center;

  width: fit-content;

  position: relative;
  cursor: pointer;
  color: #1f1f1f;

  text-decoration: none;
  outline: none;
  user-select: none;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -7px;
    width: 0%;
    height: 2px;
    background: #ffb36c;
    border-radius: 10px;
    transition: width 0.25s ease;
  }

  &:hover {
    color: #d97822;
    transform: translateY(-2px);
  }

  &:hover::after {
    width: 100%;
  }

  &:active {
    transform: translateY(0);
  }
`;

const LogoStyled = styled(Logo)`
  width: 82px;
  height: 56px;
  display: flex;
  align-items: center;
  cursor: pointer;

  transition:
    transform 0.3s ease,
    filter 0.3s ease;

  &:hover {
    transform: scale(1.06) rotate(-2deg);
    filter: drop-shadow(0 6px 10px rgba(255, 179, 108, 0.45));
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AcountManagerDiv = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 420px;
  align-items: center;
`;

const AcountManagerButton = styled.button`
  min-width: 89px;
  height: 35px;
  padding: 0 16px;
  background: linear-gradient(135deg, #ffbd7c, #ff9f45);
  border-radius: 12px;

  border: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;

  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #1f1f1f;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;

  box-shadow:
    0 5px 12px rgba(255, 179, 108, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);

  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #ffc68f, #ff9a35);
    box-shadow:
      0 10px 22px rgba(255, 151, 53, 0.35),
      0 3px 8px rgba(0, 0, 0, 0.12);
    border-color: rgba(0, 0, 0, 0.22);
  }

  &:active {
    transform: translateY(-1px) scale(0.97);
    box-shadow: 0 4px 10px rgba(255, 151, 53, 0.25);
  }
`;

const AcountManagerPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  margin-left: 20px;

  cursor: pointer;
  padding: 3px;

  background: linear-gradient(135deg, #ffb36c, #ffffff);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease;

  box-shadow:
    0 5px 14px rgba(0, 0, 0, 0.12),
    0 0 0 3px rgba(255, 179, 108, 0.22);

  &:hover {
    transform: scale(1.09) translateY(-2px);

    box-shadow:
      0 10px 25px rgba(0, 0, 0, 0.16),
      0 0 0 4px rgba(255, 179, 108, 0.45);
  }
`;
const ProfileDropdown = styled.div`
  position: absolute;
  top: 72px;
  right: 0;
  width: 260px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 20px;
  padding: 20px;
  font-family: 'Montserrat Alternates', sans-serif;
  z-index: 100;

  border: 1px solid rgba(255, 179, 108, 0.35);

  box-shadow:
    0 16px 35px rgba(0, 0, 0, 0.18),
    0 4px 12px rgba(255, 179, 108, 0.2);

  animation: dropdownOpen 0.25s ease;
  transform-origin: top right;

  @keyframes dropdownOpen {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.96);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const ProfileAvatar = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 3px rgba(255, 179, 108, 0.35);
`;

const ProfileTitle = styled.h3`
  font-size: 15px;
  margin: 0;
  color: #1f1f1f;
`;

const ProfileStatus = styled.p`
  font-size: 10px;
  color: #6c6c6c;
  margin-top: 3px;
`;

const ProfileInfoBox = styled.div`
  background: #f7f7f7;
  border-radius: 14px;
  padding: 12px;
  margin-bottom: 14px;
`;

const ProfileText = styled.p`
  font-size: 11px;
  margin-bottom: 8px;
  color: #333;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #d97822;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 36px;
  margin-top: 4px;
  background: linear-gradient(135deg, #ffbd7c, #ff9f45);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #1f1f1f;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(255, 151, 53, 0.35);
  }

  &:active {
    transform: scale(0.97);
  }
`;
const UserGreeting = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #1f1f1f;

  display: flex;
  align-items: center;

  padding: 10px 16px;

  background: rgba(255, 179, 108, 0.15);

  border: 1px solid rgba(255, 179, 108, 0.35);

  border-radius: 14px;

  backdrop-filter: blur(8px);

  box-shadow:
    0 6px 18px rgba(255, 179, 108, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);

  user-select: none;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 179, 108, 0.22);

    box-shadow:
      0 10px 24px rgba(255, 179, 108, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <Box>
      <Container>
        <LogoStyled />

        <AnchorDivStyle>
          <AnchorStyle href="#">Who we are</AnchorStyle>
          <AnchorStyle href="#">Contacts</AnchorStyle>
          <AnchorStyle href="#">Menu</AnchorStyle>
        </AnchorDivStyle>

        <AcountManagerDiv>
          {currentUser ? (
            <UserGreeting> Hello, {currentUser.username}</UserGreeting>
          ) : (
            <AcountManagerButton onClick={() => setIsModalOpen(true)}>
              Account
            </AcountManagerButton>
          )}

          <div
            ref={profileRef}
            style={{
              position: 'relative',
            }}
          >
            <AcountManagerPhoto
              src={userPhoto}
              alt="User Photo"
              onClick={() => {
                if (currentUser) {
                  setIsProfileOpen(!isProfileOpen);
                } else {
                  setIsModalOpen(true);
                }
              }}
            />

            {isProfileOpen && currentUser && (
              <ProfileDropdown>
                <ProfileTop>
                  <ProfileAvatar src={userPhoto} alt="User avatar" />

                  <div>
                    <ProfileTitle>{currentUser.username}</ProfileTitle>

                    <ProfileStatus>Online</ProfileStatus>
                  </div>
                </ProfileTop>

                <ProfileInfoBox>
                  <ProfileText>
                    <strong>Name:</strong> {currentUser.username}
                  </ProfileText>

                  <ProfileText>
                    <strong>Email:</strong> {currentUser.email}
                  </ProfileText>

                  <ProfileText>
                    <strong>ID:</strong> {currentUser.id}
                  </ProfileText>
                </ProfileInfoBox>

                <LogoutButton
                  onClick={() => {
                    setCurrentUser(null);
                    setIsProfileOpen(false);
                  }}
                >
                  Log out
                </LogoutButton>
              </ProfileDropdown>
            )}
          </div>
        </AcountManagerDiv>

        {isModalOpen && (
          <Modal
            closeModal={() => setIsModalOpen(false)}
            setCurrentUser={setCurrentUser}
          />
        )}

        <ToastContainer position="top-right" autoClose={2000} theme="light" />
      </Container>
    </Box>
  );
};

export default Header;
