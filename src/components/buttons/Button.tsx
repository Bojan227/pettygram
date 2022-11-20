import React, { MouseEvent } from 'react';
interface ButtonProps {
  children: React.ReactNode;
  className: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return <button {...{ className, ...rest }}>{children}</button>;
}
