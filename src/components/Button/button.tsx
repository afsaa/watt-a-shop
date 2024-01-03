import { ButtonProps } from './button.type';

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
