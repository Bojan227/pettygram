import useUserContenxt from './useUserContext';

export default function Logout() {
  const userContext = useUserContenxt();

  const logout = () => {
    localStorage.removeItem('user');
    userContext?.dispatch({ type: 'LOGOUT', payload: '' });
  };

  return { logout };
}
