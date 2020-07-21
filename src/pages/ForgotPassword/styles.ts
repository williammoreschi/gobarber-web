import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
  max-width: 700px;
  margin: 50px 0;
`;

const animationContainer = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity:1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  animation: ${animationContainer} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 25px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 26px;
      text-align: center;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #ffffff;
    display: flex;
    align-items: center;
    margin-top: 26px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

const animationBackground = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity:1;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  animation: ${animationBackground} 2s;
`;
