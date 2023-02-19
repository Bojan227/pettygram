import { Dispatch, SetStateAction } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';

export type NavigationLinkProps = {
  title: string;
  link: string;
  url?: string;
  SvgIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  toggleCreatePost: () => void;
  toggleNotifications: () => void;
  index: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  selectedIndex: number;
};

export type NavigationBarProps = {
  toggleNotifications: boolean;
  setToggleNotifications: Dispatch<SetStateAction<boolean>>;
};

export type ImagesContainerProps = {
  files: File[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
};

export type ImageCardProps = {
  file: File;
  removeFile: () => void;
};

export type DropFileContainerProps = {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export type CreatePostProps = {
  toggleCreatePost: boolean;
  setToggleCreatePost: (toggleCreatePost: boolean) => void;
};

export type CaptionContainerProps = {
  files: File[];
  setToggleCreatePost: (toggleCreatePost: boolean) => void;
};
