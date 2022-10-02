import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function useUserContenxt() {
  const userContext = useContext(UserContext);

  if (!userContext) return 'Must use UserContext with provider';

  return userContext;
}
