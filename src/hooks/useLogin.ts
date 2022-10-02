import useUserContenxt from './useUserContext';

export default function useLogin() {
  const context = useUserContenxt();

  //   console.log(context);

  const login = async (username: string, password: string) => {
    try {
      const user = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const json = await user.json();
      console.dir(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
}
