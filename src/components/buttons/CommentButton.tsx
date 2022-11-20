import React, { MouseEvent } from 'react';
import Button from './Button';

export const CommentButton = ({
  children,
  disabled,
  className,
}: {
  children: React.ReactNode;

  disabled: boolean;
  className: string;
}) => {
  return (
    <Button disabled={disabled} className={className}>
      {children}
    </Button>
  );
};
