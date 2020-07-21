import React, { ButtonHTMLAttributes } from 'react';
import { ButtonElemtent } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <ButtonElemtent type="button" {...rest}>
    {loading ? 'Aguarde...' : children}
  </ButtonElemtent>
);

export default Button;
