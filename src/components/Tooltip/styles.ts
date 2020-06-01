import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 600ms;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    &::before {
      content: '';
      border: 6px solid transparent;
      border-top-color: #ff9000;
      bottom: 20px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -12px;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
