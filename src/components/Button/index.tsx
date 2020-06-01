import React, { ButtonHTMLAttributes } from 'react';
import { ButtonElemtent } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <ButtonElemtent type="button" {...rest}>
    {children}
  </ButtonElemtent>
);

export default Button;
