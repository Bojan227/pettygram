import React, { MouseEvent } from 'react';
import Button from './Button';

export const FollowButton = ({
  children,
  onClick = () => {},
  isLoading,
}: {
  children: React.ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
}) => {
  return (
    <Button
      className="border border-gray-500 rounded-xl py-1 px-5 cursor-pointer"
      onClick={onClick}
    >
      {isLoading ? 'Loading...' : children}
    </Button>
  );
};
