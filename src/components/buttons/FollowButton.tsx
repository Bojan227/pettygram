import React, { MouseEvent } from 'react';
import Button from './Button';

export const FollowButton = ({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Button
      className="border border-gray-500 rounded-xl py-1 px-5 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
