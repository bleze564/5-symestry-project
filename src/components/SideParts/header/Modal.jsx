import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 520px;
  background: #fff;
  border-radius: 18px;
  padding: 30px 70px;
  position: relative;
  font-family: 'Montserrat Alternates', sans-serif;
  animation: modalOpen 0.3s ease forwards;
  transform-origin: center;

  @keyframes modalOpen {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.94);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 28px;
  font-size: 24px;
  font-weight: 500;
`;

const Label = styled.label`
  font-size: 12px;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled(Field)`
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 8px;
  background: #e7e7e7;
  padding: 0 16px;
  margin-bottom: 20px;
  outline: none;
  font-family: 'Montserrat Alternates', sans-serif;

  &::placeholder {
    color: #b8b8b8;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 179, 108, 0.6);
  }
`;

const SubmitButton = styled.button`
  width: 95px;
  height: 35px;
  background: #ffb36c;
  border: none;
  border-radius: 8px;
  display: block;
  margin: 8px auto 12px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Montserrat Alternates', sans-serif;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 179, 108, 0.45);
  }
`;

const SwitchText = styled.p`
  text-align: center;
  font-size: 11px;
`;

const SwitchButton = styled.button`
  border: none;
  background: transparent;
  text-decoration: underline;
  cursor: pointer;
  font-size: 11px;
`;

function Modal({ closeModal, setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(false);

  async function handleSubmit(values) {
    const response = await fetch(
      isLogin
        ? 'http://localhost:5000/login'
        : 'http://localhost:5000/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);

    if (typeof setCurrentUser !== 'function') {
      console.log('setCurrentUser is broken:', setCurrentUser);

      toast.error('setCurrentUser was not passed to Modal');

      return;
    }

    setCurrentUser(data.user);

    closeModal();
  }



  return (
    <Overlay>
      <ModalBox>
        <CloseButton onClick={closeModal}>
          <IoClose />
        </CloseButton>

        <Title>{isLogin ? 'Log in' : 'Sign up'}</Title>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            {!isLogin && (
              <>
                <Label>Username</Label>
                <Input name="username" placeholder="Username" />
              </>
            )}

            <Label>E-Mail</Label>
            <Input name="email" type="email" placeholder="E-Mail" />

            <Label>Password</Label>
            <Input name="password" type="password" placeholder="Password" />

            <SubmitButton type="submit">
              {isLogin ? 'Log in' : 'Sign up'}
            </SubmitButton>
          </Form>
        </Formik>

        <SwitchText>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <SwitchButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Log in'}
          </SwitchButton>
        </SwitchText>
      </ModalBox>
    </Overlay>
  );
}

export default Modal;
