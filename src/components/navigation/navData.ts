import { HomeIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export const navData = [
  { title: 'Home', link: '/', SvgIcon: HomeIcon },
  { title: 'Explore', link: 'explore', SvgIcon: MagnifyingGlassIcon },
  { title: 'Messages', link: 'inbox', SvgIcon: PaperAirplaneIcon },
  { title: 'Notifications', link: '', SvgIcon: HeartIcon },
  { title: 'Create', link: '', SvgIcon: PlusCircleIcon },
  {
    title: 'Profile',
    url: 'profile',
    link: 'profile',
  },
];
