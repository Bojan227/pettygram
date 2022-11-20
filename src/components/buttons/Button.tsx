import React, { MouseEvent } from 'react';
interface ButtonProps {
  children: React.ReactNode;
  className: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return <button {...{ className, ...rest }}>{children}</button>;
}
