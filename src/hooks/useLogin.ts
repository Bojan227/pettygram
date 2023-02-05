import fetcher from '../api/fetcher';
import useUserContenxt from './useUserContext';
import { url } from '../constants/api';

export default function useLogin() {
  const userContext = useUserContenxt();

  const login = async (username: string, password: string) => {
    try {
      const json = await fetcher(`${url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      userContext?.dispatch({ type: 'LOGIN', payload: json.user });
      localStorage.setItem('user', JSON.stringify(json.user));
      document.cookie = 'token' + '=' + (json.token || '') + '; path=/';
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
}
