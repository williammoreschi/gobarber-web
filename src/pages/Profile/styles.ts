import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;

  header {
    height: 144px;
    display: flex;
    align-items: center;
    background: #28262e;
    flex: 1;

    div {
      padding: 0 30px;
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 340px;
  margin: -93px auto 0;
  display: flex;
  flex-direction: column;

  form {
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 20px;
      margin-bottom: 15px;
      text-align: left;
    }
  }
  > a {
    color: #f4ede8;
    display: flex;
    align-items: center;
    margin-top: 26px;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
    justify-content: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  align-self: center;
  position: relative;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    border: 10px solid #00000030;
    box-shadow: 3px 4px 5px #00000087;
  }

  label {
    position: absolute;
    right: 0px;
    bottom: 0px;
    background: #ff9900;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    transition: background-color 0.2s;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9900')};
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
  }
`;
