import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function useUserContext() {
  const userContext = useContext(UserContext);

  //   if (!userContext) return 'Must use UserContext with provider';

  return userContext;
}
