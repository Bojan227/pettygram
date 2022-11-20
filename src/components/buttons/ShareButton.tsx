import React, { MouseEvent } from 'react';
import Button from './Button';

export const ShareButton = ({
  children,
  onClick = () => {},
  disabled = true,
  className,
}: {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  className: string;
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
