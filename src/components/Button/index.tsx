import React, { ButtonHTMLAttributes } from 'react';
import { ButtonElement } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <ButtonElement type="button" {...rest}>
    {loading ? 'Aguarde...' : children}
  </ButtonElement>
);

export default Button;
