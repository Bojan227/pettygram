import { Dispatch, SetStateAction } from "react";

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
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

export type CreatePostProps = {
  toggleCreatePost: boolean;
  setToggleCreatePost: (toggleCreatePost: boolean) => void;
};

export type CaptionContainerProps = {
  files: File[];
  setToggleCreatePost: (toggleCreatePost: boolean) => void;
};
