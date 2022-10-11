import useUserContenxt from './useUserContext';

export default function Logout() {
  const userContext = useUserContenxt();

  const logout = () => {
    localStorage.removeItem('user');
    userContext?.dispatch({ type: 'LOGOUT', payload: '' });
    document.cookie =
      'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  return { logout };
}
