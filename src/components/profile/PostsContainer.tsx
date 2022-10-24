import { useEffect, useState } from 'react';
import useUserContenxt from '../../hooks/useUserContext';

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<any[] | null>([]);
  const userContext = useUserContenxt();

  useEffect(() => {
    const getDatasByUserId = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/${tab}/${userContext?.user._id}`
        );

        const data = await res.json();
        setData([data]);
      } catch (error) {
        console.log(error);
      }
    };

    getDatasByUserId();
  }, []);

  return <div className="posts-container">{JSON.stringify(data)}</div>;
};
